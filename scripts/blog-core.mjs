import path from 'node:path';

export const SITE_URL = 'https://cassiodeveloper.com.br';
export const AUTHOR = 'Cássio Batista Pereira';
export const VALID_TYPES = new Set(['article', 'note', 'podcast', 'video', 'talk', 'project', 'book']);
export const VALID_LANGUAGES = new Set(['pt-BR', 'en']);

const REQUIRED = ['id', 'slug', 'title', 'description', 'type', 'language', 'publishedAt', 'tags', 'author'];

export const TYPE_LABELS = {
  'pt-BR': { article: 'ARTIGO', note: 'NOTA', podcast: 'PODCAST', video: 'VÍDEO', talk: 'PALESTRA', project: 'PROJETO', book: 'LIVRO' },
  en: { article: 'ARTICLE', note: 'NOTE', podcast: 'PODCAST', video: 'VIDEO', talk: 'TALK', project: 'PROJECT', book: 'BOOK' }
};

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function stripQuotes(value) {
  const text = value.trim();
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1);
  }
  return text;
}

function parseScalar(value) {
  const text = value.trim();
  if (text === 'true') return true;
  if (text === 'false') return false;
  if (text === 'null' || text === '') return null;
  if (/^\d+$/.test(text)) return Number(text);
  if (text.startsWith('[') && text.endsWith(']')) {
    return text.slice(1, -1).split(',').map(item => stripQuotes(item)).map(item => item.trim()).filter(Boolean);
  }
  return stripQuotes(text);
}

export function parseFrontMatter(source, fileName = 'content.md') {
  const normalized = source.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) throw new Error(`${fileName}: front matter ausente`);
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${fileName}: front matter não foi fechado`);
  const data = {};
  for (const [index, line] of normalized.slice(4, end).split('\n').entries()) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const match = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!match) throw new Error(`${fileName}:${index + 2}: campo inválido`);
    data[match[1]] = parseScalar(match[2]);
  }
  return { data, body: normalized.slice(end + 5).trim() };
}

export function normalizeTag(tag) {
  return String(tag).trim().toLocaleLowerCase('en-US').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function isAllowedEmbedUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return false;
    if (url.hostname === 'www.youtube-nocookie.com') return url.pathname.startsWith('/embed/');
    if (url.hostname === 'open.spotify.com') return url.pathname.startsWith('/embed/');
    return false;
  } catch {
    return false;
  }
}
export function validatePost(post, fileName = 'content.md') {
  const errors = [];
  for (const field of REQUIRED) if (post[field] === null || post[field] === undefined || post[field] === '') errors.push(`campo obrigatório: ${field}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug || '')) errors.push('slug deve conter apenas minúsculas, números e hífens');
  if (!VALID_TYPES.has(post.type)) errors.push(`type inválido: ${post.type}`);
  if (!VALID_LANGUAGES.has(post.language)) errors.push(`language inválido: ${post.language}`);
  for (const field of ['publishedAt', 'updatedAt']) {
    if (post[field] && !/^\d{4}-\d{2}-\d{2}$/.test(post[field])) errors.push(`${field} deve usar YYYY-MM-DD`);
    if (post[field] && Number.isNaN(Date.parse(`${post[field]}T00:00:00Z`))) errors.push(`${field} inválido`);
  }
  if (!Array.isArray(post.tags) || post.tags.length === 0) errors.push('tags deve conter ao menos uma tag');
  if (post.externalUrl && !isSafeUrl(post.externalUrl, true)) errors.push('externalUrl deve usar HTTPS');
  if (post.embedUrl && !isAllowedEmbedUrl(post.embedUrl)) errors.push('embedUrl deve usar a allowlist de YouTube sem cookies ou Spotify');
  if (post.coverImage && !String(post.coverImage).startsWith('/')) errors.push('coverImage deve ser um caminho absoluto do site');
  if (errors.length) throw new Error(`${fileName}: ${errors.join('; ')}`);
  return post;
}

