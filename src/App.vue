<script setup lang="ts">
  import { ref } from 'vue';
  import { Client } from '@/shared/services/client';
  import Form from '@/components/Form.vue';
  import { Utils } from '@/shared/utils';
  import type { ShowDetails } from '@/shared/models/show.model';
  import ShowsList from '@/components/ShowsList.vue';
  import ShowCard from '@/components/ShowCard.vue';

  const poster = ref<string | null>(null);
  const shows = ref<ShowDetails[]>([]);
  const currentPage = ref<number>(-1);
  const totalPages = ref<number>(-1);
  const isLoading = ref<boolean>(false);
  const searchCriterias = ref<{}>({});

  const searchShows = (criterias: {}) => {
    searchCriterias.value = criterias;
    shows.value = [];
    const promises: Promise<any>[] = [];
    Client.getTvShows(criterias)
      .then((showsResponse) => {
        isLoading.value = true;
        currentPage.value = showsResponse.data.page;
        totalPages.value = showsResponse.data.totalPages;

        showsResponse.data.results.forEach((show) => {
          const _promises: Promise<any>[] = [];
          return Client.getShowDetails(show.id).then((showDetailsResponse) => {
            showDetailsResponse.data = { ...showDetailsResponse.data, ...show };
            if (showDetailsResponse.data.posterPath) {
              const showPosterPromise = Client.getImage(showDetailsResponse.data.posterPath).then(
                (posterResponse) => {
                  showDetailsResponse.data.posterData = Utils.convertImageBuffer(posterResponse.data);
                }
              );
              _promises.push(showPosterPromise);
              promises.push(showPosterPromise);
            }

            const showProvidersPromise = Client.getShowProviders(show.id).then((showProvidersResponse) => {
              const frenchProviders = showProvidersResponse.data.results['FR'];
              if (frenchProviders) {
                showDetailsResponse.data.providers = frenchProviders.flatrate;
              }
            });
            _promises.push(showProvidersPromise);
            promises.push(showProvidersPromise);

            Promise.all(_promises).then(() => {
              shows.value.push(showDetailsResponse.data);
            });
          });
        });
      })
      .then(() => {
        Promise.all(promises).then(() => {
          isLoading.value = false;
        });
      });
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      searchShows({ ...searchCriterias.value, page: currentPage.value - 1 });
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      searchShows({ ...searchCriterias.value, page: currentPage.value + 1 });
    }
  };

  const loadMore = () => {};
</script>

<template>
  <div class="flex flex-column w-full">
    <Form @searchShows="searchShows" />
    <ShowsList v-if="!isLoading" :shows="shows" class="mt-4" />
    <div v-else>
      <div class="flex flex-column align-items-center container">
        <div class="col-8">
          <div class="grid gap-4 justify-content-start">
            <div class="flex flex-column w-16rem" v-for="i in new Array(10).fill(0)" :key="i">
              <div class="w-16rem">
                <Skeleton class="w-full" />
              </div>
              <div class="w-100 show-title">
                <Skeleton class="mt-2"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
