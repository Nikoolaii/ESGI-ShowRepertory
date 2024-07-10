<script setup lang="ts">
import ProfileBase from '../base.vue';
import LocalStorageService from "../../../services/local-storage-service.ts";
import ApiService from "../../../services/api-service.ts";
import {ref, computed} from "vue";

import nbSeen from "../../../components/nb-seen.vue";
import Loader from "../../../components/loader.vue";
import CardGrid from "../../../components/card-grid.vue";

const user = LocalStorageService.getItem('user');
const userID = user ? user.id : '';

const isLoading = ref(true);
const movie = ref([]);
const tv = ref([]);
const favorites = ref([]);
const numberOfEpisodes = ref(0);
const numberOfMovies = ref(0);
const showAllMovies = ref(false);
const showAllShows = ref(false);
const showAllFavorites = ref(false);

const fetchData = async () => {
  const responses = await Promise.all([
    ApiService.callApi(`seen/user/${userID}`, 'GET', {}),
    ApiService.callApi(`favorites/user/${userID}`, 'GET', {}),
  ]);

  for (const seen of responses[0]) {
    if (seen.serieType === 'tv') {
      const showData = await ApiService.callApi(`tmdb/tv/${seen.serieId}`, 'GET', {});
      tv.value.push(showData);
    } else {
      const movieData = await ApiService.callApi(`tmdb/movie/${seen.serieId}`, 'GET', {});
      movie.value.push(movieData);
      numberOfMovies.value += 1;
    }
  }

  for (const favorite of responses[1]) {
    const favoriteData = await ApiService.callApi(`tmdb/${favorite.serieType}/${favorite.serieId}`, 'GET', {});
    favorites.value.push(favoriteData);
  }

  tv.value = sortSerieByUnique(tv.value);
  numberOfEpisodes.value = tv.value.length;

  isLoading.value = false;
};

function sortSerieByUnique(serie) {
  return serie.filter((v, i, a): boolean => a.findIndex(t => (t.id === v.id)) === i);
}

const displayedMovies = computed(() => showAllMovies.value ? movie.value : movie.value.slice(0, 5));
const displayedShows = computed(() => showAllShows.value ? tv.value : tv.value.slice(0, 5));
const displayedFavorites = computed(() => showAllFavorites.value ? favorites.value : favorites.value.slice(0, 5));

fetchData();
</script>

<template>
  <ProfileBase>
    <div v-if="isLoading" class="flex justify-center items-center h-96">
      <Loader/>
    </div>
    <div v-else>
      <nbSeen :nbSerie="numberOfEpisodes" :nbMovie="numberOfMovies"/>
      <div class="container mx-auto text-center" v-if="numberOfEpisodes > 0">
        <h1 class="text-2xl font-bold text-gray-800">Shows</h1>
        <card-grid :data="displayedShows" media_type="tv"></card-grid>
        <button @click="showAllShows = !showAllShows" v-if="numberOfEpisodes > 5"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{
            showAllShows ? 'Show Less' : 'Show All'
          }}
        </button>
      </div>
      <div v-else class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800">No shows seen yet</h1>
      </div>
      <hr class="my-5"/>
      <div class="container mx-auto text-center" v-if="numberOfMovies > 0">
        <h1 class="text-2xl font-bold text-gray-800">Movies</h1>
        <card-grid :data="displayedMovies" media_type="movie"></card-grid>
        <button @click="showAllMovies = !showAllMovies" v-if="numberOfMovies > 5"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{
            showAllMovies ? 'Show Less' : 'Show All'
          }}
        </button>
      </div>
      <div v-else class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800">No movies seen yet</h1>
      </div>
      <hr class="my-5"/>
      <div class="container mx-auto text-center" v-if="favorites.length > 0">
        <h1 class="text-2xl font-bold text-gray-800">Favorites</h1>
        <card-grid :data="displayedFavorites" media_type="favorite"></card-grid>
        <button @click="showAllFavorites = !showAllFavorites" v-if="favorites.length > 5"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{
            showAllFavorites ? 'Show Less' : 'Show All'
          }}
        </button>
      </div>
      <div v-else class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800">No favorites yet</h1>
      </div>
    </div>
  </ProfileBase>
</template>

<style scoped>
</style>