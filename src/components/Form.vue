<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Criterias } from '@/shared/models/criterias.model';
  import { useReferencesStore } from '@/shared/stores/references-store';

  const referencesStore = useReferencesStore();

  const emit = defineEmits(['searchShows']);

  const criterias = ref<Criterias>({});
  const airDate = ref<Date>(new Date());

  const onYearUpdate = (date?: Date | null) => {
    criterias.value.firstAirDateYear = date ? date.getFullYear() : undefined;
  };

  onMounted(() => {
    criterias.value.firstAirDateYear = airDate.value.getFullYear();
  });
</script>

<template>
  <div class="container">
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
        <DatePicker
          showButtonBar
          v-model="airDate"
          @update:modelValue="onYearUpdate"
          view="year"
          dateFormat="yy"
        />
        <MultiSelect
          v-model="criterias.withWatchProviders"
          :options="referencesStore.showsWatchProviders"
          display="chip"
          optionLabel="providerName"
          optionValue="providerId"
          placeholder="Select providers"
          class="w-full md:w-80"
          :virtualScrollerOptions="{ itemSize: 44 }"
        >
          <template #option="slotProps">
            <img
              :alt="slotProps.option.providerName + ' logo'"
              :src="slotProps.option.logoData"
              height="30"
            />
            <div>{{ slotProps.option.providerName }}</div>
          </template>
        </MultiSelect>
        <Button label="Entertain me!" @click="emit('searchShows', JSON.parse(JSON.stringify(criterias)))" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    height: fit-content;
    position: sticky;
    top: 0;
    background-color: white;
  }
</style>
