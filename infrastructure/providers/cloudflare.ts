import type { CloudflareAccount, CloudflareResource, Provider, ResourceRecord } from '../types';

const account: ResourceRecord<'account', CloudflareAccount> = {
  provider: 'cloudflare',
  resourceType: 'account',
  id: '3284ab0bf2b09d20e9fe0618289d869e',
  name: "Admin@eurotechcrew.com's Account",
  data: {
    accountType: 'standard',
  },
};

export const cloudflareProvider: Provider<CloudflareResource, CloudflareAccount> = {
  name: 'cloudflare',
  status: 'partial',
  notes: [
    'Account-level reads succeeded during probing.',
    'Zone listing returned no zones.',
    'Workers script listing failed with Cloudflare API error 10000 Authentication error.',
  ],
  resources: [account],
};
