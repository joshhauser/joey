export interface Show {
  id: number;
  name: string;
  posterUrl: string;
  firstAirYear: number;
  episodeDuration: number;
  providers?: string[];
  networks?: string[];
  companies?: string[];
  genres?: string[];
  voteAverage: number;
}
