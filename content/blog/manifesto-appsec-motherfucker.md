---
id: "manifesto-appsec"
slug: "manifesto-appsec-motherfucker"
title: "Manifesto AppSec, Motherfucker"
description: "Por que AppSec precisa sair do teatro de conformidade e voltar a falar sobre decisões, engenharia e risco real."
type: "note"
language: "pt-BR"
publishedAt: "2026-07-10"
updatedAt: "2026-07-10"
tags: [appsec, secure-development, manifesto]
featured: true
pinned: true
draft: false
placeholder: false
project: "AppSec, Motherfucker"
author: "Cássio Batista Pereira"
translationKey: "appsec-motherfucker-manifesto"
thumbnail: "/images/folio/motherfucker.png"
coverImage: "/images/folio/motherfucker.png"
coverAlt: "Identidade visual do manifesto AppSec, Motherfucker"
seoTitle: "AppSec, Motherfucker: um manifesto contra segurança de fachada"
seoDescription: "Uma introdução ao manifesto AppSec, Motherfucker e à crítica de uma segurança reduzida a checklist, relatório e ferramenta."
---

# AppSec precisa voltar a falar a verdade

Muitas organizações dizem que fazem Application Security porque executam um scanner, recebem um relatório de pentest ou possuem uma etapa de aprovação no pipeline.

Isso não significa que o software está mais seguro.

**AppSec, Motherfucker** é um manifesto contra a segurança tratada como decoração de processo. Ele existe para provocar quem transformou desenvolvimento seguro em checklist, dashboard ou ritual de compliance sem consequência prática.

## O problema não é falta de ferramenta

Ferramentas são necessárias. SAST, DAST, SCA e outras tecnologias ajudam a encontrar problemas em uma escala que análise manual não conseguiria alcançar.

O erro começa quando o resultado da ferramenta vira o objetivo.

Um scanner pode produzir milhares de findings e ainda assim a organização pode não saber:

- quais aplicações concentram o maior risco;
- quem deve corrigir cada problema;
- quais findings são relevantes para o contexto;
- o que realmente deve bloquear uma entrega;
- se uma vulnerabilidade corrigida deixou de existir em produção.

Ferramenta é sensor. AppSec é o sistema de decisões, responsabilidades e ações construído ao redor desse sensor.

## Compliance não é o destino

Compliance pode estabelecer uma base, exigir evidências e tornar responsabilidades visíveis. Mas passar em uma auditoria não garante que as decisões técnicas corretas estão sendo tomadas.

Segurança de verdade aparece no design, no código, no pipeline, na operação e na resposta a incidentes. Ela precisa funcionar quando existe pressão por prazo, quando o sistema é legado e quando o finding não possui uma resposta óbvia.

O manifesto questiona a distância entre o processo documentado e o processo que realmente executa.

## Para quem é o manifesto

Este texto é para:

- profissionais de AppSec cansados de produzir relatórios que ninguém usa;
- desenvolvedores que recebem findings sem contexto;
- gestores que confundem volume de alertas com redução de risco;
- equipes que adicionaram scanners ao pipeline e chamaram isso de DevSecOps;
- organizações que querem discutir segurança com mais honestidade.

Não é um framework de maturidade nem uma metodologia pronta para implantação. É um convite para interromper o piloto automático e revisar o que as práticas atuais estão realmente entregando.

## Como usar a provocação

Leia, discorde e leve as perguntas para o seu time.

Observe o pipeline que executa, não apenas o diagrama. Escolha um finding importante e acompanhe o caminho completo até a correção. Verifique quem decide, quem recebe contexto, quanto tempo leva e como a solução é validada.

Se o processo não consegue responder essas perguntas, mais uma ferramenta provavelmente não resolverá o problema.

O nome é propositalmente desconfortável. Segurança de fachada também deveria ser.

[Ler o manifesto original](/AppSec-Motherfucker/)
