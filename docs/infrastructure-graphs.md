# Infrastructure Graphs

This document visualizes the currently committed, directly observed infrastructure inventory.
It is intentionally incomplete where provider access is partial or unavailable.
It is maintained as a derived view under `docs/decisions/00007-infrastructure-derived-correlation-graph-view.md` and should be updated with inventory changes.

## Level 0: Provider Overview

```mermaid
flowchart TB
  repo["Repository Inventory"]

  coolify["Coolify\nreachable\n16 observed resources"]
  cloudflare["Cloudflare\npartial\n1 observed resource"]
  contabo["Contabo\nreachable\n3 observed resources"]
  grafana["Grafana\nreachable\n36 observed resources"]

  repo --> coolify
  repo --> cloudflare
  repo --> contabo
  repo --> grafana
```

## Level 1: Provider Breakdown

```mermaid
flowchart LR
  subgraph CF["Cloudflare"]
    cf_account["Account\nAdmin@eurotechcrew.com's Account"]
  end

  subgraph C["Contabo"]
    c1["vmi2563139\n161.97.177.19"]
    c2["vmi2636775\n173.212.206.53"]
    c3["vmi2655909\n173.212.226.244"]
  end

  subgraph K["Coolify"]
    team["Root Team"]

    subgraph servers["Servers"]
      prod01["prod-01\nprod-01.otiuming.com"]
      localhost["localhost\nhost.docker.internal"]
      tsl["tsl-staging-01\ntsl-staging-01.eurotechcrew.com"]
      prod02["prod-02\n173.212.226.244"]
    end

    subgraph projects["Projects"]
      calimero["Calimero"]
      calinq["Calinq"]
      pharma["Pharma Vendeur"]
    end

    subgraph apps["Applications"]
      owners["calimero-owners"]
      api["calimero-api"]
      web["www"]
      search["search-engine-playground"]
      staging["pharma-vendeur-staging"]
    end

    subgraph domains["Domains"]
      d1["calimero.otiuming.com"]
      d2["www.calinq.com"]
      d3["calinq.com"]
    end
  end

  subgraph G["Grafana"]
    subgraph gds["Datasources"]
      gprom["grafanacloud-eurotechcrew-prom\nprometheus (default)"]
      glogs["grafanacloud-eurotechcrew-logs\nloki"]
      gtraces["grafanacloud-eurotechcrew-traces\ntempo"]
      gsearchds["search-engine\ninfluxdb"]
      gotherds["12 additional datasources"]
    end

    subgraph gfolders["Dashboards"]
      ggcloud["GrafanaCloud folder\n11 dashboards"]
      ginfra["Infrastructure folder\n3 dashboards"]
      groot["Root / no folder\n6 dashboards"]
      gsearchdash["Search Engine - Server"]
      gweather["Weather"]
    end
  end
```

## Level 2: Observed Relationships

```mermaid
flowchart TB
  subgraph coolify["Coolify"]
    team["Root Team"]

    prod01["prod-01\nreachable"]
    localhost["localhost\nreachable"]
    tsl["tsl-staging-01\nreachable"]
    prod02["prod-02\nreachable"]

    owners["calimero-owners\nrunning:unknown\nscaredfinger/villa-calimero-alegria@main"]
    api["calimero-api\nrunning:healthy\nscaredfinger/villa-calimero-alegria@main"]
    web["www\nrunning:unknown\ncalinq-com/core@main"]
    search["search-engine-playground\nrunning:unknown\ncalinq-com/search-engine-playground@main"]
    staging["pharma-vendeur-staging\nrunning:unknown\nvrpnext/marketplace@chore/enable-claude-for-plugins"]

    d1["calimero.otiuming.com"]
    d2["www.calinq.com"]
    d3["calinq.com"]

    team --> prod01
    team --> localhost
    team --> tsl
    team --> prod02

    prod01 --> owners
    prod01 --> api
    prod02 --> web
    prod02 --> search
    tsl --> staging

    prod01 --> d1
    prod02 --> d2
    prod02 --> d3
  end

  subgraph contabo["Contabo"]
    c1["vmi2563139\nEU / European Union 2\nrunning"]
    c2["vmi2636775\nEU / European Union 2\nrunning"]
    c3["vmi2655909\nEU / European Union 2\nrunning"]
  end

  subgraph cloudflare["Cloudflare"]
    acct["Admin@eurotechcrew.com's Account\nstandard\npartial access"]
  end

  subgraph grafana["Grafana"]
    gprom2["grafanacloud-eurotechcrew-prom\nprometheus\ndefault"]
    gsearchds2["search-engine\ninfluxdb"]
    ggcloud2["GrafanaCloud folder\n11 dashboards"]
    ginfra2["Infrastructure folder\n3 dashboards"]
    gsearchdash2["Search Engine - Server"]
    groot2["Root dashboards\n6"]

    ggcloud2 --> gprom2
    gsearchdash2 --> gsearchds2
  end

  prod02 -. "same public IPv4" .-> c3
```

