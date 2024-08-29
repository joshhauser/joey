import {
  BASE_IMAGE_URL,
  GET_SHOW_PROVIDERS_URL,
  SEARCH_SHOW_URL,
  SHOWS_GENRES_LIST_URL,
  SHOWS_WATCH_PROVIDERS_URL,
} from '@/shared/constants';
import { RestClient } from '@/shared/rest-client';
import _ from 'lodash';

import { DISCOVER_SHOW_PATH } from '@/shared/constants';

import type { AxiosInstance } from 'axios';
import type { GenresListResponse } from '@/shared/models/genre.model';
import type { WatchProviderResponse } from '@/shared/models/watch-provider.model';
import type { ShowDetails, ShowResponse } from '@/shared/models/show.model';
import type { ShowWatchProvidersResponse } from '@/shared/models/show-watch-provider.model';

export class Client {
  static apiClient: AxiosInstance = RestClient.getInstance().apiClient;
  static publicClient: AxiosInstance = RestClient.getInstance().publicClient;

  static getTvShows(searchCriterias: {}) {
    this.prepareCriterias(searchCriterias);
    let queryArgs: string = '';
    for (const [key, value] of Object.entries(searchCriterias)) {
      queryArgs += '&' + _.snakeCase(key) + '=' + value;
    }

    queryArgs += '&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';

    const queryUrl: string = DISCOVER_SHOW_PATH + '?' + queryArgs.substring(1, queryArgs.length);

    return this.apiClient.get<ShowResponse>(queryUrl);
  }

  static getShowDetails(showId: number) {
    return this.apiClient.get<ShowDetails>(SEARCH_SHOW_URL + showId);
  }

  static getShowProviders(showId: number) {
    const queryUrl: string = GET_SHOW_PROVIDERS_URL.replace(':showId', showId.toString());
    return this.apiClient.get<ShowWatchProvidersResponse>(queryUrl);
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

  private static prepareCriterias(criterias: { [key: string]: any }) {
    for (const [key, value] of Object.entries(criterias)) {
      if (_.isArray(value)) {
        if (!_.isEmpty(value)) {
          criterias[key] = value.join('|');
        } else {
          delete criterias[key];
        }
      } else if (_.isBoolean(value) || _.isNumber(value)) {
        criterias[key] = value.toString();
      }
    }
  }
}
