export type ProviderName = 'cloudflare' | 'coolify';

export type ResourceType =
  | 'account'
  | 'team'
  | 'server'
  | 'project'
  | 'application'
  | 'domain';

export type Provider<Resource extends string, Data> = {
  readonly name: ProviderName;
  readonly status: 'reachable' | 'partial';
  readonly notes?: string[];
  readonly resources: ReadonlyArray<ResourceRecord<Resource, Data>>;
};

export type ResourceRecord<Resource extends string, Data> = {
  readonly provider: ProviderName;
  readonly resourceType: Resource;
  readonly id: string;
  readonly name: string;
  readonly data: Data;
};

export type CoolifyResource = 'team' | 'server' | 'project' | 'application' | 'domain';

export type CloudflareResource = 'account';

export type CoolifyTeam = {
  readonly teamId: number;
  readonly personalTeam: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type CoolifyServer = {
  readonly host: string;
  readonly reachable: boolean;
};

export type CoolifyProject = {
  readonly description: string;
};

export type CoolifyApplication = {
  readonly status: string;
  readonly fqdn: string | null;
  readonly gitRepository: string;
  readonly gitBranch: string;
  readonly serverName: string;
};

export type CoolifyDomain = {
  readonly hostname: string;
  readonly serverName: string;
  readonly serverHost: string;
};

export type CloudflareAccount = {
  readonly accountType: string;
};
