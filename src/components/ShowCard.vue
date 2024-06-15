<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { Show } from '@/shared/models/show.model';

  const props = defineProps({
    show: {
      type: Object as PropType<Show>,
      required: true,
    },
  });
</script>

<template>
  <div></div>
</template>
