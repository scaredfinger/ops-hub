import { cloudflareProvider } from './providers/cloudflare';
import { coolifyProvider } from './providers/coolify';

export { cloudflareProvider } from './providers/cloudflare';
export { coolifyProvider } from './providers/coolify';
export * from './types';

export const providers = [coolifyProvider, cloudflareProvider] as const;

export const infrastructure = {
  providers,
  resources: providers.flatMap((provider) => provider.resources),
} as const;
