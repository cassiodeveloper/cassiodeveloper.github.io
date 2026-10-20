# Mapa de jogos e serviços

Implementação local na landing page de facilitação `/cybersecgames/`. Este repositório é um site estático; não contém o tema Shopify de cybersecgames.com. Não houve publicação nem alteração da loja oficial.

## Arquivos

- `index.html`: ponto de montagem, diálogo nativo, navegação, CSS e módulo JavaScript; CSP permite as imagens do domínio oficial.
- `script.js`: tradução do novo link e restauração de idioma ao voltar/avançar.
- `discovery-data.js`: 17 produtos, 35 casos de uso, taxonomias bilíngues, cenários editoriais e função pura de filtragem.
- `discovery.js`: controles, cartões, matriz, ciclo de vida, detalhes e preenchimento do contato existente.
- `discovery.css`: estilos usando as fontes, cores e variáveis da landing page; layouts móvel, tablet e desktop.
- `../tests/discovery.test.mjs`: integridade dos relacionamentos, interseção dos filtros, busca e restauração da URL.

## Filtros e relacionamento

Os filtros fazem interseção no nível do caso de uso. Um jogo só aparece se pelo menos um dos seus casos atender a todos os critérios. Selecionar um jogo sem outros filtros retorna todos os seus serviços. O detalhe sempre permite selecionar todos os casos daquele jogo, inclusive os que não atendem aos filtros atuais.

A busca considera títulos, serviços, entregáveis, públicos, domínios e processos em português e inglês, ignorando acentos. Os parâmetros `map-mode`, `map-view`, `map-q`, `map-game`, `map-domain`, `map-process`, `map-audience` e `map-engagement` preservam filtros e visualização na URL, mantendo parâmetros alheios ao componente. `pushState` e `popstate` suportam voltar e avançar.

A matriz deriva as células dos mesmos casos de uso usados nos cartões. O ciclo de vida ignora apenas o filtro de etapa ao mostrar as etapas disponíveis, permitindo visualizar todas as aplicações do jogo selecionado; os demais filtros continuam valendo. Selecionar uma etapa aplica o filtro de processo. Os IDs de processo representam oito etapas corporativas; o nome de cada serviço e seu cenário detalham a atividade proposta dentro delas.

`gameIds` representa a associação de muitos jogos a muitos casos. Para associar um serviço compartilhado a outro jogo, acrescente seu ID nessa lista. Preserve IDs existentes ao editar rótulos. Para novos serviços, acrescente entradas ao final da lista do jogo e atualize `serviceProcesses`; não renumere serviços já publicados. Cada jogo precisa de um cenário bilíngue em `scenarios`.

## Catálogo e limites editoriais

Títulos, URLs e imagens conferidos em 19/10/2026 em https://cybersecgames.com/collections/all-games e nas páginas de produto vinculadas. As imagens são servidas pelo CDN da própria loja com largura de 640 pixels, carregamento sob demanda e espaço reservado. Falhas de imagem exibem mensagem e preservam o link do produto.

- “OWASP Cornucopia Companion” corresponde ao **OWASP Cornucopia Web App Companion Set - 25ᵗʰ Anniversary Edition**. Não é apresentado como um produto independente inventado.
- A edição Web encontrada é 3.0; a edição Mobile, 2.0.
- Byte Club indicava reposição pendente na página consultada. O componente orienta confirmar disponibilidade na loja; não promete estoque dos demais produtos.
- A API pública `products.json` respondeu com proteção de conexão. A validação usou a página pública do catálogo e suas imagens observadas no navegador. Não há sincronização automática de estoque ou catálogo neste site estático.
- Não foram adicionados preços, duração de workshops, certificações ou promessas de conformidade. Serviços, entregáveis e cenários são propostas editoriais baseadas no briefing, não descrições oficiais dos produtos nem compromissos comerciais já confirmados.
- A aderência formal a MASVS e os tempos de cada workshop não foram confirmados; essas alegações foram omitidas.

Os CTAs de facilitação abrem os detalhes para escolher o serviço e o formato e depois preenchem `message` no formulário existente. Preservam texto digitado previamente e não enviam dados automaticamente. O envio continua usando o mecanismo existente da página, cujo fallback é o cliente de e-mail.

## Validação

`node --test` executa a suíte completa. Os testes existentes do blog também executam seu gerador. A verificação de links `node scripts/check-links.mjs` encontrou referências preexistentes a `/talks` em `index.html` e `carrer/index.html`, sem relação com o mapa.

Validação manual no navegador: filtros e estado vazio, matriz, seleção de serviço, contato contextualizado, idioma EN/PT, abertura via Enter, fechamento via Escape, restauração de foco, histórico voltar/avançar e larguras de 390, 768 e 1280 pixels. Nenhuma requisição de contato foi enviada.

## SEO e eventos de navegação
O HTML inicial inclui os 17 jogos e serviços via `node scripts/build-discovery.mjs` (também no build). Canonical e Open Graph consolidam filtros na URL do idioma; título, descrição e hreflang foram alinhados. A tradução PT ainda depende de JavaScript.

GA4 existente: G-NL5R9VPGV9. Eventos: csg_filter, csg_search, csg_mode, csg_view, csg_reset, csg_history, csg_case_open/change/close, csg_engagement, csg_inquiry, csg_game_click, csg_navigation, csg_section_view e csg_language. Parâmetros usam IDs, origem, contagens e indicador de busca ativa. Não enviar texto da busca nem mensagens do formulário. csg_inquiry representa preenchimento do contato, não envio ou lead confirmado. Seção vista significa entrada da seção no viewport, uma vez por carregamento.

No painel GA4, registrar dimensões de evento como filter_name, filter_value, game_id, case_id, source e section_id; métricas result_count e use_case_count. Validar no DebugView após publicação. Revisar medição otimizada: desativar pageviews por mudança de histórico para evitar contar filtros como páginas e não configurar map-q como busca automática. Configurações administrativas não foram alteradas. Referência: https://developers.google.com/analytics/devguides/collection/ga4/event-parameters
