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

## Operations

### 00003 Infrastructure - MCP Baseline Inventory and Access Gaps

Coolify is the current primary MCP-backed infrastructure inventory source for this repository.
Cloudflare is only partially available in the current integration, and Contabo is not currently reliable for discovery.

- Use Coolify first for server, application, and domain inventory
- Treat Cloudflare account access as incomplete until token scopes are reviewed
- Treat Contabo inventory results as unavailable until its MCP schema/tooling issue is fixed

### 00004 Infrastructure - TypeScript Inventory Representation

The repository stores discovered infrastructure as provider-oriented TypeScript under `infrastructure/`.
Only directly observed resources are represented; inaccessible or unverified resources are intentionally omitted.

- Keep one provider file per reachable provider under `infrastructure/providers/`
- Keep shared provider and resource types in `infrastructure/types.ts`
- Re-export providers and a flattened resource list from `infrastructure/index.ts`
- Regenerate from fresh observed provider data by following the mapping and omission rules in DR `00004`, unless a later DR supersedes them for a specific provider

### 00005 Operations - Devcontainer Runtime and Secret Injection

This repository is expected to run from the configured devcontainer rather than directly on the host.
Required secrets are made available inside the container as OS environment variables through `.devcontainer/devcontainer.json` using `runArgs` with `--env-file .env`.

- Use the devcontainer as the standard execution environment
- Treat environment variables inside the running container as the primary secret lookup path
- Do not assume `remoteEnv` is the secret source in the current setup

### 00006 Contabo - Direct Read-Only Inventory and TypeScript Representation

Contabo discovery currently uses a standalone direct-API script under `scripts/` instead of the broken MCP integration.
The script reads Contabo credentials from the devcontainer OS environment, returns structured JSON for both successful inventory reads and failures, and the directly observed compute snapshot is represented under `infrastructure/`.

- Use `scripts/contabo-inventory.mjs` for current Contabo instance discovery
- Use `infrastructure/providers/contabo.ts` for the current committed Contabo instance snapshot
- Treat runtime auth/API failures as operational output; only successful direct reads should be promoted into the repository model

### 00007 Infrastructure - Derived Correlation Graph View

`docs/infrastructure-graphs.md` is a derived human-readable view of the committed infrastructure inventory.
It must be kept in sync with inventory changes so the graph remains accurate.

- Update the graph in the same change set as inventory changes
- Show only verified or explicitly committed correlations
- Distinguish hard matches from structural similarities
- Treat the graph as secondary to `infrastructure/` and the Decision Records
