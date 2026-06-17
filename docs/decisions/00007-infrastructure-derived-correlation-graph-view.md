---
id: "00007"
title: "Infrastructure - Derived Correlation Graph View"
type: "process"
date: "2026-06-17"
tags:
  - infrastructure
  - docs
  - graph
  - mermaid
  - derived
  - inventory
dependsOn: ["00001", "00002", "00004", "00006"]
supersedes: []
related: ["00003", "00005"]
---

## AI Summary

`docs/infrastructure-graphs.md` is now a derived documentation view for the committed infrastructure inventory. It presents the observed providers, resources, and cross-resource correlations at multiple abstraction levels, and it SHALL be updated in the same change set whenever the underlying inventory data changes.

## Context

The repository already keeps infrastructure inventory as committed TypeScript under `infrastructure/`, with Contabo represented by a direct-read script and Coolify / Cloudflare represented from observed provider data. That inventory is useful for machines, but it is harder for humans to compare providers, spot overlaps, and understand how servers, applications, domains, and external instances relate to one another.

We introduced `docs/infrastructure-graphs.md` to provide a compact visual view of the current inventory. Because it is derived from the committed inventory rather than a source of truth itself, it must remain synchronized with the underlying provider data.

## Decision

`docs/infrastructure-graphs.md` SHALL be maintained as a derived correlation document for the current infrastructure inventory.

- It SHALL be updated whenever committed infrastructure data changes.
- It SHALL reflect only directly observed or explicitly committed relationships.
- It SHALL distinguish verified correlations from broader structural similarities.
- It SHALL remain secondary to the provider TypeScript and decision records as the canonical inventory sources.

## Rationale

- **Discoverability:** Human readers can see the infrastructure shape without scanning provider files.
- **Traceability:** The graph can summarize the same inventory that is already committed in code.
- **Accuracy:** Requiring updates alongside inventory changes prevents the diagram from drifting.
- **Consistency:** The document follows the same derived-doc pattern already used for `docs/architecture.md` and `docs/decisions/index.md`.

## Consequences

**Positive:**
- Correlations between providers become easier to review and discuss.
- The graph can be regenerated from the current inventory state during future updates.
- Changes to infrastructure surface a corresponding documentation maintenance step.

**Negative:**
- Every inventory change now carries an additional documentation update obligation.
- The graph can still become stale if the update step is missed.
- Ambiguous relationships must be omitted or clearly labeled to avoid overstating certainty.

## Implementation Notes

- Keep `docs/infrastructure-graphs.md` in sync with `infrastructure/index.ts` and the provider files.
- Show provider-level, resource-level, and correlation-level views.
- Preserve the distinction between verified matches, such as shared IPs, and weaker structural similarities.
- If a future inventory change invalidates a graph claim, update the graph in the same commit.

## Provenance

**Author:** OpenCode with user direction

**Sources:**
- `docs/infrastructure-graphs.md`
- `docs/architecture.md`
- `docs/decisions/index.md`
- `infrastructure/index.ts`
- `infrastructure/providers/*.ts`
