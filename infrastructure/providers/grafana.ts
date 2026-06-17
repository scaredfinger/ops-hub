import type {
  GrafanaDashboard,
  GrafanaDatasource,
  GrafanaResource,
  Provider,
  ResourceRecord,
} from '../types';

const alertStateHistory: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-alert-state-history',
  name: 'grafanacloud-eurotechcrew-alert-state-history',
  data: {
    datasourceType: 'loki',
    url: 'https://insight-logs-prod-eu-west-4.grafana.net',
    isDefault: false,
  },
};

const cardinalityManagement: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-cardinality-management',
  name: 'grafanacloud-eurotechcrew-cardinality-management',
  data: {
    datasourceType: 'grafanacloud-cardinality-datasource',
    url: 'https://insights-prod-eu-west-2.grafana.net/usage/v1/metrics/2493163',
    isDefault: false,
  },
};

const graphite: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-graphite',
  name: 'grafanacloud-eurotechcrew-graphite',
  data: {
    datasourceType: 'graphite',
    url: 'https://graphite-prod-24-prod-eu-west-2.grafana.net/graphite',
    isDefault: false,
  },
};

const knowledgegraph: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-knowledgegraph',
  name: 'grafanacloud-eurotechcrew-knowledgegraph',
  data: {
    datasourceType: 'grafana-knowledgegraph-datasource',
    url: '',
    isDefault: false,
  },
};

const logs: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-logs',
  name: 'grafanacloud-eurotechcrew-logs',
  data: {
    datasourceType: 'loki',
    url: 'https://logs-prod-012.grafana.net',
    isDefault: false,
  },
};

const alertmanager: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-ngalertmanager',
  name: 'grafanacloud-eurotechcrew-ngalertmanager',
  data: {
    datasourceType: 'alertmanager',
    url: 'https://alertmanager-prod-eu-west-2.grafana.net',
    isDefault: false,
  },
};

const profiles: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-profiles',
  name: 'grafanacloud-eurotechcrew-profiles',
  data: {
    datasourceType: 'grafana-pyroscope-datasource',
    url: 'https://profiles-prod-002.grafana.net',
    isDefault: false,
  },
};

const prometheus: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-prom',
  name: 'grafanacloud-eurotechcrew-prom',
  data: {
    datasourceType: 'prometheus',
    url: 'https://prometheus-prod-24-prod-eu-west-2.grafana.net/api/prom',
    isDefault: true,
  },
};

const traces: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-traces',
  name: 'grafanacloud-eurotechcrew-traces',
  data: {
    datasourceType: 'tempo',
    url: 'https://tempo-prod-10-prod-eu-west-2.grafana.net/tempo',
    isDefault: false,
  },
};

const usageInsights: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-usage-insights',
  name: 'grafanacloud-eurotechcrew-usage-insights',
  data: {
    datasourceType: 'loki',
    url: 'https://insight-logs-prod-eu-west-4.grafana.net',
    isDefault: false,
  },
};

const infinity: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-infinity',
  name: 'grafanacloud-infinity',
  data: {
    datasourceType: 'yesoreyeram-infinity-datasource',
    url: '',
    isDefault: false,
  },
};

const k6: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-k6',
  name: 'grafanacloud-k6',
  data: {
    datasourceType: 'k6-datasource',
    url: 'proxy',
    isDefault: false,
  },
};

const usage: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'grafanacloud-usage',
  name: 'grafanacloud-usage',
  data: {
    datasourceType: 'prometheus',
    url: 'https://billing.grafana.net/api/prom',
    isDefault: false,
  },
};

const jsonDatasource: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'deoiq0kh7zbi8c',
  name: 'marcusolsson-json-datasource',
  data: {
    datasourceType: 'marcusolsson-json-datasource',
    url: '',
    isDefault: false,
  },
};

const searchEngineDatasource: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'feok6klubl1xce',
  name: 'search-engine',
  data: {
    datasourceType: 'influxdb',
    url: 'https://eu-central-1-1.aws.cloud2.influxdata.com',
    isDefault: false,
  },
};