## Correlations

```mermaid
flowchart LR
  c3["Contabo vmi2655909\n173.212.226.244"]
  prod02["Coolify prod-02\n173.212.226.244"]
  web["Coolify www\ncalinq.com / www.calinq.com"]
  search["Coolify search-engine-playground"]
  calimeroApp["Coolify calimero-owners\ncalimero.otiuming.com:5173"]
  calimeroApi["Coolify calimero-api"]
  d1["Coolify domain\ncalimero.otiuming.com"]
  d2["Coolify domain\nwww.calinq.com"]
  d3["Coolify domain\ncalinq.com"]
  cf["Cloudflare account\nAdmin@eurotechcrew.com's Account"]
  gds["Grafana datasource\nsearch-engine"]
  gdash["Grafana dashboard\nSearch Engine - Server"]

  c3 ---|"same IPv4"| prod02
  prod02 ---|"hosts"| web
  prod02 ---|"hosts"| search
  prod02 ---|"owns domain"| d2
  prod02 ---|"owns domain"| d3
  prod02 ---|"same server as"| search
  prod02 ---|"same server as"| web

  prod01["Coolify prod-01\nprod-01.otiuming.com"]
  prod01 ---|"hosts"| calimeroApp
  prod01 ---|"hosts"| calimeroApi
  prod01 ---|"owns domain"| d1

  gdash ---|"queries"| gds
```

### Strong correlations

- `Coolify prod-02` and `Contabo vmi2655909` share the exact IPv4 `173.212.226.244`.
- `Coolify prod-01` hosts both `calimero-owners` and `calimero-api`.
- `Coolify prod-02` hosts both `www` and `search-engine-playground`.
- `Coolify tsl-staging-01` hosts `pharma-vendeur-staging`.
- `calimero.otiuming.com` is tied to `prod-01` and `calimero-owners`.
- `calinq.com` and `www.calinq.com` are tied to `prod-02` and `www`.
- `Grafana Search Engine - Server` directly queries the Grafana `search-engine` datasource.

### Structural correlations

- `calimero-owners` and `calimero-api` share the same repo and branch: `scaredfinger/villa-calimero-alegria@main`.
- `www` and `search-engine-playground` both belong to the `calinq` naming family and run on `prod-02`.
- `pharma-vendeur-staging` shares the `pharma-vendeur` naming family with the `Pharma Vendeur` Coolify project.
- `Cloudflare` is currently only correlated at the account level; no verified zone or workers relationships are present.
- `Contabo` instances are currently unlinked to the Coolify inventory except for the shared IP match above.
- Grafana inventory currently includes 16 datasources and 20 dashboards, but only one explicit dashboard-to-datasource relationship has been verified in the committed graph.

## Notes

- Only directly observed resources are shown.
- Cloudflare is partial: account-level reads worked, but deeper access failed during probing.
- Contabo is modeled from the direct API script output, not the MCP path.
- Coolify resources are the primary inventory source in the current repository snapshot.
- Grafana is modeled from a connected Grafana Cloud account and currently represents datasources plus dashboards only.
