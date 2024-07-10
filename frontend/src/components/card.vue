<script setup lang="ts">
const props = defineProps<{
  data: any;
  media_type: string;
}>();


</script>

<template>
  <router-link :to="'/shows/'+ (props.data.media_type || props.media_type) + '/' + props.data.id" class="block">
    <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center h-96 justify-between">
      <img
          :src="props.data.poster_path ? 'https://image.tmdb.org/t/p/w500' + props.data.poster_path : 'https://placehold.co/200x300'"
          alt="poster"
          class="rounded-lg transition-all duration-500 max-h-72 w-full object-cover">
      <h2 class="text-xl font-semibold mt-4 text-center overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
        {{ props.data.title || props.data.name }}
      </h2>
    </div>
  </router-link>
</template>

<style scoped>
</style>