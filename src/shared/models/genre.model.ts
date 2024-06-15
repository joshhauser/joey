export interface Genre {
  id: number;
  name: string;
}

export interface GenresListResponse {
  genres: Genre[];
}
