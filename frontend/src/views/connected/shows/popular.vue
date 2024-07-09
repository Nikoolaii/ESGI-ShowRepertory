<script setup lang="ts">
import {ref, computed} from 'vue';
import ProfileBase from '../base.vue';
import ApiService from "../../../services/api-service.ts";
import CardGrid from "../../../components/card-grid.vue";
import Loader from "../../../components/loader.vue";

const isLoading = ref(true);
const popularMovies = ref([]);
const popularShows = ref([]);
const showAllMovies = ref(false);
const showAllShows = ref(false);

Promise.all([
  ApiService.callApi("tmdb/movie/popular?language=en-US&page=1", 'GET'),
  ApiService.callApi("tmdb/tv/popular?language=en-US&page=1", 'GET')
]).then((responses) => {
  popularMovies.value = responses[0].results;
  popularShows.value = responses[1].results;
  isLoading.value = false;
});

const displayedMovies = computed(() => showAllMovies.value ? popularMovies.value : popularMovies.value.slice(0, 5));
const displayedShows = computed(() => showAllShows.value ? popularShows.value : popularShows.value.slice(0, 5));
</script>

<template>
  <ProfileBase>
    <div v-if="isLoading">
      <loader></loader>
    </div>
    <div v-else>
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800">Popular Movies</h1>
        <card-grid :data="displayedMovies" media_type="movie"></card-grid>
        <button @click="showAllMovies = !showAllMovies"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{
            showAllMovies ? 'Show Less' : 'Show All'
          }}
        </button>
      </div>

      <hr class="my-5"/>

      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800">Popular Shows</h1>
        <card-grid :data="displayedShows" media_type="tv"></card-grid>
        <button @click="showAllShows = !showAllShows"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{ showAllShows ? 'Show Less' : 'Show All' }}
        </button>
      </div>
    </div>
  </ProfileBase>
</template>

<style scoped>
</style>