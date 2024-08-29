import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import DatePicker from 'primevue/datepicker';
import { useReferencesStore } from '@/shared/stores/references-store';
import { Client } from '@/shared/services/client';
import type { WatchProvider } from '@/shared/models/watch-provider.model';
import { Utils } from '@/shared/utils';
import Skeleton from 'primevue/skeleton';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'light',
    },
  },
  ripple: true,
});

app.component('Button', Button);
app.component('Card', Card);
app.component('Select', Select);
app.component('MultiSelect', MultiSelect);
app.component('DatePicker', DatePicker);
app.component('Skeleton', Skeleton);
app.mount('#app');

const referencesStore = useReferencesStore();

(() => {
  Client.getShowsGenres().then((response) => {
    referencesStore.setGenres(response.data.genres);
  });

  Client.getShowsWatchProviders().then((response) => {
    const watchProviders: WatchProvider[] = response.data.results;
    const logoPromises: Promise<any>[] = [];
    // TODO : put together providers that has same name but different ids
    watchProviders.forEach((wp: WatchProvider) => {
      if (wp.logoPath) {
        logoPromises.push(
          Client.getImage(wp.logoPath).then((imageResponse) => {
            wp.logoData = Utils.convertImageBuffer(imageResponse.data);
          })
        );
      }
    });
    Promise.all(logoPromises).then(() => {
      referencesStore.setShowsWatchProviders(watchProviders);
    });
  });
})();
