# Architecture

This document is the condensed view of the repository's accepted Decision Records.
The Decision Records in `docs/decisions/` remain the source of truth.

## Core Architecture

### 00000 Phoenix Architecture for Personal Infrastructure

Personal infrastructure in this repository is defined as code, disposable, and reproducible from scratch.
Manual snowflake configuration is not allowed.

- Provision infrastructure declaratively
- Prefer rebuilds over in-place repair
- Keep all changes auditable in git
- Treat secrets and stateful data as explicit operational concerns

Implementation direction:

- Provisioning: Terraform or OpenTofu
- Configuration: Ansible or Nix
- Orchestration: Docker Compose or Nomad
- Secrets: SOPS + age or Vault
- Bootstrap: a single bootstrap workflow
- State: dedicated persistent storage with backups
- CI/CD: deployment from the same repository state

## Governance

### 00001 Governance - Decision Records Format and Process

Significant architectural and governance decisions are recorded as Decision Records.
Each DR follows the shared template in `docs/decisions/template.md` and uses sequential IDs.

- DRs are stored in `docs/decisions/`
- File names use `NNNNN-lowercase-kebab-slug.md`
- Required frontmatter and body sections are mandatory
- Decision relationships are tracked with `dependsOn`, `supersedes`, and `related`
- DR lifecycle is Draft -> Review -> Accepted -> Superseded

### 00002 Condensed Architecture and Decisions Index

Accepted DRs must also be reflected in two derived documentation views:

- `docs/architecture.md` for the condensed architectural view
- `docs/decisions/index.md` for the decision index

These derived documents improve discoverability while preserving the DRs themselves as the canonical record.
