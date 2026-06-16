---
id: "00002"
title: "Condensed Architecture and Decisions Index"
type: "governance"
date: "2026-06-16"
tags:
  - governance
  - documentation
  - architecture
  - decision-records
dependsOn: ["00001"]
supersedes: []
related: ["00000"]
---

## AI Summary

This repository maintains two derived documentation views from accepted Decision Records: `docs/architecture.md` and `docs/decisions/index.md`. The architecture file provides a condensed reader-friendly view of the current architecture, and the index file provides a navigable catalog of Decision Records. The Decision Records themselves remain the source of truth.

## Context

The repository already uses Decision Records to capture important architectural and governance choices, but reading the full set of DRs is slower than necessary for orientation and retrieval. A compact architecture document and a simple index improve discoverability without replacing the canonical DR files.

## Decision

All accepted Decision Records MUST be reflected in `docs/architecture.md`, and all Decision Record files MUST be listed in `docs/decisions/index.md`.

## Rationale

- **Discoverability:** Readers can understand the current architecture quickly without opening every DR.
- **Navigation:** A dedicated index makes the decision set easy to browse.
- **Separation of concerns:** DRs stay canonical while derived docs optimize reading.
- **Low overhead:** The derived files are simple summaries, not parallel specifications.

### Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| DRs only | Accurate but slower to scan and navigate |
| Put index into `architecture.md` only | Blends two purposes and becomes harder to maintain |
| Generate both files later with tooling only | Useful eventually, but unnecessary to establish the rule now |

## Consequences

**Positive:**
- Faster onboarding and repository orientation
- Easier retrieval of current architectural intent
- Clear directory-level entry point for all decisions

**Negative:**
- Documentation must be kept in sync with accepted DRs
- Summaries can drift if updates are made carelessly
- Maintainers now own one more governance check during changes

## Implementation Notes

- `docs/architecture.md` is a condensed derivative of accepted DRs
- `docs/decisions/index.md` lists all DRs and the template
- The DR files under `docs/decisions/` remain authoritative when conflicts exist
- New accepted DRs should update both derived documents in the same change

## Provenance

**Author:** Repository collaborator

**Sources:**
- 00000 Phoenix Architecture
- 00001 Governance - Decision Records Format and Process
