---
id: "00001"
title: "Governance — Decision Records Format and Process"
type: "governance"
date: "2026-06-16"
tags:
  - governance
  - decision-records
  - process
  - template
dependsOn: ["00000"]
supersedes: []
related: ["TMPL"]
---

## AI Summary

This repository uses Decision Records (DRs) to document all significant architectural and governance decisions. The format is defined in `docs/decisions/template.md`. This DR establishes the rules for numbering, lifecycle, and required sections of every DR.

## Context

Without governance, Decision Records drift in quality, format, and completeness. A consistent process ensures DRs remain useful for retrieval, review, and automated processing. `00000` (Phoenix Architecture) established the first architectural decision; this record formalises the process for all future DRs.

## Decision

All Decision Records in this repository MUST follow the template at `docs/decisions/template.md`, be sequentially numbered (`00000`, `00001`, ...), carry a unique slug, and pass through the lifecycle stages of Draft -> Review -> Accepted -> Superseded.

## Rationale

- **Discoverability:** Sequential IDs and consistent frontmatter make DRs findable by humans and machines.
- **Completeness:** Enforcing all template sections prevents shallow documentation.
- **Traceability:** `dependsOn` and `supersedes` fields build a decision graph, enabling impact analysis.
- **Consistency:** One format means tooling (linters, dashboards, changelog generators) can rely on a single schema.

## Consequences

**Positive:**
- Decision graph is navigable — you can trace why any choice was made
- Automated changelog generation from DR frontmatter is straightforward
- New contributors understand the decision history quickly

**Negative:**
- Bureaucratic overhead for trivial decisions (mitigated by allowing lightweight DRs with minimal sections)
- Requires discipline to keep `supersedes` and `dependsOn` up to date
- Renumbering is painful if gaps are left — IDs are assigned sequentially at merge time

## Implementation Notes

### DR Lifecycle

| Stage | Description |
|---|---|
| **Draft** | Proposed DR under discussion — file may live in a branch or PR |
| **Review** | Open for comment — marked by a `status: review` tag or PR label |
| **Accepted** | Merged and in effect |
| **Superseded** | Replaced by a later DR — the `supersededBy` field is added to frontmatter |

### File Naming

`NNNNN-lowercase-kebab-slug.md`

Examples: `00000-phoenix-architecture.md`, `00001-governance.md`

### Required Frontmatter Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | `NNNNN` or `TMPL` for template |
| `title` | string | Human-readable title |
| `type` | string | `architecture`, `governance`, `security`, `process` |
| `date` | date | ISO 8601 date of acceptance |
| `tags` | string[] | Lowercase hyphenated keywords |
| `dependsOn` | string[] | DRs that must be read first |
| `supersedes` | string[] | DRs this record replaces |
| `related` | string[] | DRs that are related but not dependencies |

### Required Body Sections

1. **AI Summary** — 2–5 sentences for retrieval-augmented search
2. **Context** — why this decision exists
3. **Decision** — one direct sentence stating the decision
4. **Rationale** — why chosen over alternatives (may include comparison table)
5. **Consequences** — positive and negative outcomes
6. **Implementation Notes** — concrete details (tooling, packages, modules, commands)
7. **Provenance** — author and sources (issues, PRs, external references)

## Provenance

**Author:** Repository owner

**Sources:**
- Michael Nygard — Architecture Decision Records
- ThoughtWorks — ADR template
- 00000 Phoenix Architecture
