<script setup lang="ts">
import {ref} from 'vue';

const searchQuery = ref('');

const emit = defineEmits(['search']);

const submitForm = () => {
  emit('search', searchQuery.value);
};
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col items-center justify-center space-y-4 ">
    <input v-model="searchQuery" type="text" placeholder="Search for a movie or a show"
           class="w-96 p-2 text-lg text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:border-deep-purple-accent-400"/>
    <button type="submit"
            class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50">
      Search
    </button>
  </form>
</template>