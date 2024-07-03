<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();

</script>

<template>
  <router-link :to="'/shows/'+props.data.media_type +'/'+ props.data.id">
    <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img :src="'https://image.tmdb.org/t/p/w500' + props.data.poster_path" alt="poster"
           class="rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
           v-if="props.data.poster_path">
      <img src="https://placehold.co/200x300" alt="placeholder"
           class="rounded-lg grayscale hover:grayscale-0 transition-all duration-500" v-else>
      <h2 class="text-xl font-semibold" v-if="props.data.title">{{ props.data.title }}</h2>
      <h2 class="text-xl font-semibold" v-else-if="props.data.name">{{ props.data.name }}</h2>
    </div>
  </router-link>
</template>

<style scoped>

</style>