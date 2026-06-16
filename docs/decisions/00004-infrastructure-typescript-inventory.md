---
id: "00004"
title: "Infrastructure - TypeScript Inventory Representation"
type: "process"
date: "2026-06-16"
tags:
  - infrastructure
  - typescript
  - inventory
  - regeneration
  - coolify
  - cloudflare
dependsOn: ["00001", "00003"]
supersedes: []
related: ["00002"]
---

## AI Summary

Infrastructure discovered through reachable MCP providers is represented as a small TypeScript model under `infrastructure/`. The model is provider-oriented, stores only resources that were actually observed, and intentionally omits inaccessible or unverified resources. This DR defines the file layout, data shapes, and regeneration rules so the TypeScript inventory can be rebuilt from fresh MCP data without relying on the current files. The TypeScript files are a derived artifact; the MCP probe data and this DR together are the source for regeneration.

## Context

After probing the connected infrastructure MCPs, we needed a readable, code-native inventory that mirrors the providers and the resources they expose. Plain JSON would work, but TypeScript is easier to read and maintain in this repository because it supports named constants, shared types, and vertical spacing between resource groups.

The infrastructure data is incomplete by design because provider access is uneven. Coolify returned usable inventory, Cloudflare returned limited account-level data, and Contabo did not return trustworthy resource data. The representation therefore must avoid inventing resources that were not observed.

## Decision

The repository SHALL represent reachable infrastructure as provider-oriented TypeScript files under `infrastructure/`, and it SHALL include only resources directly observed from MCP data during a successful probe.

## Rationale

- **Readability:** TypeScript allows shared types, named constants, and grouped resources with clear vertical separation.
- **Traceability:** One resource record maps to one observed external resource, making it easy to compare source data and derived files.
- **Honesty of representation:** Omitting inaccessible resources is safer than fabricating placeholders or inferred records.
- **Regenerability:** A stable file layout and mapping rules make the inventory reproducible from fresh MCP data.

## Consequences

**Positive:**
- The infrastructure inventory is easy to inspect in code.
- Regeneration is deterministic when the same provider access is available.
- Provider limitations are explicit in the resulting files.

**Negative:**
- The inventory may remain incomplete when provider access is partial.
- Fresh probes may add, remove, or reshape represented resources as access changes.
- Derived TypeScript files must be kept aligned with this documented process.

## Implementation Notes

### Canonical File Layout

The generated TypeScript inventory uses this directory structure:

```text
infrastructure/
  index.ts
  types.ts
  providers/
    cloudflare.ts
    coolify.ts
```

If additional providers become reachable later, add one file per provider under `infrastructure/providers/` and extend `ProviderName` plus any provider-specific resource types in `infrastructure/types.ts`.

### Shared Type Rules

`infrastructure/types.ts` defines the common model.

Required top-level types:

- `ProviderName`: union of represented providers only
- `ResourceType`: union of represented resource kinds only
- `Provider<Resource, Data>`
- `ResourceRecord<Resource, Data>`

Required shared fields:

- `Provider.name`
- `Provider.status`
- `Provider.notes?`
- `Provider.resources`
- `ResourceRecord.provider`
- `ResourceRecord.resourceType`
- `ResourceRecord.id`
- `ResourceRecord.name`
- `ResourceRecord.data`

Provider-specific data types should include only fields actually observed and intentionally preserved in the inventory.

### Provider File Rules

Each provider file should:

- import only the shared types it needs
- define one named constant per resource record
- group resources vertically by resource kind
- export a single `...Provider` constant of type `Provider<...>`

The provider file is responsible for mirroring the provider namespace and its accessible resources.

### Consolidation Rules

`infrastructure/index.ts` should:

- re-export each provider constant
- re-export all shared types from `./types`
- export `providers` as an array of provider constants
- export `infrastructure` with:
  - `providers`
  - `resources: providers.flatMap((provider) => provider.resources)`

### Representation Constraints

The inventory must follow these constraints:

- Represent only providers that returned usable MCP data.
- Represent only resource kinds that were directly observed.
- Do not create placeholders for inaccessible providers or resources.
- Do not infer hidden resources from naming conventions or relationships.
- If a provider is partially accessible, represent only the confirmed subset and describe the limitation in `Provider.notes`.
- Preserve stable external IDs when available.

### Source-to-Type Mapping For Current Providers

#### Coolify

Represented provider status:

- `name: 'coolify'`
- `status: 'reachable'`

Represented resource kinds:

- `team`
- `server`
- `project`
- `application`
- `domain`

Mapping rules:

- Team records come from the current team response.
- Server records come from infrastructure overview or server list responses.
- Project records come from the project list response.
- Application records come from application list responses, enriched with the observed server placement from server resource listings.
- Domain records come from Coolify server domain listings.

Current provider-specific data shape:

```ts
type CoolifyTeam = {
  readonly teamId: number;
  readonly personalTeam: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};

type CoolifyServer = {
  readonly host: string;
  readonly reachable: boolean;
};

type CoolifyProject = {
  readonly description: string;
};

type CoolifyApplication = {
  readonly status: string;
  readonly fqdn: string | null;
  readonly gitRepository: string;
  readonly gitBranch: string;
  readonly serverName: string;
};

type CoolifyDomain = {
  readonly hostname: string;
  readonly serverName: string;
  readonly serverHost: string;
};
```

Resource grouping order in `providers/coolify.ts`:

1. team
2. servers
3. projects
4. applications
5. domains

#### Cloudflare

Represented provider status:

- `name: 'cloudflare'`
- `status: 'partial'`

Represented resource kinds:

- `account`

Mapping rules:

- Create an account record only when account-level MCP reads succeed.
- Attach access limitations to `notes` on the provider object.
- Do not create zone, Worker, DNS, or other resource records unless those resources were directly returned by fresh MCP data.

Current provider-specific data shape:

```ts
type CloudflareAccount = {
  readonly accountType: string;
};
```

### Explicit Non-Representation Rules

Do not represent the following unless future probes return direct data for them:

- Contabo resources of any kind
- Cloudflare zones
- Cloudflare Workers
- Coolify databases
- Coolify services

At the time of this decision, these were either inaccessible, empty, or not reliably returned.

### Regeneration Procedure

If the `infrastructure/` TypeScript files are deleted, regenerate them with this procedure:

1. Perform a fresh read-only MCP probe against all intended infrastructure providers.
2. Determine which providers returned trustworthy data.
3. For each reachable provider, enumerate only the resource kinds directly returned by MCP responses.
4. Create `infrastructure/types.ts` with unions and provider-specific data types for only the represented providers and resources.
5. Create one `infrastructure/providers/<provider>.ts` file per reachable provider.
6. Define one named constant per resource record using stable provider IDs where available.
7. Group constants vertically by resource kind in the order defined by this DR or by provider-local logical order.
8. Export one `...Provider` constant per file with provider status and optional notes.
9. Create `infrastructure/index.ts` to re-export providers, types, and the flattened `infrastructure.resources` list.
10. Exclude every provider or resource that was not directly accessible in the fresh probe.

### Current Inventory Snapshot Derived From This Process

At the time of this DR, the generated files represent:

- Coolify: one team, four servers, three projects, five applications, three domains
- Cloudflare: one account
- Contabo: no represented resources

## Provenance

**Author:** OpenCode with user direction

**Sources:**
- `00003 Infrastructure - MCP Baseline Inventory and Access Gaps`
- Current files under `infrastructure/`
- Fresh MCP probe results used to build the inventory representation
- `00001 Governance - Decision Records Format and Process`
