---
id: "TMPL"
title: "Decision Record Template"
type: "meta"
date: "2026-06-16"
tags:
  - template
  - meta
dependsOn: []
supersedes: []
related: []
---

## AI Summary

Template for creating Decision Records (DRs) in this repository. Each DR documents a significant architectural or governance decision using a structured format. Copy this file when creating a new DR and replace the placeholder values.

## Context

Consistent documentation of decisions is essential for long-term maintainability. A standard template ensures all DRs capture the same dimensions of a decision.

## Decision

All significant decisions in this repository MUST be recorded using the Decision Record format defined in this template.

## Rationale

A structured template reduces ambiguity, ensures completeness, and enables automated processing of decisions. It also makes it easier for new contributors to understand past decisions.

## Consequences

**Positive:** Decisions are consistently documented, searchable, and referenceable. Automated tooling can parse frontmatter.

**Negative:** Overhead of filling out all sections may discourage documentation of minor decisions. The format may need occasional updates.

## Implementation Notes

- DRs are stored in `docs/decisions/`
- File naming: `NNNNN-slug.md`
- IDs are sequential: `00000`, `00001`, etc.
- Frontmatter follows YAML convention
- Tags are lowercase hyphenated
- New DRs should be created by copying this template and replacing the sample metadata and section content

## Provenance

**Author:** Repository governance

**Sources:** Inspired by Architecture Decision Records (ADRs) and RFC 0001
