# Publicação no blog

O blog é estático e não adiciona framework, banco de dados ou CMS. Os arquivos em `content/blog/` são a fonte editorial; `npm run build` valida os metadados e gera as páginas em `blog/` e `en/blog/`, os feeds RSS e as entradas do sitemap.

## Criar uma publicação

1. Copie um arquivo Markdown existente de `content/blog/`.
2. Use um nome de arquivo descritivo. O nome não define a URL; `slug` define.
3. Preencha o front matter e escreva o corpo em Markdown.
4. Execute `npm run verify`.
5. Revise os arquivos gerados antes de publicar.

Exemplo mínimo:

```markdown
---
id: "identificador-estavel"
slug: "minha-publicacao"
title: "Minha publicação"
description: "Resumo objetivo e único."
type: "article"
language: "pt-BR"
publishedAt: "2026-07-10"
updatedAt: "2026-07-10"
tags: [appsec, devsecops]
featured: false
pinned: false
draft: true
placeholder: false
author: "Cássio Batista Pereira"
---
# Primeiro subtítulo

Conteúdo da publicação.
```

Use `draft: true` até a revisão editorial terminar. Rascunhos falham silenciosamente para o público: não entram em páginas, busca, RSS ou sitemap. `placeholder: true` é diferente: publica uma demonstração claramente identificada e aplica `noindex` para evitar que conteúdo incompleto seja tratado como artigo final.

## Metadados

Campos obrigatórios: `id`, `slug`, `title`, `description`, `type`, `language`, `publishedAt`, `tags` e `author`.

Campos opcionais: `excerpt`, `updatedAt`, `coverImage`, `coverAlt`, `thumbnail`, `featured`, `pinned`, `draft`, `placeholder`, `readingTime`, `duration`, `externalUrl`, `canonicalUrl`, `project`, `seoTitle`, `seoDescription`, `socialImage`, `translationKey`, `platform` e `embedUrl`.

Tipos aceitos: `article`, `note`, `podcast`, `video`, `talk`, `project` e `book`. Idiomas aceitos: `pt-BR` e `en`. Datas usam `YYYY-MM-DD`. Tags são normalizadas para minúsculas, sem acentos e sem duplicação por capitalização.

## Traduções

Crie um segundo arquivo Markdown com texto revisado no outro idioma. Use outro `id` e `slug`, informe `language: "en"` ou `language: "pt-BR"` e repita o mesmo `translationKey` nos dois arquivos. O build cria o link entre as versões. Não há tradução automática em tempo de execução.

## Fixar uma publicação

Defina `pinned: true`. Os seis fixados mais recentes do idioma aparecem em Destaques. `featured` fica disponível para futuras curadorias, mas não altera sozinho a ordem do feed.

## Adicionar um tipo

Inclua o identificador em `VALID_TYPES` e `TYPE_LABELS` em `scripts/blog-core.mjs`, traduza o nome em `typeNames` em `scripts/build-blog.mjs` e acrescente o comportamento visual/SEO necessário. Em seguida, crie testes antes de gerar o site.

## Markdown e segurança

O renderer aceita títulos, parágrafos, listas, citações, links, ênfase e blocos de código. HTML cru é escapado; URLs em Markdown aceitam apenas caminhos internos, âncoras e HTTPS. Embeds arbitrários não são permitidos. `embedUrl` aceita somente URLs HTTPS de `www.youtube-nocookie.com/embed/` e `open.spotify.com/embed/`; a mídia só é carregada após ação explícita do visitante e sempre possui link de fallback. Outras plataformas permanecem como links externos até receberem um componente allowlisted.

## Garantia de arquitetura estática

O blog não possui e não terá servidor de aplicação, API, formulário de inscrição, banco de dados ou CMS. Node executa apenas durante o build para transformar Markdown em HTML, JSON de busca, RSS e sitemap. No site publicado, tudo é arquivo estático.

Novas publicações entram exclusivamente como arquivos Markdown. RSS é o único mecanismo de assinatura. A ordenação por visualizações permanece indisponível porque o site não mantém contadores nem estado persistido.

## Comandos

- `npm run build`: valida e gera o blog, RSS e sitemap.
- `npm test`: executa testes unitários e de integração estática.
- `npm run lint`: valida a sintaxe JavaScript.
- `npm run check:links`: verifica links internos dos HTMLs locais.
- `npm run verify`: executa toda a sequência acima.
