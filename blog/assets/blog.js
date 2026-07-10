(() => {
  'use strict';

  const html = document.documentElement;
  const locale = html.lang === 'en' ? 'en' : 'pt-BR';
  const labels = locale === 'en'
    ? { items: 'items', noResults: 'No publications found.', clear: 'Clear filters', load: 'Show more', minRead: 'min read', preparing: 'Content in preparation' }
    : { items: 'itens', noResults: 'Nenhuma publicação encontrada.', clear: 'Limpar filtros', load: 'Mostrar mais', minRead: 'min de leitura', preparing: 'Conteúdo em preparação' };

  const track = (name, params = {}) => {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  };

  function initTheme() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const saved = localStorage.getItem('blog-theme');
    if (saved === 'dark' || saved === 'light') html.dataset.theme = saved;
    button.addEventListener('click', () => {
      const current = html.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      html.dataset.theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('blog-theme', html.dataset.theme);
    });
  }

  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function postMeta(post) {
    const meta = element('div', 'post-meta');
    const type = element('span', 'type-badge', post.typeLabel);
    meta.append(type);
    const date = element('time', '', new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(`${post.publishedAt}T00:00:00Z`)).replace('.', ''));
    date.dateTime = post.publishedAt;
    meta.append(date);
    if (['article', 'note', 'book'].includes(post.type)) meta.append(element('span', '', `${post.readingTime} ${labels.minRead}`));
    if (post.duration) meta.append(element('span', '', post.duration));
    meta.append(element('span', '', post.language === 'en' ? 'EN' : 'PT-BR'));
    if (post.external) meta.append(element('span', '', '↗'));
    return meta;
  }

  function postItem(post) {
    const article = element('article', `feed-item${post.pinned ? ' is-pinned' : ''}`);
    article.dataset.postId = post.id;
    const dateBox = element('div', 'feed-date');
    dateBox.setAttribute('aria-hidden', 'true');
    dateBox.textContent = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(`${post.publishedAt}T00:00:00Z`)).replace('.', '');
    const content = element('div', 'feed-content');
    content.append(postMeta(post));
    const heading = element('h3');
    const link = element('a', '', post.title);
    link.href = post.url;
    heading.append(link);
    content.append(heading, element('p', '', post.excerpt));
    if (post.placeholder) content.append(element('span', 'preparation-label', labels.preparing));
    const tags = element('ul', 'tag-list');
    tags.setAttribute('aria-label', locale === 'en' ? 'Tags' : 'Tags');
    for (const tag of post.tags.slice(0, 4)) {
      const item = element('li');
      const tagLink = element('a', '', `#${tag}`);
      tagLink.href = `${locale === 'en' ? '/en' : ''}/blog/tag/${tag}/`;
      tagLink.dataset.tag = tag;
      item.append(tagLink); tags.append(item);
    }
    content.append(tags);
    article.append(dateBox, content);
    if (post.thumbnail) {
      const thumb = element('a', 'feed-thumb');
      thumb.href = post.url; thumb.tabIndex = -1; thumb.setAttribute('aria-hidden', 'true');
      const img = element('img');
      img.src = post.thumbnail; img.alt = ''; img.width = 144; img.height = 96; img.loading = 'lazy'; img.decoding = 'async';
      thumb.append(img); article.append(thumb);
    }
    return article;
  }

  function renderPosts(container, posts, limit = 30) {
    container.replaceChildren();
    if (!posts.length) {
      const empty = element('div', 'empty-state');
      empty.append(element('h3', '', labels.noResults));
      const clear = element('button', 'load-more', labels.clear);
      clear.type = 'button'; clear.dataset.clearFilters = 'true'; empty.append(clear); container.append(empty); return;
    }
    const visible = posts.slice(0, limit);
    const years = new Map();
    for (const post of visible) {
      const year = post.publishedAt.slice(0, 4);
      if (!years.has(year)) years.set(year, []);
      years.get(year).push(post);
    }
    for (const [year, entries] of years) {
      const section = element('section', 'year-group');
      section.setAttribute('aria-labelledby', `year-dynamic-${year}`);
      const heading = element('h2'); heading.id = `year-dynamic-${year}`;
      const link = element('a', '', year); link.href = `${locale === 'en' ? '/en' : ''}/blog/${year}/`; heading.append(link);
      const list = element('div'); entries.forEach(post => list.append(postItem(post))); section.append(heading, list); container.append(section);
    }
    if (posts.length > limit) {
      const more = element('button', 'load-more', `${labels.load} (${posts.length - limit})`);
      more.type = 'button'; more.addEventListener('click', () => renderPosts(container, posts, limit + 30)); container.append(more);
    }
  }

  async function initFilters() {
    const form = document.querySelector('#blog-filters');
    const payload = document.querySelector('#blog-index');
    const results = document.querySelector('#feed-results');
    if (!(form && payload && results)) return;
    let posts;
    try {
      if (payload.dataset.src) {
        const response = await fetch(payload.dataset.src, { credentials: 'same-origin' });
        if (!response.ok) throw new Error('Search index unavailable');
        posts = await response.json();
      } else posts = JSON.parse(payload.textContent);
    } catch {
      document.querySelector('#blog-error')?.classList.remove('sr-only');
      return;
    }
    const controls = Object.fromEntries([...form.elements].filter(control => control.name).map(control => [control.name, control]));
    const count = document.querySelector('#results-count');
    const clearSearch = document.querySelector('#clear-search');
    const params = new URLSearchParams(location.search);
    for (const [name, control] of Object.entries(controls)) if (params.has(name)) control.value = params.get(name);

    const apply = (updateUrl = true) => {
      const query = normalize(controls.search.value.trim());
      let filtered = posts.filter(post => {
        if (controls.type.value && post.type !== controls.type.value) return false;
        if (controls.language.value && post.language !== controls.language.value) return false;
        if (controls.tag.value && !post.tags.includes(controls.tag.value)) return false;
        return !query || normalize(post.searchText).includes(query);
      });
      const sort = controls.sort.value;
      filtered.sort((a, b) => sort === 'oldest' ? a.publishedAt.localeCompare(b.publishedAt) : sort === 'updated' ? b.updatedAt.localeCompare(a.updatedAt) : b.publishedAt.localeCompare(a.publishedAt));
      renderPosts(results, filtered);
      count.textContent = `${filtered.length} ${labels.items}`;
      clearSearch.hidden = !controls.search.value;
      document.querySelector('.pagination')?.setAttribute('hidden', '');
      if (updateUrl) {
        const next = new URLSearchParams();
        for (const [name, control] of Object.entries(controls)) if (control.value && !(name === 'sort' && control.value === 'latest')) next.set(name, control.value);
        history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}${location.hash}`);
      }
    };

    let timer;
    controls.search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { apply(); track('blog_search', { has_query: Boolean(controls.search.value) }); }, 220); });
    for (const name of ['type', 'language', 'tag', 'sort']) controls[name].addEventListener('change', () => { apply(); track('blog_filter', { filter_name: name, has_value: Boolean(controls[name].value) }); });
    form.addEventListener('submit', event => { event.preventDefault(); apply(); });
    clearSearch.addEventListener('click', () => { controls.search.value = ''; controls.search.focus(); apply(); });
    results.addEventListener('click', event => {
      const clear = event.target.closest('[data-clear-filters]');
      if (clear) { form.reset(); apply(); controls.search.focus(); }
      const tag = event.target.closest('[data-tag]');
      if (tag) track('blog_tag_click', { tag: tag.dataset.tag });
    });
    if (location.search) apply(false);
  }

  function initPostActions() {
    const copyLink = document.querySelector('.copy-link');
    copyLink?.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); copyLink.textContent = copyLink.dataset.copyLabel; track('blog_copy_link'); }
      catch { copyLink.textContent = location.href; }
    });
    document.querySelectorAll('.copy-code').forEach(button => button.addEventListener('click', async () => {
      const code = button.closest('.code-block')?.querySelector('code')?.textContent || '';
      try { await navigator.clipboard.writeText(code); button.textContent = locale === 'en' ? 'Copied' : 'Copiado'; }
      catch { button.textContent = locale === 'en' ? 'Select the code' : 'Selecione o código'; }
    }));
    document.querySelectorAll('.load-embed').forEach(button => button.addEventListener('click', () => {
      const section = button.closest('.embed-consent');
      try {
        const url = new URL(section.dataset.embedUrl);
        const allowed = (url.hostname === 'www.youtube-nocookie.com' && url.pathname.startsWith('/embed/')) || (url.hostname === 'open.spotify.com' && url.pathname.startsWith('/embed/'));
        if (!allowed || url.protocol !== 'https:') throw new Error('Embed URL blocked');
        const frame = document.createElement('iframe');
        frame.src = url.href;
        frame.title = locale === 'en' ? 'Third-party media' : 'Mídia de terceiros';
        frame.loading = 'lazy';
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
        frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
        frame.setAttribute('allowfullscreen', '');
        section.replaceChildren(frame);
        track('blog_embed_load', { platform: url.hostname });
      } catch {
        section.querySelector('p').textContent = locale === 'en' ? 'This media cannot be loaded safely.' : 'Esta mídia não pode ser carregada com segurança.';
      }
    }));
    if (document.body.classList.contains('blog-post-page')) track('blog_post_view', { content_type: document.querySelector('.type-badge')?.textContent || 'unknown' });
  }

  function initAnalytics() {
    document.addEventListener('click', event => {
      const item = event.target.closest('[data-analytics]');
      if (item) track(`blog_${item.dataset.analytics}_click`);
    });
  }

  initTheme();
  initFilters();
  initPostActions();
  initAnalytics();
})();
