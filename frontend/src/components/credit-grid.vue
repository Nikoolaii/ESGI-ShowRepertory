<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
</script>

<template>
  <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
    <div v-for="credit in props.data" :key="credit.id" class="flex flex-col items-center">
      <img
          :src="credit.profile_path ? 'https://image.tmdb.org/t/p/w500' + credit.profile_path : 'https://placehold.co/200x300'"
          alt="profile" class="w-24 h-36"/>
      <p class="text-lg font-semibold text-gray-800 ">{{ credit.name }}</p>
      <p class="text-lg font-semibold text-deep-purple-accent-400 ">{{ credit.character }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>