import {
  BASE_IMAGE_URL,
  DEFAULT_IMAGE_EXT,
  SHOWS_GENRES_LIST_URL,
  SHOWS_WATCH_PROVIDERS_URL,
} from '@/shared/constants';
import { RestClient } from '@/shared/rest-client';
import type { AxiosInstance } from 'axios';

import type { GenresListResponse } from '@/shared/models/genre.model';
import type { WatchProviderResponse } from '@/shared/models/watch-provider.model';

export class Client {
  static apiClient: AxiosInstance = RestClient.getInstance().apiClient;
  static publicClient: AxiosInstance = RestClient.getInstance().publicClient;

  static getTvShows() {
    const criterias = this.prepareCriterias({});
  }

  static getShowsGenres() {
    return this.apiClient.get<GenresListResponse>(SHOWS_GENRES_LIST_URL);
  }

  static getShowsWatchProviders() {
    return this.apiClient.get<WatchProviderResponse>(SHOWS_WATCH_PROVIDERS_URL);
  }

  static getImage(imageUrl: string) {
    return this.publicClient.get<any>(BASE_IMAGE_URL + imageUrl, {
      responseType: 'arraybuffer',
    });
  }

  private static prepareCriterias(criterias: any) {
    return {};
  }
}
