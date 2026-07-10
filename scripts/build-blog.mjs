import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AUTHOR, SITE_URL, TYPE_LABELS, VALID_TYPES, assertUniquePosts, escapeHtml,
  isAllowedEmbedUrl, isPublishable, isSafeUrl, normalizeTag, outputPathForUrl, parseFrontMatter, plainText,
  postUrl, readingTime, renderMarkdown, validatePost
} from './blog-core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const PAGE_SIZE = 8;
const BUILD_DATE = '2026-07-10';

function groupBy(items, keySelector) {
  const groups = new Map();
  for (const item of items) {
    const key = keySelector(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

async function cleanGeneratedBlog() {
  const blogDir = path.join(ROOT, 'blog');
  await fs.mkdir(blogDir, { recursive: true });
  for (const entry of await fs.readdir(blogDir, { withFileTypes: true })) {
    if (entry.name === 'assets') continue;
    await fs.rm(path.join(blogDir, entry.name), { recursive: true, force: true });
  }
  await fs.rm(path.join(ROOT, 'en', 'blog'), { recursive: true, force: true });
}
const ui = {
  'pt-BR': {
    locale: 'pt-BR', prefix: '', blog: 'Blog', home: 'Página principal', description: 'Ideias, opiniões e experiências sobre Application Security, DevSecOps, desenvolvimento seguro, tecnologia e os projetos que estou construindo.',
    all: 'Todos', articles: 'Artigos', notes: 'Posts curtos', podcasts: 'Podcasts', talks: 'Palestras', videos: 'Vídeos', projects: 'Projetos', books: 'Livros', highlights: 'Destaques', publications: 'Publicações', search: 'Buscar publicações', searchHint: 'Título, resumo, conteúdo, tags ou projeto', clear: 'Limpar', language: 'Idioma', portuguese: 'Português', english: 'English', tags: 'Tags', order: 'Ordenar', latest: 'Mais recentes', oldest: 'Mais antigos', updated: 'Atualizados recentemente', mostRead: 'Mais lidos (sem métricas)', apply: 'Aplicar', noResults: 'Nenhuma publicação encontrada.', back: 'Voltar ao blog', previous: 'Anterior', next: 'Próxima', copyLink: 'Copiar link', copied: 'Link copiado', share: 'Compartilhar', author: 'Sobre o autor', related: 'Publicações relacionadas', toc: 'Neste artigo', rss: 'RSS', draftNotice: 'Conteúdo em preparação', readTime: 'min de leitura', min: 'min', page: 'Página', of: 'de', year: 'Publicações de', tag: 'Tag', type: 'Tipo', external: 'conteúdo relacionado externo', noJs: 'Os filtros instantâneos e a busca exigem JavaScript. As páginas por tipo, ano e tag continuam disponíveis.', updatedLabel: 'Atualizado em', publishedLabel: 'Publicado em', by: 'por', translation: 'Read in English', loadError: 'Não foi possível carregar os controles interativos. A listagem estática continua disponível.'
  },
  en: {
    locale: 'en', prefix: '/en', blog: 'Blog', home: 'Home', description: 'Ideas, opinions and experience about Application Security, DevSecOps, secure development, technology and the projects I am building.',
    all: 'All', articles: 'Articles', notes: 'Short posts', podcasts: 'Podcasts', talks: 'Talks', videos: 'Videos', projects: 'Projects', books: 'Books', highlights: 'Highlights', publications: 'Publications', search: 'Search publications', searchHint: 'Title, summary, content, tags or project', clear: 'Clear', language: 'Language', portuguese: 'Português', english: 'English', tags: 'Tags', order: 'Sort', latest: 'Latest', oldest: 'Oldest', updated: 'Recently updated', mostRead: 'Most read (no metrics)', apply: 'Apply', noResults: 'No publications found.', back: 'Back to blog', previous: 'Previous', next: 'Next', copyLink: 'Copy link', copied: 'Link copied', share: 'Share', author: 'About the author', related: 'Related publications', toc: 'In this article', rss: 'RSS', draftNotice: 'Content in preparation', readTime: 'min read', min: 'min', page: 'Page', of: 'of', year: 'Publications from', tag: 'Tag', type: 'Type', external: 'related external content', noJs: 'Instant filters and search require JavaScript. Type, year and tag pages remain available.', updatedLabel: 'Updated on', publishedLabel: 'Published on', by: 'by', translation: 'Ler em português', loadError: 'Interactive controls could not be loaded. The static list remains available.'
  }
};

const typeNames = {
  'pt-BR': { article: 'Artigos', note: 'Posts curtos', podcast: 'Podcasts', video: 'Vídeos', talk: 'Palestras', project: 'Projetos', book: 'Livros' },
  en: { article: 'Articles', note: 'Short posts', podcast: 'Podcasts', video: 'Videos', talk: 'Talks', project: 'Projects', book: 'Books' }
};

async function loadPosts() {
  const files = (await fs.readdir(CONTENT_DIR)).filter(file => file.endsWith('.md')).sort();
  const posts = [];
  for (const file of files) {
    const source = await fs.readFile(path.join(CONTENT_DIR, file), 'utf8');
    const { data, body } = parseFrontMatter(source, file);
    const post = validatePost({ ...data, body, excerpt: data.excerpt || data.description }, file);
    post.readingTime = post.readingTime || readingTime(body, post.language);
    post.updatedAt = post.updatedAt || post.publishedAt;
    post.tags = [...new Set(post.tags.map(normalizeTag))];
    post.url = postUrl(post);
    posts.push(post);
  }
  assertUniquePosts(posts);
  return posts.filter(isPublishable);
}

function formatDate(date, language, short = false) {
  return new Intl.DateTimeFormat(language, short ? { day: '2-digit', month: 'short' } : { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`)).replace('.', '');
}

function xml(value) {
  return escapeHtml(value).replaceAll('&#039;', '&apos;');
}

function analytics() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=G-NL5R9VPGV9"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-NL5R9VPGV9');</script>`;
}

function commonHead({ language, title, description, canonical, image = '/images/intro-bg.jpg', type = 'website', jsonLd = null, noindex = false, alternates = [] }) {
  const absoluteImage = image.startsWith('https://') ? image : `${SITE_URL}${image}`;
  const alternateLinks = alternates.map(item => `<link rel="alternate" hreflang="${escapeHtml(item.language)}" href="${SITE_URL}${escapeHtml(item.url)}">`).join('\n');
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="author" content="${AUTHOR}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src https://www.youtube-nocookie.com https://open.spotify.com; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests">
<link rel="canonical" href="${SITE_URL}${canonical}">
${alternateLinks}
<link rel="alternate" type="application/rss+xml" title="Blog — ${language === 'en' ? 'English' : 'Português'}" href="${SITE_URL}${language === 'en' ? '/en' : ''}/blog/rss.xml">
<link rel="icon" href="/images/icons/favicon.ico">
<link rel="stylesheet" href="/blog/assets/blog.css">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Cássio B. Pereira — Application Security">
<meta property="og:locale" content="${language === 'en' ? 'en_US' : 'pt_BR'}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${SITE_URL}${canonical}">
<meta property="og:image" content="${absoluteImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@cassiodeveloper">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${absoluteImage}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>` : ''}
${analytics()}`;
}

function header(language, active = 'blog') {
  const t = ui[language];
  return `<a class="skip-link" href="#main-content">${language === 'en' ? 'Skip to content' : 'Pular para o conteúdo'}</a>
<header class="blog-header">
  <div class="blog-shell header-inner">
    <a class="brand" href="${t.prefix || '/'}" aria-label="${escapeHtml(t.home)}"><img src="/images/Logo.png" width="104" height="42" alt="Cássio Pereira"></a>
    <nav aria-label="${language === 'en' ? 'Primary navigation' : 'Navegação principal'}">
      <a href="${t.prefix || '/'}">${escapeHtml(t.home)}</a>
      <a href="${t.prefix}/blog/"${active === 'blog' ? ' aria-current="page"' : ''}>Blog</a>
      <a href="${language === 'en' ? '/blog/' : '/en/blog/'}" lang="${language === 'en' ? 'pt-BR' : 'en'}">${language === 'en' ? 'PT' : 'EN'}</a>
      <button class="theme-toggle" type="button" aria-label="${language === 'en' ? 'Switch color theme' : 'Alternar tema de cores'}" title="${language === 'en' ? 'Switch theme' : 'Alternar tema'}">◐</button>
    </nav>
  </div>
</header>`;
}

function footer(language) {
  const t = ui[language];
  return `<footer class="blog-footer"><div class="blog-shell footer-inner"><div><strong>Cássio B. Pereira</strong><p>Application Security · DevSecOps · Secure Development</p></div><nav aria-label="${language === 'en' ? 'Footer' : 'Rodapé'}"><a href="${t.prefix}/blog/rss.xml" data-analytics="rss">RSS</a><a href="https://www.linkedin.com/in/cassiodeveloper/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:cassio@cassiobp.com.br">E-mail</a></nav><p class="copyright">© ${new Date().getUTCFullYear()} Cássio B. Pereira</p></div></footer>`;
}

function documentPage({ language, head, body, pageClass = '' }) {
  return `<!doctype html><html lang="${language}" class="no-js"><head>${head}<script>document.documentElement.classList.replace('no-js','js')</script></head><body class="${pageClass}">${header(language)}${body}${footer(language)}<script src="/blog/assets/blog.js" defer></script></body></html>\n`;
}

function quickLinks(language) {
  const t = ui[language];
  const prefix = t.prefix;
  const links = [
    ['', t.all], ['article', t.articles], ['note', t.notes], ['podcast', t.podcasts], ['talk', t.talks], ['video', t.videos], ['project', t.projects], ['book', t.books]
  ];
  return `<nav class="quick-links" aria-label="${language === 'en' ? 'Content types' : 'Tipos de conteúdo'}">${links.map(([type, label]) => `<a href="${type ? `${prefix}/blog/type/${type}/` : `${prefix}/blog/`}">${escapeHtml(label)}</a>`).join('')}<a href="${prefix}/blog/rss.xml" data-analytics="rss">RSS</a></nav>`;
}

function postMeta(post, language, compact = false) {
  const t = ui[language];
  const duration = post.duration ? `<span>${escapeHtml(post.duration)}</span>` : '';
  const reading = ['article', 'note', 'book'].includes(post.type) ? `<span>${post.readingTime} ${t.readTime}</span>` : '';
  return `<div class="post-meta"><span class="type-badge">${TYPE_LABELS[language][post.type]}</span><time datetime="${post.publishedAt}">${formatDate(post.publishedAt, language, compact)}</time>${reading}${duration}<span lang="${post.language}">${post.language === 'en' ? 'EN' : 'PT-BR'}</span>${post.externalUrl ? `<span title="${escapeHtml(t.external)}">↗ <span class="sr-only">${escapeHtml(t.external)}</span></span>` : ''}</div>`;
}

function feedItem(post, language) {
  const t = ui[language];
  return `<article class="feed-item${post.pinned ? ' is-pinned' : ''}" data-post-id="${escapeHtml(post.id)}">
    <div class="feed-date" aria-hidden="true"><time datetime="${post.publishedAt}">${formatDate(post.publishedAt, language, true)}</time></div>
    <div class="feed-content">${postMeta(post, language, true)}<h3><a href="${post.url}">${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.excerpt)}</p>${post.placeholder ? `<span class="preparation-label">${escapeHtml(t.draftNotice)}</span>` : ''}<ul class="tag-list" aria-label="${escapeHtml(t.tags)}">${post.tags.slice(0, 4).map(tag => `<li><a href="${ui[language].prefix}/blog/tag/${tag}/" data-tag="${tag}">#${tag}</a></li>`).join('')}</ul></div>
    ${post.thumbnail ? `<a class="feed-thumb" href="${post.url}" tabindex="-1" aria-hidden="true"><img src="${escapeHtml(post.thumbnail)}" width="144" height="96" loading="lazy" decoding="async" alt=""></a>` : ''}
  </article>`;
}

function groupedFeed(posts, language) {
  const years = groupBy(posts, post => post.publishedAt.slice(0, 4));
  return [...years.entries()].map(([year, items]) => `<section class="year-group" aria-labelledby="year-${year}"><h2 id="year-${year}"><a href="${ui[language].prefix}/blog/${year}/">${year}</a></h2><div>${items.map(post => feedItem(post, language)).join('')}</div></section>`).join('');
}

function filterPanel(posts, language) {
  const t = ui[language];
  const tags = [...new Set(posts.flatMap(post => post.tags))].sort();
  return `<form class="filters" id="blog-filters" action="${t.prefix}/blog/" method="get" role="search">
    <div class="search-field"><label for="search">${escapeHtml(t.search)}</label><div><input id="search" name="search" type="search" autocomplete="off" placeholder="${escapeHtml(t.searchHint)}"><button type="button" id="clear-search" hidden>${escapeHtml(t.clear)}</button></div></div>
    <label>${escapeHtml(t.type)}<select name="type"><option value="">${escapeHtml(t.all)}</option>${[...VALID_TYPES].map(type => `<option value="${type}">${escapeHtml(typeNames[language][type])}</option>`).join('')}</select></label>
    <label>${escapeHtml(t.language)}<select name="language"><option value="">${escapeHtml(t.all)}</option><option value="pt-BR">${escapeHtml(t.portuguese)}</option><option value="en">${escapeHtml(t.english)}</option></select></label>
    <label>${escapeHtml(t.tags)}<select name="tag"><option value="">${escapeHtml(t.all)}</option>${tags.map(tag => `<option value="${tag}">#${tag}</option>`).join('')}</select></label>
    <label>${escapeHtml(t.order)}<select name="sort"><option value="latest">${escapeHtml(t.latest)}</option><option value="oldest">${escapeHtml(t.oldest)}</option><option value="updated">${escapeHtml(t.updated)}</option><option value="views" disabled>${escapeHtml(t.mostRead)}</option></select></label>
    <button class="filter-submit" type="submit">${escapeHtml(t.apply)}</button>
  </form>`;
}

function rssCallout(language) {
  const t = ui[language];
  const title = language === 'en' ? 'Follow new publications' : 'Acompanhe novas publicações';
  const text = language === 'en' ? 'This blog is entirely static. Subscribe to the RSS feed to receive new publications.' : 'Este blog é inteiramente estático. Assine o feed RSS para acompanhar novas publicações.';
  const link = language === 'en' ? 'Follow via RSS' : 'Acompanhar por RSS';
  return '<aside class="rss-callout" aria-labelledby="rss-callout-title"><p class="eyebrow">RSS</p><h2 id="rss-callout-title">' + title + '</h2><p>' + text + '</p><a href="' + t.prefix + '/blog/rss.xml" data-analytics="rss">' + link + ' →</a></aside>';
}

function pagination(language, page, totalPages) {
  if (totalPages <= 1) return '';
  const t = ui[language];
  const prefix = t.prefix;
  const pageUrl = number => number === 1 ? `${prefix}/blog/` : `${prefix}/blog/page/${number}/`;
  return `<nav class="pagination" aria-label="${language === 'en' ? 'Pagination' : 'Paginação'}">${page > 1 ? `<a rel="prev" href="${pageUrl(page - 1)}">← ${escapeHtml(t.previous)}</a>` : '<span></span>'}<span>${escapeHtml(t.page)} ${page} ${escapeHtml(t.of)} ${totalPages}</span>${page < totalPages ? `<a rel="next" href="${pageUrl(page + 1)}">${escapeHtml(t.next)} →</a>` : '<span></span>'}</nav>`;
}

function searchPayload(posts) {
  return JSON.stringify(posts.map(post => ({ id: post.id, slug: post.slug, url: post.url, title: post.title, excerpt: post.excerpt, type: post.type, typeLabel: TYPE_LABELS[post.language][post.type], language: post.language, publishedAt: post.publishedAt, updatedAt: post.updatedAt, tags: post.tags, project: post.project || '', readingTime: post.readingTime, duration: post.duration || '', external: Boolean(post.externalUrl), pinned: Boolean(post.pinned), placeholder: Boolean(post.placeholder), thumbnail: post.thumbnail || '', searchText: plainText(`${post.title} ${post.description} ${post.body} ${post.tags.join(' ')} ${post.type} ${post.project || ''}`) }))).replaceAll('<', '\\u003c');
}

function listJsonLd(language, canonical, posts, title) {
  return { '@context': 'https://schema.org', '@type': 'Blog', '@id': `${SITE_URL}${canonical}#blog`, url: `${SITE_URL}${canonical}`, name: title, description: ui[language].description, inLanguage: language, author: { '@type': 'Person', '@id': `${SITE_URL}/#cassio`, name: AUTHOR }, blogPost: posts.slice(0, 20).map(post => ({ '@type': post.type === 'article' ? 'BlogPosting' : 'CreativeWork', headline: post.title, url: `${SITE_URL}${post.url}`, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: post.language })) };
}

function buildListPage({ language, allPosts, visiblePosts, canonical, title, heading = null, description = null, page = 1, totalPages = 1, showHighlights = false }) {
  const t = ui[language];
  const localPosts = allPosts.filter(post => post.language === language);
  const pinned = localPosts.filter(post => post.pinned).slice(0, 6);
  const pageTitle = `${title} — Cássio Pereira`;
  const body = `<main id="main-content"><section class="blog-hero"><div class="blog-shell"><a class="back-home" href="${t.prefix || '/'}">← ${escapeHtml(t.home)}</a><p class="eyebrow">Cássio Pereira</p><h1>${escapeHtml(heading || t.blog)}</h1><p class="hero-description">${escapeHtml(description || t.description)}</p>${quickLinks(language)}</div></section><div class="blog-shell content-shell">${showHighlights && pinned.length ? `<section class="pinned-section" aria-labelledby="pinned-title"><div class="section-heading"><p class="eyebrow">${escapeHtml(t.highlights)}</p><h2 id="pinned-title">${escapeHtml(t.highlights)}</h2></div>${pinned.map(post => feedItem(post, language)).join('')}</section>` : ''}<section class="feed-section" aria-labelledby="feed-title"><div class="section-heading"><div><p class="eyebrow">${escapeHtml(t.publications)}</p><h2 id="feed-title">${escapeHtml(heading || t.publications)}</h2></div><p id="results-count" role="status" aria-live="polite">${visiblePosts.length} ${language === 'en' ? 'items' : 'itens'}</p></div>${showHighlights ? filterPanel(allPosts, language) : ''}<noscript><p class="notice">${escapeHtml(t.noJs)}</p></noscript><div id="feed-results">${visiblePosts.length ? groupedFeed(visiblePosts, language) : `<div class="empty-state"><h3>${escapeHtml(t.noResults)}</h3><a href="${t.prefix}/blog/">${escapeHtml(t.clear)}</a></div>`}</div>${pagination(language, page, totalPages)}</section>${rssCallout(language)}</div><script id="blog-index" type="application/json" data-src="/blog/search-index.json"></script><div id="blog-error" class="sr-only" role="alert">${escapeHtml(t.loadError)}</div></main>`;
  return documentPage({ language, head: commonHead({ language, title: pageTitle, description: description || t.description, canonical, noindex: visiblePosts.length === 0, alternates: language === 'pt-BR' ? [{ language: 'pt-BR', url: '/blog/' }, { language: 'en', url: '/en/blog/' }, { language: 'x-default', url: '/blog/' }] : [{ language: 'en', url: '/en/blog/' }, { language: 'pt-BR', url: '/blog/' }], jsonLd: listJsonLd(language, canonical, visiblePosts, title) }), body, pageClass: 'blog-list-page' });
}

function postJsonLd(post) {
  const typeMap = { article: 'BlogPosting', note: 'BlogPosting', podcast: 'PodcastEpisode', video: 'VideoObject', talk: 'PresentationDigitalDocument', project: 'TechArticle', book: 'Article' };
  const data = { '@context': 'https://schema.org', '@type': typeMap[post.type], '@id': `${SITE_URL}${post.url}#post`, mainEntityOfPage: `${SITE_URL}${post.url}`, headline: post.title, description: post.description, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: post.language, author: { '@type': 'Person', '@id': `${SITE_URL}/#cassio`, name: AUTHOR }, image: `${SITE_URL}${post.socialImage || post.coverImage || '/images/intro-bg.jpg'}`, keywords: post.tags.join(', ') };
  if (post.type === 'podcast' && post.duration) data.timeRequired = post.duration;
  if (post.type === 'video' && post.duration) data.duration = post.duration;
  return { '@context': 'https://schema.org', '@graph': [data, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${ui[post.language].prefix}/blog/` }, { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${post.url}` }] }] };
}

function buildPostPage(post, posts) {
  const language = post.language;
  const t = ui[language];
  const rendered = renderMarkdown(post.body);
  const localPosts = posts.filter(item => item.language === language).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const index = localPosts.findIndex(item => item.id === post.id);
  const previous = localPosts[index + 1];
  const next = localPosts[index - 1];
  const translation = post.translationKey ? posts.find(item => item.translationKey === post.translationKey && item.language !== language) : null;
  const related = localPosts.filter(item => item.id !== post.id && item.tags.some(tag => post.tags.includes(tag))).slice(0, 3);
  const toc = rendered.headings.length >= 2 ? `<aside class="toc" aria-labelledby="toc-title"><h2 id="toc-title">${escapeHtml(t.toc)}</h2><ol>${rendered.headings.map(heading => `<li class="toc-level-${heading.level}"><a href="#${heading.id}">${escapeHtml(heading.title)}</a></li>`).join('')}</ol></aside>` : '';
  const embed = post.embedUrl && isAllowedEmbedUrl(post.embedUrl) ? '<section class="embed-consent" data-embed-url="' + escapeHtml(post.embedUrl) + '"><p>' + (language === 'en' ? 'Third-party media is blocked until you choose to load it.' : 'A mídia de terceiros fica bloqueada até você escolher carregá-la.') + '</p><button type="button" class="load-embed">' + (language === 'en' ? 'Load media' : 'Carregar mídia') + '</button><a href="' + escapeHtml(post.embedUrl) + '" target="_blank" rel="noopener noreferrer">' + (language === 'en' ? 'Open on the platform' : 'Abrir na plataforma') + ' ↗</a></section>' : '';
  const external = post.externalUrl && isSafeUrl(post.externalUrl, true) ? `<p class="external-resource"><a href="${escapeHtml(post.externalUrl)}" target="_blank" rel="noopener noreferrer" data-analytics="external">${language === 'en' ? 'Open related external content' : 'Abrir conteúdo relacionado'} ↗</a></p>` : '';
  const nav = `<nav class="post-navigation" aria-label="${language === 'en' ? 'Adjacent publications' : 'Publicações adjacentes'}"><div>${previous ? `<span>${escapeHtml(t.previous)}</span><a rel="prev" href="${previous.url}">${escapeHtml(previous.title)}</a>` : ''}</div><div>${next ? `<span>${escapeHtml(t.next)}</span><a rel="next" href="${next.url}">${escapeHtml(next.title)}</a>` : ''}</div></nav>`;
  const shareUrl = encodeURIComponent(`${SITE_URL}${post.url}`);
  const shareTitle = encodeURIComponent(post.title);
  const body = `<main id="main-content"><article class="post"><header class="post-hero"><div class="reading-shell"><a class="back-home" href="${t.prefix}/blog/">← ${escapeHtml(t.back)}</a>${postMeta(post, language)}<h1>${escapeHtml(post.title)}</h1><p class="post-description">${escapeHtml(post.description)}</p><div class="post-dates"><span>${escapeHtml(t.publishedLabel)} <time datetime="${post.publishedAt}">${formatDate(post.publishedAt, language)}</time></span>${post.updatedAt !== post.publishedAt ? `<span>${escapeHtml(t.updatedLabel)} <time datetime="${post.updatedAt}">${formatDate(post.updatedAt, language)}</time></span>` : ''}<span>${escapeHtml(t.by)} ${AUTHOR}</span></div><ul class="tag-list">${post.tags.map(tag => `<li><a href="${t.prefix}/blog/tag/${tag}/">#${tag}</a></li>`).join('')}</ul>${translation ? `<a class="translation-link" href="${translation.url}" hreflang="${translation.language}">${escapeHtml(t.translation)} →</a>` : ''}${post.placeholder ? `<div class="placeholder-notice" role="note"><strong>${escapeHtml(t.draftNotice)}</strong><p>${language === 'en' ? 'This page demonstrates the publishing structure. It is not presented as a finished article.' : 'Esta página demonstra a estrutura de publicação. O texto não é apresentado como um artigo finalizado.'}</p></div>` : ''}</div></header>${post.coverImage ? `<figure class="post-cover reading-shell"><img src="${escapeHtml(post.coverImage)}" width="1200" height="675" alt="${escapeHtml(post.coverAlt || '')}" decoding="async"></figure>` : ''}<div class="reading-shell article-layout">${toc}<div class="post-content">${rendered.html}${embed}${external}</div></div><div class="reading-shell post-actions"><button class="copy-link" type="button" data-copy-label="${escapeHtml(t.copied)}">${escapeHtml(t.copyLink)}</button><div aria-label="${escapeHtml(t.share)}"><a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener noreferrer" data-analytics="share">LinkedIn</a><a href="https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}" target="_blank" rel="noopener noreferrer" data-analytics="share">X</a><a href="mailto:?subject=${shareTitle}&body=${shareUrl}" data-analytics="share">E-mail</a></div></div><aside class="author-box reading-shell"><img src="/images/avatars/cassio-mini.png" width="72" height="72" loading="lazy" alt="Cássio Pereira"><div><p class="eyebrow">${escapeHtml(t.author)}</p><h2>Cássio Pereira</h2><p>${language === 'en' ? 'Application Security specialist, software architect, author, speaker and builder of security-focused projects.' : 'Especialista em Application Security, arquiteto de software, autor, palestrante e criador de projetos voltados à segurança.'}</p></div></aside>${related.length ? `<section class="related reading-shell" aria-labelledby="related-title"><h2 id="related-title">${escapeHtml(t.related)}</h2>${related.map(item => feedItem(item, language)).join('')}</section>` : ''}<div class="reading-shell">${nav}${rssCallout(language)}</div></article></main>`;
  const alternates = translation ? [{ language: post.language, url: post.url }, { language: translation.language, url: translation.url }] : [];
  return documentPage({ language, head: commonHead({ language, title: post.seoTitle || `${post.title} — Cássio Pereira`, description: post.seoDescription || post.description, canonical: post.canonicalUrl || post.url, image: post.socialImage || post.coverImage || '/images/intro-bg.jpg', type: 'article', noindex: Boolean(post.placeholder), alternates, jsonLd: postJsonLd(post) }), body, pageClass: 'blog-post-page' });
}

async function write(url, content) {
  const file = outputPathForUrl(ROOT, url);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content, 'utf8');
}

async function writeRaw(relative, content) {
  const file = path.join(ROOT, relative);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content, 'utf8');
}

