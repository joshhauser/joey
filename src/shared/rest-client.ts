import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_API_URL } from '@/shared/constants';
import { Utils } from '@/shared/utils';
import * as _ from 'lodash';

export class RestClient {
  apiClient: AxiosInstance;
  publicClient: AxiosInstance;

  private static instance: RestClient | null = null;

  private constructor() {
    this.apiClient = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_TOKEN,
      },
    });

    this.apiClient.interceptors.response.use(
      function (response) {
        if (response.data) {
          response.data = Utils.formatObjectKeys(response.data, _.camelCase);
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Create client without parameters to avoid preflight on request that doesn't need any authorization
    this.publicClient = axios.create();
  }

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }

    return RestClient.instance;
  }
}
