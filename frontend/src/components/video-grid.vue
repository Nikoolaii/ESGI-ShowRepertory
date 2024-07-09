<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="video in props.data" :key="video.id" class="flex flex-col items-center">
      <iframe :src="'https://www.youtube.com/embed/' + video.key" width="400" height="200" frameborder="0"
              allowfullscreen></iframe>
      <p class="text-lg font-semibold text-gray-800">{{ video.name }}</p>
    </div>
  </div>

</template>

<style scoped>

</style>