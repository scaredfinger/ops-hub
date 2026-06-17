import { cloudflareProvider } from './providers/cloudflare';
import { contaboProvider } from './providers/contabo';
import { coolifyProvider } from './providers/coolify';
import { grafanaProvider } from './providers/grafana';

export { cloudflareProvider } from './providers/cloudflare';
export { contaboProvider } from './providers/contabo';
export { coolifyProvider } from './providers/coolify';
export { grafanaProvider } from './providers/grafana';
export * from './types';

export const providers = [coolifyProvider, cloudflareProvider, contaboProvider, grafanaProvider] as const;

export const infrastructure = {
  providers,
  resources: providers.flatMap((provider) => provider.resources),
} as const;