export function isSafeUrl(value, externalOnly = false) {
  if (!value) return false;
  if (!externalOnly && (/^\/(?!\/)/.test(value) || /^#[A-Za-z0-9_-]+$/.test(value))) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function slugify(value) {
  return normalizeTag(value) || 'secao';
}

function inlineMarkdown(text) {
  let safe = escapeHtml(text);
  safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
  safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  safe = safe.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    if (!isSafeUrl(url)) return `${label} (${escapeHtml(url)})`;
    const external = url.startsWith('https://');
    return `<a href="${escapeHtml(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}${external ? '<span class="external-mark" aria-hidden="true"> ↗</span><span class="sr-only"> (abre em nova aba)</span>' : ''}</a>`;
  });
  return safe;
}

export function renderMarkdown(markdown) {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  const html = [];
  const headings = [];
  let paragraph = [];
  let list = null;
  let code = null;
  let codeLanguage = '';

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (!list) return;
    html.push(`</${list}>`);
    list = null;
  };
  const flushCode = () => {
    if (code === null) return;
    const language = codeLanguage.replace(/[^a-z0-9#+.-]/gi, '') || 'text';
    html.push(`<div class="code-block"><div class="code-toolbar"><span>${escapeHtml(language)}</span><button type="button" class="copy-code" aria-label="Copiar código">Copiar</button></div><pre tabindex="0"><code class="language-${escapeHtml(language)}">${escapeHtml(code.join('\n'))}</code></pre></div>`);
    code = null;
    codeLanguage = '';
  };

  for (const line of lines) {
    const fence = line.match(/^```([^`]*)$/);
    if (fence) {
      if (code === null) {
        flushParagraph(); closeList(); code = []; codeLanguage = fence[1].trim();
      } else flushCode();
      continue;
    }
    if (code !== null) { code.push(line); continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph(); closeList();
      const level = Math.min(6, Math.max(2, heading[1].length + 1));
      const title = heading[2].trim();
      const id = `${slugify(title)}-${headings.length + 1}`;
      headings.push({ level, title, id });
      html.push(`<h${level} id="${id}">${inlineMarkdown(title)}</h${level}>`);
      continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const wanted = unordered ? 'ul' : 'ol';
      if (list !== wanted) { closeList(); list = wanted; html.push(`<${wanted}>`); }
      html.push(`<li>${inlineMarkdown((unordered || ordered)[1])}</li>`);
      continue;
    }
    if (line.startsWith('> ')) {
      flushParagraph(); closeList(); html.push(`<blockquote><p>${inlineMarkdown(line.slice(2))}</p></blockquote>`); continue;
    }
    if (/^---+$/.test(line.trim())) { flushParagraph(); closeList(); html.push('<hr>'); continue; }
    if (!line.trim()) { flushParagraph(); closeList(); continue; }
    paragraph.push(line.trim());
  }
  flushParagraph(); closeList(); flushCode();
  return { html: html.join('\n'), headings };
}

export function plainText(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#>*_`-]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function readingTime(markdown, language = 'pt-BR') {
  const words = plainText(markdown).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / (language === 'pt-BR' ? 200 : 220)));
}

export function postUrl(post) {
  return `${post.language === 'en' ? '/en' : ''}/blog/${post.slug}/`;
}

export function isPublishable(post) {
  return !post.draft;
}

export function assertUniquePosts(posts) {
  const ids = new Set();
  const routes = new Set();
  for (const post of posts) {
    if (ids.has(post.id)) throw new Error(`id duplicado: ${post.id}`);
    if (routes.has(`${post.language}:${post.slug}`)) throw new Error(`slug duplicado: ${post.language}/${post.slug}`);
    ids.add(post.id); routes.add(`${post.language}:${post.slug}`);
  }
}

export function outputPathForUrl(root, urlPath) {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(root, clean, 'index.html');
}
