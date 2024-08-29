<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { Show, ShowDetails } from '@/shared/models/show.model';

  const props = defineProps({
    show: {
      type: Object as PropType<ShowDetails>,
      required: true,
    },
  });
</script>

<template>
  <div class="flex flex-column w-16rem">
    <div class="w-full poster-container">
      <img :src="show.posterData" :alt="'Poster of ' + show.name" class="w-full poster" />
    </div>
    <div class="w-100 show-title">
      {{ show.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .poster-container {
    height: 460px;

    .poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
