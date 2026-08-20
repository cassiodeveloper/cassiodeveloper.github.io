import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { test, before } from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertUniquePosts, isAllowedEmbedUrl, isPublishable, parseFrontMatter, renderMarkdown, validatePost } from '../scripts/blog-core.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => fs.readFileSync(path.join(ROOT, relative), 'utf8');

before(() => {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build-blog.mjs')], { cwd: ROOT, stdio: 'pipe' });
});

test('carrega somente produtos finalizados na listagem', () => {
  const html = read('blog/index.html');
  assert.match(html, /id="pinned-title"/);
  assert.match(html, /class="rss-callout"/);
  assert.match(html, /MARIA: priorização de riscos/);
  assert.match(html, /SecScore: decisões de segurança/);
  assert.match(html, /Codes &amp; Consequences/);
  assert.doesNotMatch(html, /Gates de segurança|Shift Left sem engenharia|Conteúdo em preparação/);
  assert.doesNotMatch(html, /newsletter-form|name="email"|Inscrever-se/);
  assert.doesNotMatch(html, /rel="next" href="\/blog\/page\/2\/"/);
  assert.equal(fs.existsSync(path.join(ROOT, 'blog/page/2/index.html')), false);
});

test('oferece filtros, ordenação, busca e índice apenas com projetos publicados', () => {
  const html = read('blog/index.html');
  for (const field of ['search', 'type', 'language', 'tag', 'sort']) assert.match(html, new RegExp('name="' + field + '"'));
  assert.match(html, /Mais lidos \(sem métricas\)[^<]*<\/option>/);
  assert.match(html, /role="status" aria-live="polite"/);
  assert.match(read('blog/assets/blog.js'), /setTimeout\(.+220/);
  assert.match(read('blog/assets/blog.js'), /normalize\('NFD'\)/);
  const index = JSON.parse(read('blog/search-index.json'));
  assert.equal(index.length, 14);
  assert.equal(index.some(post => post.placeholder), false);
  assert.equal(index.some(post => post.slug === 'facilitar-cybersec-games-seguranca-na-mesa'), true);
  assert.equal(index.some(post => post.slug === 'facilitating-cybersec-games-security-around-the-table'), true);
  assert.equal(index.some(post => post.slug === 'gates-de-seguranca-que-realmente-funcionam'), false);
});

test('gera páginas por tag, tipo, ano e idioma', () => {
  for (const file of ['blog/tag/appsec/index.html', 'blog/type/project/index.html', 'blog/type/book/index.html', 'blog/2026/index.html', 'en/blog/index.html']) {
    assert.ok(fs.existsSync(path.join(ROOT, file)), file);
  }
  assert.match(read('en/blog/index.html'), /lang="en"/);
  assert.match(read('blog/maria-priorizacao-de-riscos-em-application-security/index.html'), /Read in English/);
});

test('relaciona todas as traduções nos dois sentidos', () => {
  const pairs = [
    ['blog/maria-priorizacao-de-riscos-em-application-security/index.html', '/en/blog/maria-application-security-risk-prioritization/', 'Read in English'],
    ['blog/secscore-decisoes-de-seguranca-baseadas-em-contexto/index.html', '/en/blog/secscore-security-decisions-with-context/', 'Read in English'],
    ['blog/codes-and-consequences/index.html', '/en/blog/codes-and-consequences/', 'Read in English'],
    ['blog/devsecops-podcast/index.html', '/en/blog/devsecops-podcast/', 'Read in English'],
    ['blog/manifesto-appsec-motherfucker/index.html', '/en/blog/appsec-motherfucker-manifesto/', 'Read in English'],
    ['blog/seguranca-de-aplicacoes-homem-de-ferro/index.html', '/en/blog/application-security-through-iron-mans-mind/', 'Read in English'],
    ['blog/facilitar-cybersec-games-seguranca-na-mesa/index.html', '/en/blog/facilitating-cybersec-games-security-around-the-table/', 'Read in English'],
    ['en/blog/secscore-security-decisions-with-context/index.html', '/blog/secscore-decisoes-de-seguranca-baseadas-em-contexto/', 'Ler em português'],
    ['en/blog/codes-and-consequences/index.html', '/blog/codes-and-consequences/', 'Ler em português'],
    ['en/blog/devsecops-podcast/index.html', '/blog/devsecops-podcast/', 'Ler em português'],
    ['en/blog/appsec-motherfucker-manifesto/index.html', '/blog/manifesto-appsec-motherfucker/', 'Ler em português'],
    ['en/blog/application-security-through-iron-mans-mind/index.html', '/blog/seguranca-de-aplicacoes-homem-de-ferro/', 'Ler em português'],
    ['en/blog/facilitating-cybersec-games-security-around-the-table/index.html', '/blog/facilitar-cybersec-games-seguranca-na-mesa/', 'Ler em português']
  ];
  for (const [file, href, label] of pairs) {
    const html = read(file);
    assert.ok(html.includes('href="' + href + '"'), file + ' -> ' + href);
    assert.ok(html.includes(label), file + ' -> ' + label);
  }
});
test('remove páginas geradas de posts excluídos', () => {
  for (const slug of ['gates-de-seguranca-que-realmente-funcionam', 'shift-left-sem-engenharia', 'auto-remediation-em-seguranca', 'o-mito-dos-falsos-positivos', 'security-champions-que-realmente-funcionam', 'threat-modeling-alem-do-diagrama']) {
    assert.equal(fs.existsSync(path.join(ROOT, 'blog', slug, 'index.html')), false, slug);
  }
});

test('não publica rascunhos', () => {
  assert.equal(isPublishable({ draft: true }), false);
  assert.equal(isPublishable({ draft: false }), true);
});

test('gera RSS válido e separado por conteúdo e idioma', () => {
  for (const file of ['blog/rss.xml', 'blog/articles.xml', 'blog/podcast.xml', 'en/blog/rss.xml', 'blog/tag/appsec/rss.xml']) {
    const xml = read(file);
    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    assert.match(xml, /<rss version="2\.0"/);
    assert.match(xml, /<channel>/);
    assert.doesNotMatch(xml, /Conteúdo em preparação|Rascunho de validação/);
  }
  assert.match(read('blog/podcast.xml'), /DevSecOps Podcast/);
});

test('inclui SEO e dados estruturados de publicação final', () => {
  const post = read('blog/secscore-decisoes-de-seguranca-baseadas-em-contexto/index.html');
  assert.match(post, /<link rel="canonical" href="https:\/\/cassiodeveloper\.com\.br\/blog\/secscore-decisoes-de-seguranca-baseadas-em-contexto\/">/);
  assert.match(post, /<meta name="robots" content="index, follow, max-image-preview:large">/);
  assert.match(post, /"@type":"TechArticle"/);
  assert.match(post, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(post, /Conteúdo em preparação|articleSection":"undefined"/);
  assert.match(read('blog/type/video/index.html'), /<meta name="robots" content="noindex, follow">/);
  assert.match(read('sitemap.xml'), /secscore-decisoes-de-seguranca-baseadas-em-contexto/);
  assert.doesNotMatch(read('sitemap.xml'), /gates-de-seguranca-que-realmente-funcionam|blog\/type\/video/);
});

test('rejeita slug duplicado e metadados inválidos', () => {
  assert.throws(() => assertUniquePosts([{ id: '1', slug: 'igual', language: 'pt-BR' }, { id: '2', slug: 'igual', language: 'pt-BR' }]), /slug duplicado/);
  assert.throws(() => validatePost({ id: 'x', slug: '../x', title: 'X', description: 'X', type: 'invalid', language: 'pt-BR', publishedAt: 'hoje', tags: [], author: 'X' }), /slug deve|type inválido|publishedAt/);
});

test('escapa HTML malicioso e bloqueia links não permitidos no Markdown', () => {
  const rendered = renderMarkdown('<script>alert(1)</script>\n\n[clique](javascript:alert(1))').html;
  assert.match(rendered, /&lt;script&gt;/);
  assert.doesNotMatch(rendered, /<script>/);
  assert.doesNotMatch(rendered, /href="javascript:/);
  assert.equal(isAllowedEmbedUrl('https://www.youtube-nocookie.com/embed/example'), true);
  assert.equal(isAllowedEmbedUrl('https://evil.example/embed/example'), false);
});

test('front matter sustentável preserva arrays e booleanos', () => {
  const parsed = parseFrontMatter('---\nslug: "exemplo"\ntags: [appsec, devsecops]\ndraft: false\n---\nTexto');
  assert.deepEqual(parsed.data.tags, ['appsec', 'devsecops']);
  assert.equal(parsed.data.draft, false);
});

test('controles interativos usam elementos nativos navegáveis por teclado', () => {
  const html = read('blog/index.html');
  assert.match(html, /<form class="filters"/);
  assert.match(html, /<button class="filter-submit" type="submit">/);
  assert.match(html, /<a class="skip-link" href="#main-content">/);
  assert.match(read('blog/assets/blog.css'), /:focus-visible/);
  assert.match(read('blog/assets/blog.css'), /prefers-reduced-motion/);
});
