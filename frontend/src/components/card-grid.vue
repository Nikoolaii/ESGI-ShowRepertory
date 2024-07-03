<script setup lang="ts">

import Card from "./card.vue";

const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <div class="grid-cols-5 grid gap-4">
    <card v-for="item in props.data" :key="item.id" :data="item"></card>
  </div>
</template>

<style scoped>

</style>