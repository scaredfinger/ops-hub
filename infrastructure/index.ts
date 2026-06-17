import { cloudflareProvider } from './providers/cloudflare';
import { contaboProvider } from './providers/contabo';
import { coolifyProvider } from './providers/coolify';

export { cloudflareProvider } from './providers/cloudflare';
export { contaboProvider } from './providers/contabo';
export { coolifyProvider } from './providers/coolify';
export * from './types';

export const providers = [coolifyProvider, cloudflareProvider, contaboProvider] as const;

export const infrastructure = {
  providers,
  resources: providers.flatMap((provider) => provider.resources),
} as const;
