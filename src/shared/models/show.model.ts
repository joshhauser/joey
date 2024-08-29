import type { Genre } from '@/shared/models/genre.model';
import type { Network } from '@/shared/models/network.model';
import type { WatchProvider } from '@/shared/models/watch-provider.model';

export interface Show {
  id: number;
  name: string;
  posterPath?: string;
  firstAirDate: Date;
  voteAverage: number;
}

export interface ShowDetails extends Show {
  episodeRunTime: number;
  genres: Genre[];
  homepage: string;
  networks: Network[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  overview: string;
  posterData: string;
  providers: WatchProvider[];
}

export interface ShowResponse {
  results: Show[];
}