function rss(posts, { language, title, description, url }) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>${xml(title)}</title><link>${SITE_URL}${url}</link><description>${xml(description)}</description><language>${language}</language><lastBuildDate>${new Date(`${BUILD_DATE}T00:00:00Z`).toUTCString()}</lastBuildDate><atom:link href="${SITE_URL}${url}" rel="self" type="application/rss+xml"/>${posts.map(post => `<item><title>${xml(post.title)}</title><link>${SITE_URL}${post.url}</link><guid isPermaLink="true">${SITE_URL}${post.url}</guid><pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(post.description)}</description><content:encoded><![CDATA[${renderMarkdown(post.body).html.replaceAll(']]>', ']]&gt;')}]]></content:encoded></item>`).join('')}</channel></rss>\n`;
}

async function updateSitemap(urls) {
  const file = path.join(ROOT, 'sitemap.xml');
  let sitemap = await fs.readFile(file, 'utf8');
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/cassiodeveloper\.com\.br\/(?:en\/)?blog\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  const blocks = urls.map(item => `  <url>\n    <loc>${SITE_URL}${item.url}</loc>\n    <lastmod>${item.updatedAt || BUILD_DATE}</lastmod>\n    <priority>${item.priority || '0.70'}</priority>\n  </url>`).join('\n');
  sitemap = sitemap.replace('</urlset>', `${blocks ? `\n${blocks}\n` : ''}</urlset>`);
  await fs.writeFile(file, sitemap, 'utf8');
}

async function build() {
  await cleanGeneratedBlog();
  const posts = (await loadPosts()).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  await writeRaw('blog/search-index.json', searchPayload(posts));
  const generatedUrls = [];
  for (const language of ['pt-BR', 'en']) {
    const t = ui[language];
    const local = posts.filter(post => post.language === language);
    const pages = Math.max(1, Math.ceil(local.length / PAGE_SIZE));
    for (let page = 1; page <= pages; page++) {
      const canonical = page === 1 ? `${t.prefix}/blog/` : `${t.prefix}/blog/page/${page}/`;
      const visible = local.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      await write(canonical, buildListPage({ language, allPosts: posts, visiblePosts: visible, canonical, title: t.blog, page, totalPages: pages, showHighlights: page === 1 }));
      generatedUrls.push({ url: canonical, priority: page === 1 ? '0.90' : '0.60' });
    }
    for (const [year, items] of groupBy(local, post => post.publishedAt.slice(0, 4))) {
      const url = `${t.prefix}/blog/${year}/`;
      await write(url, buildListPage({ language, allPosts: posts, visiblePosts: items, canonical: url, title: `${t.year} ${year}`, heading: `${t.year} ${year}` }));
      generatedUrls.push({ url });
    }
    for (const type of VALID_TYPES) {
      const items = local.filter(post => post.type === type);
      const url = `${t.prefix}/blog/type/${type}/`;
      await write(url, buildListPage({ language, allPosts: posts, visiblePosts: items, canonical: url, title: typeNames[language][type], heading: typeNames[language][type], description: `${items.length} ${language === 'en' ? 'publications' : 'publicações'}` }));
      if (items.length) generatedUrls.push({ url });
    }
    const tags = [...new Set(local.flatMap(post => post.tags))];
    for (const tag of tags) {
      const items = local.filter(post => post.tags.includes(tag));
      const url = `${t.prefix}/blog/tag/${tag}/`;
      await write(url, buildListPage({ language, allPosts: posts, visiblePosts: items, canonical: url, title: `#${tag}`, heading: `#${tag}`, description: `${items.length} ${language === 'en' ? 'publications with this tag' : 'publicações com esta tag'}` }));
      generatedUrls.push({ url });
      await writeRaw(`${url.replace(/^\//, '')}rss.xml`, rss(items, { language, title: `#${tag} — Cássio Pereira`, description: `Tag ${tag}`, url: `${url}rss.xml` }));
    }
    await writeRaw(`${t.prefix.replace(/^\//, '')}${t.prefix ? '/' : ''}blog/rss.xml`, rss(local, { language, title: `Blog — Cássio Pereira`, description: t.description, url: `${t.prefix}/blog/rss.xml` }));
  }
  const ptPosts = posts.filter(post => post.language === 'pt-BR');
  await writeRaw('blog/articles.xml', rss(ptPosts.filter(post => post.type === 'article'), { language: 'pt-BR', title: 'Artigos — Cássio Pereira', description: 'Artigos longos sobre Application Security e desenvolvimento seguro.', url: '/blog/articles.xml' }));
  await writeRaw('blog/podcast.xml', rss(ptPosts.filter(post => post.type === 'podcast'), { language: 'pt-BR', title: 'Podcasts — Cássio Pereira', description: 'Publicações relacionadas ao DevSecOps Podcast.', url: '/blog/podcast.xml' }));
  for (const post of posts) {
    await write(post.url, buildPostPage(post, posts));
    if (!post.placeholder) generatedUrls.push({ url: post.url, updatedAt: post.updatedAt, priority: '0.80' });
  }
  await updateSitemap(generatedUrls);
  console.log(`Blog gerado: ${posts.length} publicações, ${generatedUrls.length} páginas indexáveis.`);
}

await build();
