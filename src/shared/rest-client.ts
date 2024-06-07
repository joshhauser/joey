import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { BASE_API_URL } from '@/shared/constants';
require('dotenv').config();

export class RestClient {
  clientInstance: AxiosInstance;

  private static instance: RestClient | null = null;

  private constructor() {
    this.clientInstance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDB_TOKEN,
      },
    });
  }

  public static getInstance(): RestClient {
    if (!RestClient.instance) {
      RestClient.instance = new RestClient();
    }

    return RestClient.instance;
  }
}
