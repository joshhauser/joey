import type { WatchProvider } from '@/shared/models/watch-provider.model';

export interface ShowWatchProvidersByCountry {
  link: string;
  flatrate: WatchProvider[];
}

export interface ShowWatchProvidersResponse {
  results: { [key: string]: ShowWatchProvidersByCountry };
}
