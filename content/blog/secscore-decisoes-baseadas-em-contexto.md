---
id: "secscore-contexto"
slug: "secscore-decisoes-de-seguranca-baseadas-em-contexto"
title: "SecScore: decisões de segurança baseadas em contexto"
description: "Como o SecScore transforma findings de scanners em um score e uma decisão objetiva para Pull Requests."
type: "project"
language: "pt-BR"
publishedAt: "2026-07-10"
updatedAt: "2026-07-10"
tags: [secscore, appsec, sarif, ci-cd]
featured: true
pinned: true
draft: false
placeholder: false
project: "SecScore"
author: "Cássio Batista Pereira"
translationKey: "secscore-decision-engine"
externalUrl: "https://secscore.dev"
seoTitle: "SecScore: score e decisões de segurança para CI/CD"
seoDescription: "Conheça o SecScore, motor open source que transforma findings SARIF em score e decisões PASS, REVIEW ou FAIL para Pull Requests."
---

# Scanner encontra. SecScore ajuda a decidir.

Ferramentas de segurança são excelentes sensores. Elas encontram vulnerabilidades, padrões inseguros e problemas em dependências, infraestrutura e código. O pipeline começa a falhar quando cada finding é tratado como se tivesse o mesmo impacto e toda ferramenta tenta decidir sozinha se uma entrega deve continuar.

O SecScore foi criado como uma camada de decisão entre os scanners e o Pull Request.

Ele consome findings, aplica uma política explícita e devolve duas respostas fáceis de entender:

- um score de segurança;
- uma decisão: **PASS**, **REVIEW** ou **FAIL**.

O SecScore não é um scanner. Ele usa os resultados das ferramentas que a equipe já executa.

## Do SARIF à decisão

SARIF é o caminho preferencial porque permite receber resultados de diferentes ferramentas em um formato comum. O SecScore também oferece modos específicos de provider quando uma integração direta faz sentido.

O fluxo é direto:

1. o scanner produz findings;
2. os resultados chegam ao SecScore;
3. a política define penalidades, limites e hard fails;
4. o motor calcula o score;
5. o Pull Request recebe uma decisão clara.

Isso reduz a distância entre encontrar um problema e tomar uma decisão de engenharia.

## Política em vez de severidade isolada

Severidade é importante, mas não deveria ser a única variável de um gate. Uma política do SecScore pode definir:

- penalidades diferentes por severidade;
- limites para PASS, REVIEW e FAIL;
- casos críticos que sempre causam hard fail;
- caminhos que devem ser ignorados, como artefatos gerados ou dependências vendorizadas;
- multiplicadores e regras adequadas ao contexto da organização.

A lógica de segurança fica na política, de forma transparente e versionável, em vez de escondida dentro de um dashboard ou de uma decisão manual impossível de reproduzir.

## Feito para Pull Requests

O lugar natural da decisão é onde a mudança está sendo revisada. O SecScore pode publicar o resultado no Pull Request, comentar os principais motivos e atualizar status checks usados por regras de branch protection.

Em vez de entregar dezenas de findings sem hierarquia, o time recebe uma resposta operacional:

- **PASS** quando não há risco significativo segundo a política;
- **REVIEW** quando contexto humano é necessário;
- **FAIL** quando a mudança viola uma regra que não deve ser ignorada.

O score não substitui a análise. Ele torna a decisão consistente e explica por que a análise é necessária.

## Compatibilidade sem lock-in

O SecScore é SARIF-first e foi desenhado para trabalhar com resultados produzidos por ferramentas como Snyk, Semgrep, CodeQL, KICS, Veracode e outras soluções que exportam o padrão. Também existe suporte a provider mode para Checkmarx.

Essa abordagem evita amarrar a política de segurança a um único scanner.

## Open source por um motivo

Um motor que influencia merge e branch protection precisa ser inspecionável. O core open source permite revisar a lógica, adaptar políticas, executar localmente e entender exatamente como cada score foi calculado.

Não existe ciência secreta por trás do número. Existe uma política conhecida, findings conhecidos e uma decisão reproduzível.

## Para quem faz sentido

O SecScore é voltado a equipes que já executam scanners no CI/CD e querem diminuir ruído sem abrir mão de controles.

Ele ajuda especialmente quando:

- vários scanners participam do mesmo pipeline;
- toda severidade alta está bloqueando o fluxo sem considerar contexto;
- a organização precisa de regras claras para branch protection;
- desenvolvedores recebem findings, mas não entendem a decisão esperada;
- AppSec quer transformar política em automação verificável.

O objetivo não é criar mais um dashboard. É dar ao Pull Request uma resposta que o time consiga usar.

[Conheça o SecScore](https://secscore.dev)
