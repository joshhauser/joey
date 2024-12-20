<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Criterias } from '@/shared/models/criterias.model';
  import { useReferencesStore } from '@/shared/stores/references-store';

  const referencesStore = useReferencesStore();

  const emit = defineEmits(['searchShows']);

  const criterias = ref<Criterias>({ page: 1 });
  const airDate = ref<Date | null>(null);

  const onYearUpdate = (date?: any) => {
    criterias.value.firstAirDateYear = date ? date.getFullYear() : undefined;
  };

  onMounted(() => {
    criterias.value.firstAirDateYear = airDate.value?.getFullYear();
  });
</script>

<template>
  <div class="container p-3">
    <div class="grid w-full align-items-center sm:justify-content-between xl:justify-content-start">
      <div class="sm:col-1 lg:col-2 col-12">
        <div class="flex align-items-center xl:flex-row lg:flex-column">
          <img alt="Joey's Logo" class="lg:-ml-3 xl:mr-3" height="100" src="@/assets/imgs/logo.png" />
          <span class="xl:block lg:hidden joey-title">Joey</span>
        </div>
      </div>
      <div class="sm:col-10 lg:col-9 xl:col-8 col-12">
        <div class="flex flex-wrap justify-content-center align-items-center">
          <div class="lg:col-3 md:col-6 col-12">
            <MultiSelect
              id="genres"
              v-model="criterias.withGenres"
              :options="referencesStore.genres"
              class="w-full"
              display="chip"
              optionLabel="name"
              optionValue="id"
              placeholder="Genres"
            />
          </div>
          <div class="h-full lg:col-2 md:col-6 col-12">
            <DatePicker
              id="airYear"
              v-model="airDate"
              class="w-full h-full"
              dateFormat="yy"
              iconDisplay="input"
              input-id="airYear"
              label="Air year"
              placeholder="Air year"
              showButtonBar
              showIcon
              view="year"
              @update:modelValue="onYearUpdate"
            />
          </div>
          <div class="lg:col-3 md:col-6 col-12">
            <MultiSelect
              v-model="criterias.withWatchProviders"
              :options="referencesStore.showsWatchProviders"
              :virtualScrollerOptions="{ itemSize: 44 }"
              class="w-full"
              display="chip"
              input-id="providers"
              optionLabel="providerName"
              optionValue="providerId"
              placeholder="Providers"
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
          </div>
          <div class="lg:col-2 md:col-6 col-12">
            <Button
              class="w-full bg-main"
              label="Entertain me!"
              @click="emit('searchShows', JSON.parse(JSON.stringify(criterias)))"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/variables' as vars;

  .container {
    height: fit-content;
    position: sticky;
    top: 0;
  }
</style>
