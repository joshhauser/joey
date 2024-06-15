export interface WatchProvider {
  logoPath: string;
  providerName: string;
  providerId: number;
  logoData?: string;
}

export interface WatchProviderResponse {
  results: WatchProvider[];
}
