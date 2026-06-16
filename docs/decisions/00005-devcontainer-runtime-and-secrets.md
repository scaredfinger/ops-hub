---
id: "00005"
title: "Operations - Devcontainer Runtime and Secret Injection"
type: "process"
date: "2026-06-16"
tags:
  - operations
  - devcontainer
  - environment
  - secrets
  - docker
dependsOn: ["00000", "00001"]
supersedes: []
related: ["00002"]
---

## AI Summary

This repository is expected to run from a development container rather than directly on the host. The devcontainer mounts the workspace into `/workspace`, exposes the host Docker socket, and loads environment variables into the container process environment through `runArgs` with `--env-file .env`. This DR records the devcontainer as the standard execution environment and treats secrets provided through that container environment as an operational prerequisite rather than repository-managed secret material.

## Context

The repository contains a committed `.devcontainer/devcontainer.json` that defines how contributors and automation should enter the working environment. The file specifies the container image build, workspace mount, initialization hooks, feature set, and container runtime arguments.

The same file also shows that secrets are not populated through the `remoteEnv` field. Instead, the container is started with `--env-file .env`, which makes those values available as OS environment variables inside the running container.

Because this repository manages infrastructure and operational tooling, the execution environment and secret-loading model are part of the architecture. They need to be recorded explicitly so future work does not assume direct host execution or introduce a conflicting secret distribution approach by accident.

## Decision

This repository SHALL be operated from the configured devcontainer, and required secrets SHALL be provided to processes inside that container through the container OS environment as loaded by `.devcontainer/devcontainer.json` via `runArgs: ["--env-file", ".env"]`.

## Rationale

- **Reproducibility:** A devcontainer provides a stable, declared execution environment for tooling and automation.
- **Operational consistency:** Contributors and agents run against the same mounted workspace path and feature set.
- **Separation of concerns:** Repository code can assume required credentials are already present in environment variables instead of embedding secret values in source-controlled files.
- **Observed reality:** The committed configuration already defines this as the current runtime and secret injection path.

## Consequences

**Positive:**
- Tooling behavior is more consistent across machines because the runtime is containerized.
- Secrets can be consumed through normal environment variable lookup without additional bootstrap logic in the repository.
- Docker-based workflows inside the workspace can use the mounted host Docker socket.

**Negative:**
- The repository depends on a correctly provisioned local `.env` file at container start time.
- Missing or stale environment variables may fail late at runtime if not validated by individual tools.
- Secrets loaded into the container environment remain an operational risk surface and must not be echoed, committed, or copied into derived files.

## Implementation Notes

The current `.devcontainer/devcontainer.json` establishes these baseline expectations:

- Runtime entrypoint is the repository devcontainer
- Workspace is mounted at `/workspace`
- Host Docker socket is mounted at `/var/run/docker.sock`
- Local OpenCode state is mounted from `${localEnv:HOME}/.local/share/opencode`
- Initialization hooks are:
  - `.devcontainer/initialize.sh`
  - `.devcontainer/post-create.sh`
  - `.devcontainer/post-start.sh`
- Secrets and other runtime environment variables are injected with:

```json
"runArgs": [
  "--env-file",
  ".env"
]
```

- `remoteEnv` is currently empty, so it is not the source of runtime secrets

When documenting or automating repository workflows, assume the process environment inside the devcontainer is the primary secret lookup mechanism unless a later accepted DR replaces this approach.

## Provenance

**Author:** OpenCode with user direction

**Sources:**
- `.devcontainer/devcontainer.json`
- `00000 Phoenix Architecture for Personal Infrastructure`
- `00001 Governance - Decision Records Format and Process`
- `00002 Condensed Architecture and Decisions Index`
