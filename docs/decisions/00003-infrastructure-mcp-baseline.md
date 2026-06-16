---
id: "00003"
title: "Infrastructure - MCP Baseline Inventory and Access Gaps"
type: "process"
date: "2026-06-16"
tags:
  - infrastructure
  - mcp
  - inventory
  - coolify
  - cloudflare
  - contabo
dependsOn: ["00001"]
supersedes: []
related: ["00002"]
---

## AI Summary

A read-only probe of the connected infrastructure MCPs established a current baseline of what infrastructure can be observed through automation. Coolify is reachable and provides a usable inventory of servers, projects, applications, and domains. Cloudflare authentication works for some account-level reads but not all service-specific endpoints, and Contabo currently fails at the MCP schema/tooling layer. This decision records the baseline and treats Coolify as the primary current source of truth until the other integrations are repaired or expanded.

## Context

We needed to test the connected MCP providers and determine what infrastructure information could be collected safely in read-only mode. The goal was not to change infrastructure, but to establish what providers are reachable, what inventory they expose, and where access or integration gaps remain.

The connected providers probed were Coolify, Cloudflare, and Contabo. The probing was limited to read-only calls.

## Decision

Coolify SHALL be treated as the current primary MCP-backed infrastructure inventory source, while Cloudflare and Contabo SHALL be considered partially available and unreliable respectively until their access and tooling gaps are resolved.

## Rationale

- **Operational usefulness:** Coolify returned a complete enough inventory to support immediate operational understanding.
- **Safety:** The probe used read-only calls only, which was sufficient to establish a baseline without infrastructure changes.
- **Evidence-based scope:** Cloudflare returned valid account data but did not expose the expected workload inventory in this session.
- **Tooling reliability:** Contabo failed with MCP schema validation errors before returning inventory, so its current integration cannot be trusted for discovery tasks.

## Consequences

**Positive:**
- We now have a concrete, validated baseline of infrastructure visible through MCP.
- Future automation can use Coolify as the first source for deployed application and server inventory.
- The gaps are explicit: Cloudflare needs scope review, and Contabo needs MCP repair.

**Negative:**
- The infrastructure picture is incomplete because Cloudflare workload visibility is partial and Contabo visibility is unavailable.
- Teams may incorrectly assume Cloudflare has no managed assets if they only look at the current probe result.
- Additional work is required before a full cross-provider inventory can be relied on.

## Implementation Notes

### Probe Results

#### Coolify
- Version: `4.0.0-beta.460`
- Team: `Root Team`
- Summary:
  - Servers: `4`
  - Projects: `3`
  - Applications: `5`
  - Databases: `0`
  - Services: `0`

#### Coolify Servers
- `prod-01` -> `prod-01.otiuming.com` -> reachable
- `localhost` -> `host.docker.internal` -> reachable
- `tsl-staging-01` -> `tsl-staging-01.eurotechcrew.com` -> reachable
- `prod-02` -> `173.212.226.244` -> reachable

#### Coolify Projects
- `Calimero`
- `Calinq`
- `Pharma Vendeur`

#### Coolify Applications
- `calimero-owners` -> `running:unknown` -> `http://calimero.otiuming.com:5173`
- `calimero-api` -> `running:healthy`
- `www` -> `running:unknown` -> `http://www.calinq.com:3000,http://calinq.com`
- `search-engine-playground` -> `running:unknown`
- `pharma-vendeur-staging` -> `running:unknown`

#### Coolify Application Placement
- `prod-01`: `calimero-owners`, `calimero-api`
- `prod-02`: `www`, `search-engine-playground`
- `tsl-staging-01`: `pharma-vendeur-staging`
- `localhost`: no resources reported

#### Coolify Domains
- `calimero.otiuming.com`
- `www.calinq.com`
- `calinq.com`

#### Cloudflare
- Account authentication succeeded for:
  - Account ID: `3284ab0bf2b09d20e9fe0618289d869e`
  - Account name: `Admin@eurotechcrew.com's Account`
  - Account type: `standard`
- Zone listing succeeded but returned no zones
- Workers script listing failed with:
  - `10000 Authentication error`

#### Contabo
- Read-only list calls failed with:
  - `MCP error -32602: Structured content does not match the tool's output schema: data must NOT have additional properties`
- This indicates a tool/schema integration issue rather than a confirmed infrastructure absence

### Follow-up Work
- Review Cloudflare token scopes and endpoint coverage for zone and Workers visibility
- Repair or validate the Contabo MCP tool schema contract
- Perform a deeper Coolify audit if application-level diagnostics, deployments, env vars, or storage inventory are needed

## Provenance

**Author:** OpenCode with user direction

**Sources:**
- Read-only MCP probe session on `2026-06-16`
- Coolify MCP responses: health, overview, servers, projects, applications, server resources, server domains
- Cloudflare MCP responses: account read, zone list, Workers script list error
- Contabo MCP responses: schema validation failures on list operations
- `00001 Governance - Decision Records Format and Process`
