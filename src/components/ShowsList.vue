<script setup lang="ts">
  import ShowCard from '@/components/ShowCard.vue';
  import type { PropType } from 'vue';
  import type { ShowDetails } from '@/shared/models/show.model';

  const props = defineProps({
    shows: {
      type: Array as PropType<ShowDetails[]>,
      required: true,
      default: () => [],
    },
  });
</script>

<template>
  <div class="flex flex-column align-items-center container">
    <div class="col-8">
      <div class="grid gap-4 justify-content-start">
        <ShowCard v-for="show in props.shows" :show="show" :key="show.id" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    height: 100%;
    overflow: scroll;
  }
</style>
