import type { ContaboInstance, ContaboResource, Provider, ResourceRecord } from '../types';

const vmi2563139: ResourceRecord<'instance', ContaboInstance> = {
  provider: 'contabo',
  resourceType: 'instance',
  id: '202563139',
  name: 'vmi2563139',
  data: {
    displayName: '',
    region: 'EU',
    dataCenter: 'European Union 2',
    status: 'running',
    productId: 'V68',
    productName: 'VPS 4 Cores NVMe (no setup)',
    osType: 'Linux',
    ipv4: '161.97.177.19',
    ipv6: '2a02:c207:2256:3139:0000:0000:0000:0001',
    createdDate: '2025-04-19T09:59:11.000Z',
  },
};

const vmi2636775: ResourceRecord<'instance', ContaboInstance> = {
  provider: 'contabo',
  resourceType: 'instance',
  id: '202636775',
  name: 'vmi2636775',
  data: {
    displayName: '',
    region: 'EU',
    dataCenter: 'European Union 2',
    status: 'running',
    productId: 'V91',
    productName: 'Cloud VPS 10 NVMe (no setup)',
    osType: 'Linux',
    ipv4: '173.212.206.53',
    ipv6: '2a02:c207:2263:6775:0000:0000:0000:0001',
    createdDate: '2025-06-01T18:08:54.000Z',
  },
};

const vmi2655909: ResourceRecord<'instance', ContaboInstance> = {
  provider: 'contabo',
  resourceType: 'instance',
  id: '202655909',
  name: 'vmi2655909',
  data: {
    displayName: '',
    region: 'EU',
    dataCenter: 'European Union 2',
    status: 'running',
    productId: 'V95',
    productName: 'Cloud VPS 20 SSD (no setup)',
    osType: 'Linux',
    ipv4: '173.212.226.244',
    ipv6: '2a02:c207:2265:5909:0000:0000:0000:0001',
    createdDate: '2025-06-13T06:15:07.000Z',
  },
};

export const contaboProvider: Provider<ContaboResource, ContaboInstance> = {
  name: 'contabo',
  status: 'reachable',
  notes: [
    'Inventory sourced from the direct Contabo API script because the Contabo MCP remains schema-broken.',
    'Current representation includes directly observed compute instances only.',
  ],
  resources: [vmi2563139, vmi2636775, vmi2655909],
};
