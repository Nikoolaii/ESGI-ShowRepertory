<script setup lang="ts">

import Card from "./card.vue";

const props = defineProps<{
  data: any;
  media_type?: string;
}>();
</script>

<template>
  <div class="grid-cols-5 grid gap-4">
    <card v-for="item in props.data" :key="item.id" :data="item" :media_type="media_type"></card>
  </div>
</template>

<style scoped>

</style>