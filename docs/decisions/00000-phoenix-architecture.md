---
id: "00000"
title: "Phoenix Architecture for Personal Infrastructure"
type: "architecture"
date: "2026-06-16"
tags:
  - phoenix-architecture
  - infrastructure
  - gitops
  - immutability
dependsOn: []
supersedes: []
related: ["00001"]
---

## AI Summary

This repository adopts Phoenix Architecture — all personal infrastructure is defined as code, disposable, and reproducible from scratch. No manual snowflake configuration is permitted. Every system must be recoverable purely from declarative definitions and stored state.

## Context

Personal infrastructure (DNS, email, CI/CD, storage, media servers, monitoring) has historically been managed ad-hoc via SSH, web UIs, and one-off scripts. This creates snowflake systems that are unrecoverable, undocumented, and brittle. A principled approach is needed to ensure the entire stack can be rebuilt from a git clone.

## Decision

All infrastructure in this repository MUST follow the Phoenix Architecture pattern: every component is defined declaratively, provisioned automatically, and disposable by design — preferring full rebuilds over in-place repairs.

## Rationale

- **Disaster recovery:** A laptop loss, VPS takedown, or credential rotation should not lose capability — only require a `git clone && deploy`.
- **Auditability:** Every change flows through git — no unexplained state drift.
- **Reproducibility:** CI/CD can validate and deploy from the same sources, eliminating environment skew.
- **Simplicity:** Rebuilds eliminate the need for complex repair workflows.

### Alternatives Considered

| Alternative | Reason Rejected |
|---|---|
| Snowflake (manual) | Unrecoverable, undocumented |
| Hybrid (rebuild some, patch others) | Hard to define boundaries; drifts into snowflake over time |
| Full state backup (disk images) | Fragile across hardware, slow, opaque |

## Consequences

**Positive:**
- Full recovery from bare metal in minutes
- All changes are reviewed and recorded in git
- New hardware/bootstrap is a single command
- Low cognitive overhead — destroy and recreate without fear

**Negative:**
- Stateful services (databases, user data) require explicit backup/restore orchestration
- Initial setup cost is higher than ad-hoc
- Some services may not have clean declarative tooling — wrapping them adds complexity
- Secrets management must be solved robustly (no plaintext in repo)

## Implementation Notes

- **Provisioning:** Terraform/OpenTofu for cloud resources (DNS, VPS, object storage)
- **Configuration:** Ansible or Nix for system-level idempotent setup
- **Orchestration:** Docker Compose or Nomad for service workloads
- **Secrets:** SOPS + age or HashiCorp Vault; encrypted at rest in repo
- **Bootstrap:** A single `bootstrap.sh` that installs tooling, decrypts secrets, and runs the provisioning pipeline
- **Storage:** Persistent data (databases, media) lives on dedicated volumes/object storage with automated backup
- **CI/CD:** GitHub Actions or Woodpecker to plan/apply on push

## Provenance

**Author:** Repository owner

**Sources:**
- Martin Fowler — [PhoenixServer](https://martinfowler.com/bliki/PhoenixServer.html)
- Chad Fowler — The Phoenix Server pattern
- Infrastructure as Code (Kief Morris, O'Reilly)
