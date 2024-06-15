import { defineStore } from 'pinia';
import type { Genre } from '@/shared/models/genre.model';
import type { WatchProvider } from '@/shared/models/watch-provider.model';

export const useReferencesStore = defineStore('references-store', {
  state: (): { genres: Genre[]; showsWatchProviders: WatchProvider[] } => {
    return { genres: [], showsWatchProviders: [] };
  },
  actions: {
    setGenres(genres: Genre[]) {
      this.genres = genres;
    },
    setShowsWatchProviders(showsWatchProviders: WatchProvider[]) {
      this.showsWatchProviders = showsWatchProviders;
    },
  },
});
