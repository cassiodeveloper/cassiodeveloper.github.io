---
id: "maria-risk-pt"
slug: "maria-priorizacao-de-riscos-em-application-security"
title: "MARIA: priorização de riscos em Application Security"
description: "Como a MARIA transforma achados dispersos de segurança em uma visão de risco compreensível, priorizável e útil para engenharia."
type: "project"
language: "pt-BR"
publishedAt: "2026-07-10"
updatedAt: "2026-07-10"
tags: [maria, appsec, vulnerability-management, application-risk]
featured: true
pinned: true
draft: false
placeholder: false
project: "MARIA"
author: "Cássio Batista Pereira"
thumbnail: "/images/folio/maria.png"
coverImage: "/images/folio/maria.png"
coverAlt: "Identidade visual do projeto MARIA"
externalUrl: "https://mariaappsec.com"
translationKey: "maria-risk-intelligence"
seoTitle: "MARIA: inteligência e priorização de risco em Application Security"
seoDescription: "Conheça a MARIA, uma plataforma de Application Risk Intelligence criada para transformar findings de segurança em decisões priorizadas."
---

# Segurança não precisa de mais uma lista de vulnerabilidades

SAST, SCA, análise de secrets, containers, IaC, DAST e SBOM resolvem problemas importantes. O desafio aparece quando cada ferramenta produz sua própria fila, sua própria severidade e sua própria linguagem. No final, o time recebe muitos achados e continua sem uma resposta simples: **o que representa mais risco para a aplicação agora?**

A MARIA nasceu para responder essa pergunta.

M.A.R.I.A significa **Management Application Risk Integrated Analysis**. É uma plataforma de Application Risk Intelligence criada para agregar evidências de ferramentas de segurança, normalizar esses sinais e transformá-los em uma visão de risco que desenvolvedores, Security Champions e equipes de segurança consigam usar.

A MARIA não é um scanner. Ela trabalha acima dos scanners que a organização já possui.

## O problema que a MARIA resolve

Um finding isolado raramente conta a história inteira. A mesma vulnerabilidade pode ter impactos muito diferentes dependendo da aplicação, do componente afetado, da exposição, da criticidade do negócio e do momento em que foi introduzida.

Sem contexto, as equipes acabam priorizando por contagem ou por severidade bruta. Isso cria três efeitos conhecidos:

- milhares de alertas competindo pela mesma atenção;
- desenvolvedores recebendo trabalho sem contexto suficiente;
- equipes de segurança gastando tempo consolidando planilhas e dashboards desconectados.

A MARIA organiza o problema a partir da aplicação e do risco, não da ferramenta que encontrou o problema.

## Como a plataforma organiza o risco

### Ingestão e normalização

A plataforma foi desenhada para consumir formatos já usados no ecossistema de segurança, incluindo SARIF, CycloneDX e saídas estruturadas de scanners. Os achados são normalizados para que ferramentas diferentes possam contribuir para a mesma análise.

### Risk Engine

O Risk Engine combina os sinais disponíveis para calcular risco por repositório e por aplicação. O objetivo não é esconder os findings atrás de um número mágico, mas explicar quais fatores estão direcionando o risco e por que uma ação merece prioridade.

### Risco em Pull Requests

Uma mudança de código pode introduzir dependências vulneráveis, tocar módulos sensíveis ou alterar a exposição da aplicação. A análise de Pull Request procura mostrar o delta de risco da mudança antes que ela seja incorporada, aproximando a decisão de segurança do fluxo de desenvolvimento.

### Evolução ao longo do tempo

Risco também é histórico. A MARIA registra como a postura muda quando vulnerabilidades entram, correções são concluídas, dependências mudam e decisões são tomadas. Essa linha do tempo ajuda a diferenciar um problema pontual de uma dívida de segurança crescente.

### Uma visão útil para Security Champions

Security Champions precisam saber onde agir, não apenas quantos alertas existem. A experiência da MARIA é orientada a backlog, drivers de risco, evolução e ações possíveis dentro das aplicações acompanhadas pelo Champion.

## Para quem a MARIA foi criada

A plataforma atende organizações que já usam ferramentas de segurança, mas ainda enfrentam dificuldade para conectar os resultados ao trabalho diário de engenharia.

Ela é especialmente útil para:

- equipes de AppSec consolidando sinais de múltiplos scanners;
- líderes de engenharia comparando risco entre aplicações;
- desenvolvedores que precisam entender por que uma correção é prioritária;
- Security Champions acompanhando o risco dos seus produtos;
- organizações que querem medir evolução sem depender apenas de contagens.

## O princípio por trás do produto

O nome também é uma homenagem à minha mãe, Maria, que dedicou a vida a cuidar de outras pessoas. A filosofia do produto segue essa ideia: cuidar do software continuamente, entender seus riscos e agir antes que o problema se transforme em incidente.

A ambição da MARIA é simples de explicar e difícil de executar: tornar o risco de aplicações **mensurável, compreensível e acionável**.

[Conheça a MARIA](https://mariaappsec.com)
