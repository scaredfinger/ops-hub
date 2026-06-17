# Decision Records Index

The files in this directory are the canonical record of significant repository decisions.
`docs/architecture.md` is a condensed derivative for quick reference.

## Records

| ID | Title | Type | Date | Depends On | Related |
|---|---|---|---|---|---|
| `00000` | Phoenix Architecture for Personal Infrastructure | `architecture` | `2026-06-16` | - | `00001` |
| `00001` | Governance - Decision Records Format and Process | `governance` | `2026-06-16` | `00000` | `TMPL` |
| `00002` | Condensed Architecture and Decisions Index | `governance` | `2026-06-16` | `00001` | `00000` |
| `00003` | Infrastructure - MCP Baseline Inventory and Access Gaps | `process` | `2026-06-16` | `00001` | `00002` |
| `00004` | Infrastructure - TypeScript Inventory Representation | `process` | `2026-06-16` | `00001`, `00003` | `00002` |
| `00005` | Operations - Devcontainer Runtime and Secret Injection | `process` | `2026-06-16` | `00000`, `00001` | `00002` |
| `00006` | Contabo - Direct Read-Only Inventory and TypeScript Representation | `process` | `2026-06-16` | `00001`, `00003`, `00005` | `00002` |
| `00007` | Infrastructure - Derived Correlation Graph View | `process` | `2026-06-17` | `00001`, `00002`, `00004`, `00006` | `00003`, `00005` |

## Template

| ID | Title | Type |
|---|---|---|
| `TMPL` | Decision Record Template | `meta` |
