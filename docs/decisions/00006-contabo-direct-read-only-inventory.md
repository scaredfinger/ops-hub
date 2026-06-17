---
id: "00006"
title: "Contabo - Direct Read-Only Inventory and TypeScript Representation"
type: "process"
date: "2026-06-16"
tags:
  - contabo
  - inventory
  - operations
  - scripts
  - api
  - typescript
dependsOn: ["00001", "00003", "00005"]
supersedes: ["00004"]
related: ["00002"]
---

## AI Summary

The repository now uses a standalone read-only Contabo inventory script under `scripts/` instead of relying on the broken Contabo MCP integration for discovery. The script authenticates directly against the Contabo API using OS environment variables already provided inside the devcontainer and prints structured JSON output for both success and failure cases. The resulting directly observed instance inventory is also represented under `infrastructure/` as provider-oriented TypeScript alongside the existing Cloudflare and Coolify data.

## Context

`00003` established that the connected Contabo MCP integration was not reliable for discovery because list operations failed at the MCP schema layer before inventory could be returned. At the time, the repository did not yet have a working direct read path for Contabo inventory, and `00004` consequently excluded Contabo resources from the derived TypeScript inventory.

We needed a reusable way to read current Contabo resources now, and then to preserve those directly observed results in the same `infrastructure/` representation used for the other providers. `00005` also established that secrets are expected to come from the devcontainer OS environment, so the most direct path is a small script that reads those variables at runtime and calls the Contabo API directly.

## Decision

Contabo read-only discovery in this repository SHALL use a standalone direct-API script under `scripts/`, and the directly observed compute inventory returned by that script SHALL be represented under `infrastructure/` as provider-oriented TypeScript.

## Rationale

- **Operational usefulness:** A standalone script can be executed immediately to inspect Contabo inventory without waiting for MCP repair or a larger runtime architecture.
- **Pragmatism:** The repository gains a reusable read-only tool and a working Contabo provider representation without waiting for MCP repair.
- **Secret handling consistency:** Reading credentials from the process environment matches the devcontainer secret model already documented in `00005`.
- **Machine-readability:** Structured JSON output makes both inventory data and failure states easy to inspect or automate later.

## Consequences

**Positive:**
- Contabo inventory can be queried directly despite MCP failure.
- The operational tool is reusable and stored in the repository.
- The repository gains a matching Contabo provider representation in `infrastructure/`.
- The script avoids embedding credentials or tokens in source-controlled files.

**Negative:**
- The TypeScript inventory now depends on rerunning the Contabo script when instance inventory changes.
- Authentication or API failures remain possible at runtime and must be diagnosed from script output.
- Future provider integration work may supersede this script or absorb its logic.

## Implementation Notes

The current implementation is:

```text
scripts/
  contabo-inventory.mjs

infrastructure/
  index.ts
  types.ts
  providers/
    contabo.ts
```

Current behavior:

- Uses Node.js built-in `fetch`
- Authenticates against:
  - `https://auth.contabo.com/auth/realms/contabo/protocol/openid-connect/token`
- Reads these required environment variables:
  - `CONTABO_CLIENT_ID`
  - `CONTABO_CLIENT_SECRET`
  - `CONTABO_API_USER`
  - `CONTABO_API_PASSWORD`
- Fetches paginated compute instance inventory from:
  - `GET https://api.contabo.com/v1/compute/instances`
- Generates a fresh `x-request-id` per API request
- Prints structured JSON to stdout on success and stderr on failure
- The broken Contabo MCP entry has been removed from `opencode.json`
- `infrastructure/providers/contabo.ts` stores the directly observed instance snapshot

Current normalized success fields:

- `provider`
- `resourceType`
- `status`
- `fetchedAt`
- `totalInstances`
- `instances[]`

Current represented infrastructure fields in `infrastructure/providers/contabo.ts`:

- `ResourceRecord.id` uses the numeric Contabo `instanceId` serialized as a string
- `ResourceRecord.name` uses the Contabo machine name such as `vmi2563139`
- `ResourceRecord.data` preserves the normalized instance details returned by the script

Current normalized per-instance fields:

- `instanceId`
- `name`
- `displayName`
- `region`
- `dataCenter`
- `status`
- `productId`
- `productName`
- `osType`
- `ipv4`
- `ipv6`
- `createdDate`

Observed execution command:

```bash
node scripts/contabo-inventory.mjs
```

Observed execution result on `2026-06-17`:

```json
{
  "provider": "contabo",
  "resourceType": "instance",
  "status": "ok",
  "fetchedAt": "2026-06-17T06:11:29.445Z",
  "totalInstances": 3,
  "instances": [
    {
      "instanceId": 202563139,
      "name": "vmi2563139",
      "displayName": "",
      "region": "EU",
      "dataCenter": "European Union 2",
      "status": "running",
      "productId": "V68",
      "productName": "VPS 4 Cores NVMe (no setup)",
      "osType": "Linux",
      "ipv4": "161.97.177.19",
      "ipv6": "2a02:c207:2256:3139:0000:0000:0000:0001",
      "createdDate": "2025-04-19T09:59:11.000Z"
    },
    {
      "instanceId": 202636775,
      "name": "vmi2636775",
      "displayName": "",
      "region": "EU",
      "dataCenter": "European Union 2",
      "status": "running",
      "productId": "V91",
      "productName": "Cloud VPS 10 NVMe (no setup)",
      "osType": "Linux",
      "ipv4": "173.212.206.53",
      "ipv6": "2a02:c207:2263:6775:0000:0000:0000:0001",
      "createdDate": "2025-06-01T18:08:54.000Z"
    },
    {
      "instanceId": 202655909,
      "name": "vmi2655909",
      "displayName": "",
      "region": "EU",
      "dataCenter": "European Union 2",
      "status": "running",
      "productId": "V95",
      "productName": "Cloud VPS 20 SSD (no setup)",
      "osType": "Linux",
      "ipv4": "173.212.226.244",
      "ipv6": "2a02:c207:2265:5909:0000:0000:0000:0001",
      "createdDate": "2025-06-13T06:15:07.000Z"
    }
  ]
}
```

## Provenance

**Author:** OpenCode with user direction

**Sources:**
- `00001 Governance - Decision Records Format and Process`
- `00003 Infrastructure - MCP Baseline Inventory and Access Gaps`
- `00004 Infrastructure - TypeScript Inventory Representation` (superseded by this DR for Contabo representation)
- `00005 Operations - Devcontainer Runtime and Secret Injection`
- `scripts/contabo-inventory.mjs`
- `infrastructure/providers/contabo.ts`
