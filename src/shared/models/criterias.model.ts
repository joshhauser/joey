export class Criterias {
  firstAirDateYear?: number;
  includeAdult?: boolean;
  language?: string;
  sortBy?: string;
  voteAverageLte?: number;
  voteAverageGte?: number;
  watchRegion?: string;
  withCompanies?: string[];
  withNetworks?: string[];
  withGenres?: string[];
  withRuntimeLte?: number;
  withRuntimeGte?: number;
  withWatchProviders?: string[];
  withType?: string[];
  page?: number;

  constructor(
    firstAirDateYear?: number,
    includeAdult?: boolean,
    language?: string,
    sortBy?: string,
    voteAverageLte?: number,
    voteAverageGte?: number,
    watchRegion?: string,
    withCompanies?: string[],
    withNetworks?: string[],
    withGenres?: string[],
    withRuntimeLte?: number,
    withRuntimeGte?: number,
    withWatchProviders?: string[],
    withType?: string[],
    page?: number
  ) {
    this.firstAirDateYear = firstAirDateYear;
    this.includeAdult = includeAdult;
    this.language = language;
    this.sortBy = sortBy;
    this.voteAverageLte = voteAverageLte;
    this.voteAverageGte = voteAverageGte;
    this.watchRegion = watchRegion ?? 'FR';
    this.withCompanies = withCompanies;
    this.withNetworks = withNetworks;
    this.withGenres = withGenres;
    this.withRuntimeLte = withRuntimeLte;
    this.withRuntimeGte = withRuntimeGte;
    this.withWatchProviders = withWatchProviders;
    this.withType = withType;
    this.page = page ?? 1;
  }
}
