---
id: "secscore-context-en"
slug: "secscore-security-decisions-with-context"
title: "SecScore: security decisions with context"
description: "How SecScore turns scanner findings into a score and a clear decision for Pull Requests."
type: "project"
language: "en"
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
seoTitle: "SecScore: security scores and decisions for CI/CD"
seoDescription: "Meet SecScore, the open-source engine that turns SARIF findings into a score and PASS, REVIEW or FAIL decisions for Pull Requests."
---
# Scanners find problems. SecScore helps teams decide.

Security tools are excellent sensors. They find vulnerabilities, insecure patterns and problems in dependencies, infrastructure and code. The pipeline starts to fail when every finding is treated as if it had the same impact and every tool attempts to decide whether a delivery should continue.

SecScore was created as a decision layer between scanners and the Pull Request.

It consumes findings, applies an explicit policy and returns two answers that everyone can understand:

- a security score;
- a decision: **PASS**, **REVIEW** or **FAIL**.

SecScore is not a scanner. It uses the output produced by the tools a team already runs.

## From SARIF to a decision

SARIF is the preferred path because it allows SecScore to receive results from different tools in a common format. Provider-specific modes are also available when a direct integration makes sense.

The flow is straightforward:

1. the scanner produces findings;
2. the results reach SecScore;
3. the policy defines penalties, thresholds and hard fails;
4. the engine calculates the score;
5. the Pull Request receives a clear decision.

This reduces the distance between detecting a problem and making an engineering decision.

## Policy instead of severity alone

Severity matters, but it should not be the only variable in a security gate. A SecScore policy can define:

- different penalties for each severity;
- thresholds for PASS, REVIEW and FAIL;
- critical cases that always cause a hard fail;
- paths that should be ignored, such as generated artifacts or vendored dependencies;
- multipliers and rules that reflect the organization's context.

Security logic lives in a transparent, versionable policy instead of being hidden inside a dashboard or an impossible-to-reproduce manual decision.

## Designed for Pull Requests

The natural place for a decision is where the change is being reviewed. SecScore can publish the result in the Pull Request, comment on the main reasons and update status checks used by branch protection rules.

Instead of receiving dozens of findings with no hierarchy, the team gets an operational answer:

- **PASS** when the policy finds no significant security risk;
- **REVIEW** when human context is required;
- **FAIL** when the change violates a rule that must not be ignored.

The score does not replace analysis. It makes the decision consistent and explains why an analysis may be necessary.

## Compatibility without lock-in

SecScore is SARIF-first and is designed to work with results produced by tools such as Snyk, Semgrep, CodeQL, KICS, Veracode and other solutions that export the standard. A provider mode for Checkmarx is also available.

This approach prevents the security policy from being tied to a single scanner.

## Open source for a reason

An engine that influences merges and branch protection must be inspectable. The open-source core allows teams to review the logic, adapt policies, run it locally and understand exactly how each score was calculated.

There is no secret science behind the number. There is a known policy, known findings and a reproducible decision.

## Who it is for

SecScore is intended for teams that already run scanners in CI/CD and want to reduce noise without removing controls.

It is particularly useful when:

- several scanners participate in the same pipeline;
- every high-severity finding blocks delivery without context;
- the organization needs explicit branch protection rules;
- developers receive findings but do not understand the expected decision;
- AppSec wants to turn policy into verifiable automation.

The objective is not to create another dashboard. It is to give the Pull Request an answer the team can use.

[Meet SecScore](https://secscore.dev)
