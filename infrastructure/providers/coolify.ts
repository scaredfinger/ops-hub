import type {
  CoolifyApplication,
  CoolifyDomain,
  CoolifyProject,
  CoolifyResource,
  CoolifyServer,
  CoolifyTeam,
  Provider,
  ResourceRecord,
} from '../types';

const team: ResourceRecord<'team', CoolifyTeam> = {
  provider: 'coolify',
  resourceType: 'team',
  id: '0',
  name: 'Root Team',
  data: {
    teamId: 0,
    personalTeam: true,
    createdAt: '2025-04-20T08:25:00.000000Z',
    updatedAt: '2025-04-20T08:25:49.000000Z',
  },
};

const prod01: ResourceRecord<'server', CoolifyServer> = {
  provider: 'coolify',
  resourceType: 'server',
  id: 'v04w808cokscw8oskc8wssg0',
  name: 'prod-01',
  data: {
    host: 'prod-01.otiuming.com',
    reachable: true,
  },
};

const localhost: ResourceRecord<'server', CoolifyServer> = {
  provider: 'coolify',
  resourceType: 'server',
  id: 'gkckkk8coswkco4ok0wsg4cc',
  name: 'localhost',
  data: {
    host: 'host.docker.internal',
    reachable: true,
  },
};

const tslStaging01: ResourceRecord<'server', CoolifyServer> = {
  provider: 'coolify',
  resourceType: 'server',
  id: 'uk0048gksk8ckkg8k84s0o4o',
  name: 'tsl-staging-01',
  data: {
    host: 'tsl-staging-01.eurotechcrew.com',
    reachable: true,
  },
};

const prod02: ResourceRecord<'server', CoolifyServer> = {
  provider: 'coolify',
  resourceType: 'server',
  id: 'gkk4sgs80wwskw4w4s4skwcg',
  name: 'prod-02',
  data: {
    host: '173.212.226.244',
    reachable: true,
  },
};

const calimero: ResourceRecord<'project', CoolifyProject> = {
  provider: 'coolify',
  resourceType: 'project',
  id: 'gkwc0s84gsogscogo00s4wgs',
  name: 'Calimero',
  data: {
    description: '',
  },
};

const calinq: ResourceRecord<'project', CoolifyProject> = {
  provider: 'coolify',
  resourceType: 'project',
  id: 's8g04o8cw4o0kks80woswgwg',
  name: 'Calinq',
  data: {
    description: '',
  },
};

const pharmaVendeur: ResourceRecord<'project', CoolifyProject> = {
  provider: 'coolify',
  resourceType: 'project',
  id: 'qs8s0sccockgg8cock4c4ww0',
  name: 'Pharma Vendeur',
  data: {
    description: '',
  },
};

const calimeroOwners: ResourceRecord<'application', CoolifyApplication> = {
  provider: 'coolify',
  resourceType: 'application',
  id: 'e0csg0okc8g8cckss04so8ck',
  name: 'calimero-owners',
  data: {
    status: 'running:unknown',
    fqdn: 'http://calimero.otiuming.com:5173',
    gitRepository: 'scaredfinger/villa-calimero-alegria',
    gitBranch: 'main',
    serverName: prod01.name,
  },
};

const calimeroApi: ResourceRecord<'application', CoolifyApplication> = {
  provider: 'coolify',
  resourceType: 'application',
  id: 'aok8ks4sgs8g04wsc8k40404',
  name: 'calimero-api',
  data: {
    status: 'running:healthy',
    fqdn: null,
    gitRepository: 'scaredfinger/villa-calimero-alegria',
    gitBranch: 'main',
    serverName: prod01.name,
  },
};

const calinqWeb: ResourceRecord<'application', CoolifyApplication> = {
  provider: 'coolify',
  resourceType: 'application',
  id: 'esc8w08wsg4g0ggcwscog0so',
  name: 'www',
  data: {
    status: 'running:unknown',
    fqdn: 'http://www.calinq.com:3000,http://calinq.com',
    gitRepository: 'calinq-com/core',
    gitBranch: 'main',
    serverName: prod02.name,
  },
};

const searchEnginePlayground: ResourceRecord<'application', CoolifyApplication> = {
  provider: 'coolify',
  resourceType: 'application',
  id: 'yg804kkgs4s4gcocg4sgwgwg',
  name: 'search-engine-playground',
  data: {
    status: 'running:unknown',
    fqdn: null,
    gitRepository: 'calinq-com/search-engine-playground',
    gitBranch: 'main',
    serverName: prod02.name,
  },
};

const pharmaVendeurStaging: ResourceRecord<'application', CoolifyApplication> = {
  provider: 'coolify',
  resourceType: 'application',
  id: 'sogg0s048so88kskso8okk48',
  name: 'pharma-vendeur-staging',
  data: {
    status: 'running:unknown',
    fqdn: null,
    gitRepository: 'vrpnext/marketplace',
    gitBranch: 'chore/enable-claude-for-plugins',
    serverName: tslStaging01.name,
  },
};

const calimeroDomain: ResourceRecord<'domain', CoolifyDomain> = {
  provider: 'coolify',
  resourceType: 'domain',
  id: 'coolify:domain:calimero.otiuming.com',
  name: 'calimero.otiuming.com',
  data: {
    hostname: 'calimero.otiuming.com',
    serverName: prod01.name,
    serverHost: prod01.data.host,
  },
};

const wwwCalinqDomain: ResourceRecord<'domain', CoolifyDomain> = {
  provider: 'coolify',
  resourceType: 'domain',
  id: 'coolify:domain:www.calinq.com',
  name: 'www.calinq.com',
  data: {
    hostname: 'www.calinq.com',
    serverName: prod02.name,
    serverHost: prod02.data.host,
  },
};

const calinqDomain: ResourceRecord<'domain', CoolifyDomain> = {
  provider: 'coolify',
  resourceType: 'domain',
  id: 'coolify:domain:calinq.com',
  name: 'calinq.com',
  data: {
    hostname: 'calinq.com',
    serverName: prod02.name,
    serverHost: prod02.data.host,
  },
};

export const coolifyProvider: Provider<CoolifyResource, CoolifyTeam | CoolifyServer | CoolifyProject | CoolifyApplication | CoolifyDomain> = {
  name: 'coolify',
  status: 'reachable',
  resources: [
    team,

    prod01,
    localhost,
    tslStaging01,
    prod02,

    calimero,
    calinq,
    pharmaVendeur,

    calimeroOwners,
    calimeroApi,
    calinqWeb,
    searchEnginePlayground,
    pharmaVendeurStaging,

    calimeroDomain,
    wwwCalinqDomain,
    calinqDomain,
  ],
};
