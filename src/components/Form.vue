<script setup lang="ts">
  import { Client } from '@/shared/services/client';
  import { onMounted, ref } from 'vue';
  import { Criterias } from '@/shared/models/criterias.model';
  import type { Genre } from '@/shared/models/genre.model';
  import { useReferencesStore } from '@/shared/stores/references-store';

  const referencesStore = useReferencesStore();

  const availableGenres = ref<Genre[]>([]);
  const criterias = ref<Criterias>({});
  const airDate = ref<Date>(new Date());

  const onYearUpdate = (date: Date) => {
    criterias.value.firstAirDateYear = date.getFullYear();
  };
</script>

<template>
  <div class="col">
    <div class="flex flex-column gap-3">
      {{ criterias }}
      <MultiSelect
        v-model="criterias.withGenres"
        :options="referencesStore.genres"
        display="chip"
        optionLabel="name"
        optionValue="id"
        placeholder="Select genres"
        class="w-full md:w-80"
      />
      <DatePicker v-model="airDate" @update:modelValue="onYearUpdate" view="year" dateFormat="yy" />
      <MultiSelect
        v-model="criterias.withWatchProviders"
        :options="referencesStore.showsWatchProviders"
        display="chip"
        optionLabel="providerName"
        optionValue="providerId"
        placeholder="Select providers"
        class="w-full md:w-80"
      />
    </div>
  </div>
</template>
