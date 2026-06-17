---
id: "00008"
title: "Grafana Cloud - MCP Connection and TypeScript Inventory Representation"
type: "process"
date: "2026-06-17"
tags:
  - grafana
  - grafana-cloud
  - mcp
  - inventory
  - operations
  - typescript
dependsOn: ["00001", "00003", "00005"]
supersedes: ["00004"]
related: ["00002", "00007"]
---

## AI Summary

The repository now treats Grafana Cloud as a reachable provider for committed infrastructure inventory. A project-local OpenCode MCP entry points to the local `@leval/mcp-grafana` server, credentials are supplied from the devcontainer OS environment, and directly observed Grafana datasources and dashboards are represented under `infrastructure/` as provider-oriented TypeScript.

## Context

`00003` established that reachable MCP-backed infrastructure should be preferred for inventory when access is available. At the time, the repository had committed provider snapshots for Coolify, Cloudflare, and later Contabo, but Grafana Cloud was not yet represented in the inventory model.

We needed an operationally simple way to connect the repository to Grafana Cloud, preserve the current observed state in the same TypeScript representation used for other providers, and keep the derived graph and decision views synchronized with that new provider. `00005` already established that secrets are expected to enter the runtime through the devcontainer OS environment backed by `.env`.

## Decision

Grafana Cloud inventory in this repository SHALL use the project-local OpenCode MCP configuration with environment-supplied credentials, and the directly observed Grafana datasources and dashboards returned through that access path SHALL be represented under `infrastructure/` as provider-oriented TypeScript.

## Rationale

- **Operational consistency:** The connection follows the same repository-local MCP and devcontainer secret model already used for other tooling.
- **Traceability:** The committed TypeScript snapshot makes the currently observed Grafana estate auditable in git.
- **Honesty of representation:** Only directly observed Grafana resources are committed; hidden, inferred, or unobserved assets are omitted.
- **Cross-provider visibility:** Adding Grafana to the shared inventory and graph makes observability resources visible alongside servers, applications, and external providers.

## Consequences

**Positive:**
- Grafana Cloud becomes part of the committed infrastructure inventory.
- Datasources and dashboards can be reviewed in the same repository model as other providers.
- The repository now preserves at least one verified internal Grafana relationship: the `Search Engine - Server` dashboard reads from the `search-engine` InfluxDB datasource.

**Negative:**
- The Grafana snapshot becomes stale unless refreshed when dashboards or datasources change.
- The current representation does not yet model deeper Grafana objects such as folders, alert rules, incidents, or users.
- The repository depends on valid Grafana credentials being present in the runtime environment when inventory is refreshed.

## Implementation Notes

The current implementation is:

```text
opencode.json
.env.example

infrastructure/
  index.ts
  types.ts
  providers/
    grafana.ts
```

Current connection shape:

- `opencode.json` includes a local MCP server entry named `grafana`
- The server command is:
  - `npx -y @leval/mcp-grafana`
- The MCP server receives these environment variables:
  - `GRAFANA_URL`
  - `GRAFANA_SERVICE_ACCOUNT_TOKEN`
- `.env.example` documents the required values for local operator setup

Current represented resource kinds in `infrastructure/providers/grafana.ts`:

- `datasource`
- `dashboard`

Current provider-specific data shapes in `infrastructure/types.ts`:

```ts
type GrafanaDatasource = {
  readonly datasourceType: string;
  readonly url: string;
  readonly isDefault: boolean;
};

type GrafanaDashboard = {
  readonly url: string;
  readonly folderTitle: string | null;
  readonly tags: ReadonlyArray<string>;
  readonly dashboardType: string;
};
```

Observed inventory snapshot on `2026-06-17`:

- Provider status: `reachable`
- Datasources: `16`
- Dashboards: `20`
- Total represented Grafana resources: `36`

Observed datasource records:

- `grafanacloud-eurotechcrew-alert-state-history` (`loki`)
- `grafanacloud-eurotechcrew-cardinality-management` (`grafanacloud-cardinality-datasource`)
- `grafanacloud-eurotechcrew-graphite` (`graphite`)
- `grafanacloud-eurotechcrew-knowledgegraph` (`grafana-knowledgegraph-datasource`)
- `grafanacloud-eurotechcrew-logs` (`loki`)
- `grafanacloud-eurotechcrew-ngalertmanager` (`alertmanager`)
- `grafanacloud-eurotechcrew-profiles` (`grafana-pyroscope-datasource`)
- `grafanacloud-eurotechcrew-prom` (`prometheus`, default)
- `grafanacloud-eurotechcrew-traces` (`tempo`)
- `grafanacloud-eurotechcrew-usage-insights` (`loki`)
- `grafanacloud-infinity` (`yesoreyeram-infinity-datasource`)
- `grafanacloud-k6` (`k6-datasource`)
- `grafanacloud-usage` (`prometheus`)
- `marcusolsson-json-datasource` (`marcusolsson-json-datasource`)
- `search-engine` (`influxdb`)
- `Synthetic Monitoring` (`synthetic-monitoring-datasource`)

Observed dashboard records:

- `Alert Groups Insights`
- `Alloy Monitoring Dashboard`
- `Cardinality management - 1 - overview`
- `Cardinality management - 2 - metrics`
- `Cardinality management - 3 - labels`
- `Cloud Logs Export Insights`
- `Drilldown - Node CPU`
- `Drilldown - Node Memory good`
- `Grafana Cloud Billing/Usage`
- `Incident Insights`
- `Node Exporter - Health Overview`
- `OnCall Insights`
- `Search Engine - Server`
- `Usage Insights - 1 - Overview`
- `Usage Insights - 2 - Data sources`
- `Usage Insights - 3 - Query Errors`
- `Usage Insights - 4 - Alertmanager`
- `Usage Insights - 5 - Metrics Ingestion`
- `Usage Insights - 6 - Loki Query Fair Usage Drilldown`
- `Weather`

Observed verified internal Grafana relationship:

- The `Search Engine - Server` dashboard was directly observed querying datasource UID `feok6klubl1xce`, which is represented as the `search-engine` InfluxDB datasource.

## Provenance

**Author:** OpenCode with user direction

**Sources:**
- `00001 Governance - Decision Records Format and Process`
- `00003 Infrastructure - MCP Baseline Inventory and Access Gaps`
- `00005 Operations - Devcontainer Runtime and Secret Injection`
- `opencode.json`
- `.env.example`
- Direct Grafana datasource and dashboard reads captured on `2026-06-17`
- `infrastructure/providers/grafana.ts`