const syntheticMonitoring: ResourceRecord<'datasource', GrafanaDatasource> = {
  provider: 'grafana',
  resourceType: 'datasource',
  id: 'bepimb5m5k7i8f',
  name: 'Synthetic Monitoring',
  data: {
    datasourceType: 'synthetic-monitoring-datasource',
    url: '',
    isDefault: false,
  },
};

const alertGroupsInsights: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: '04183a31-19d3-4c8c-bfd6-245d699335ff',
  name: 'Alert Groups Insights',
  data: {
    url: '/d/04183a31-19d3-4c8c-bfd6-245d699335ff/alert-groups-insights',
    folderTitle: null,
    tags: ['alert groups', 'irm', 'oncall'],
    dashboardType: 'dash-db',
  },
};

const alloyMonitoringDashboard: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'ad99wh8',
  name: 'Alloy Monitoring Dashboard',
  data: {
    url: '/d/ad99wh8/alloy-monitoring-dashboard',
    folderTitle: null,
    tags: [],
    dashboardType: 'dash-db',
  },
};

const cardinalityManagementOverview: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'cardinality-management',
  name: 'Cardinality management - 1 - overview',
  data: {
    url: '/d/cardinality-management/cardinality-management-1-overview',
    folderTitle: 'GrafanaCloud',
    tags: ['cardinality-management', 'grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const cardinalityManagementMetrics: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'cardinality-management-metrics-detail',
  name: 'Cardinality management - 2 - metrics',
  data: {
    url: '/d/cardinality-management-metrics-detail/cardinality-management-2-metrics',
    folderTitle: 'GrafanaCloud',
    tags: ['cardinality-management', 'grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const cardinalityManagementLabels: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'cardinality-management-label-detail',
  name: 'Cardinality management - 3 - labels',
  data: {
    url: '/d/cardinality-management-label-detail/cardinality-management-3-labels',
    folderTitle: 'GrafanaCloud',
    tags: ['cardinality-management', 'grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const cloudLogsExportInsights: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: '4_D6mSh4z',
  name: 'Cloud Logs Export Insights',
  data: {
    url: '/d/4_D6mSh4z/cloud-logs-export-insights',
    folderTitle: 'GrafanaCloud',
    tags: [],
    dashboardType: 'dash-db',
  },
};

const drilldownNodeCpu: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: '65316263-1707-44fa-b9fd-798cd15e8a2d',
  name: 'Drilldown - Node CPU',
  data: {
    url: '/d/65316263-1707-44fa-b9fd-798cd15e8a2d/drilldown-node-cpu',
    folderTitle: 'Infrastructure',
    tags: [],
    dashboardType: 'dash-db',
  },
};

const drilldownNodeMemory: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'ad6vb8s',
  name: 'Drilldown - Node Memory good',
  data: {
    url: '/d/ad6vb8s/drilldown-node-memory-good',
    folderTitle: 'Infrastructure',
    tags: [],
    dashboardType: 'dash-db',
  },
};

const grafanaCloudBillingUsage: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'af982c8b-3216-4e3c-a19e-7f549a8a8b26',
  name: 'Grafana Cloud Billing/Usage',
  data: {
    url: '/d/af982c8b-3216-4e3c-a19e-7f549a8a8b26/grafana-cloud-billing-usage',
    folderTitle: 'GrafanaCloud',
    tags: ['billing', 'grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const incidentInsights: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: '768b3d56-dbae-493e-ac00-1d3edce33202',
  name: 'Incident Insights',
  data: {
    url: '/d/768b3d56-dbae-493e-ac00-1d3edce33202/incident-insights',
    folderTitle: null,
    tags: ['grafana-incident', 'insights'],
    dashboardType: 'dash-db',
  },
};

const nodeExporterHealthOverview: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'ae3f4103-5cf2-4781-af70-f9a426ae02e5',
  name: 'Node Exporter - Health Overview',
  data: {
    url: '/d/ae3f4103-5cf2-4781-af70-f9a426ae02e5/node-exporter-health-overview',
    folderTitle: 'Infrastructure',
    tags: [],
    dashboardType: 'dash-db',
  },
};

const onCallInsights: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'a51cfe2b-2f5d-43bf-b74d-172b29a2b6b4',
  name: 'OnCall Insights',
  data: {
    url: '/d/a51cfe2b-2f5d-43bf-b74d-172b29a2b6b4/oncall-insights',
    folderTitle: null,
    tags: ['oncall'],
    dashboardType: 'dash-db',
  },
};

const searchEngineServer: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'adn4zhn',
  name: 'Search Engine - Server',
  data: {
    url: '/d/adn4zhn/search-engine-server',
    folderTitle: null,
    tags: [],
    dashboardType: 'dash-db',
  },
};

const usageInsightsOverview: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'XU8HAD5Gk',
  name: 'Usage Insights - 1 - Overview',
  data: {
    url: '/d/XU8HAD5Gk/usage-insights-1-overview',
    folderTitle: 'GrafanaCloud',
    tags: ['grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const usageInsightsDatasources: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'AEbrOO2Mz',
  name: 'Usage Insights - 2 - Data sources',
  data: {
    url: '/d/AEbrOO2Mz/usage-insights-2-data-sources',
    folderTitle: 'GrafanaCloud',
    tags: ['grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const usageInsightsQueryErrors: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'MpmkYhRVz',
  name: 'Usage Insights - 3 - Query Errors',
  data: {
    url: '/d/MpmkYhRVz/usage-insights-3-query-errors',
    folderTitle: 'GrafanaCloud',
    tags: ['grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const usageInsightsAlertmanager: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'ntS5Ujs7z',
  name: 'Usage Insights - 4 - Alertmanager',
  data: {
    url: '/d/ntS5Ujs7z/usage-insights-4-alertmanager',
    folderTitle: 'GrafanaCloud',
    tags: ['alertmanager', 'grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const usageInsightsMetricsIngestion: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'cdn9jukg55bswb',
  name: 'Usage Insights - 5 - Metrics Ingestion',
  data: {
    url: '/d/cdn9jukg55bswb/usage-insights-5-metrics-ingestion',
    folderTitle: 'GrafanaCloud',
    tags: ['grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const usageInsightsLokiQueryFairUsage: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'cdybdibbio2dcd',
  name: 'Usage Insights - 6 - Loki Query Fair Usage Drilldown',
  data: {
    url: '/d/cdybdibbio2dcd/usage-insights-6-loki-query-fair-usage-drilldown',
    folderTitle: 'GrafanaCloud',
    tags: ['grafanacloud'],
    dashboardType: 'dash-db',
  },
};

const weather: ResourceRecord<'dashboard', GrafanaDashboard> = {
  provider: 'grafana',
  resourceType: 'dashboard',
  id: 'fe3d2523-32c6-4053-a214-f64468f8564e',
  name: 'Weather',
  data: {
    url: '/d/fe3d2523-32c6-4053-a214-f64468f8564e/weather',
    folderTitle: null,
    tags: [],
    dashboardType: 'dash-db',
  },
};

export const grafanaProvider: Provider<GrafanaResource, GrafanaDatasource | GrafanaDashboard> = {
  name: 'grafana',
  status: 'reachable',
  notes: [
    'Inventory sourced from a connected Grafana Cloud account.',
    'Current representation includes directly observed datasources and dashboards only.',
    'The Search Engine - Server dashboard was directly observed querying the search-engine InfluxDB datasource.',
  ],
  resources: [
    alertStateHistory,
    cardinalityManagement,
    graphite,
    knowledgegraph,
    logs,
    alertmanager,
    profiles,
    prometheus,
    traces,
    usageInsights,
    infinity,
    k6,
    usage,
    jsonDatasource,
    searchEngineDatasource,
    syntheticMonitoring,

    alertGroupsInsights,
    alloyMonitoringDashboard,
    cardinalityManagementOverview,
    cardinalityManagementMetrics,
    cardinalityManagementLabels,
    cloudLogsExportInsights,
    drilldownNodeCpu,
    drilldownNodeMemory,
    grafanaCloudBillingUsage,
    incidentInsights,
    nodeExporterHealthOverview,
    onCallInsights,
    searchEngineServer,
    usageInsightsOverview,
    usageInsightsDatasources,
    usageInsightsQueryErrors,
    usageInsightsAlertmanager,
    usageInsightsMetricsIngestion,
    usageInsightsLokiQueryFairUsage,
    weather,
  ],
};
