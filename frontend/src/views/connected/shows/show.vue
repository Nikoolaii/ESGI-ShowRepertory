<script setup lang="ts">
import ProfileBase from '../base.vue';
import {useRoute} from "vue-router";
import {ref, computed} from "vue";

import ApiService from "../../../services/api-service.ts";
import getSaisons from "../../../controller/episodes-controller.ts";
import localStorageService from "../../../services/local-storage-service.ts";

import Loader from "../../../components/loader.vue";
import CardGrid from "../../../components/card-grid.vue";
import VideoGrid from "../../../components/video-grid.vue";
import CreditGrid from "../../../components/credit-grid.vue";
import CommentSection from "../../../components/comment-section.vue";
import EpisodeSection from "../../../components/episode-section.vue";
import MovieSection from "../../../components/movie-section.vue";

const route = useRoute();
const id = route.params.id;
const type = route.params.type;
const user = localStorageService.getItem('user');
const userID = user ? user.id : '';

const isLoading = ref(true);
const result = ref({});
const showAllCredits = ref(false);
const showAllVideos = ref(false);
const showAllRecommendations = ref(false);
const showAllSimilar = ref(false);

Promise.all([
  ApiService.callApi(`tmdb/${type}/${id}`, 'GET', {}),
  ApiService.callApi(`tmdb/${type}/${id}/credits`, 'GET', {}),
  ApiService.callApi(`tmdb/${type}/${id}/videos`, 'GET', {}),
  ApiService.callApi(`tmdb/${type}/${id}/recommendations`, 'GET', {}),
  ApiService.callApi(`tmdb/${type}/${id}/similar`, 'GET', {}),
]).then((responses) => {
  result.value = {
    details: responses[0],
    credits: responses[1],
    videos: responses[2],
    recommendations: responses[3],
    similar: responses[4],
  };

  if (type === 'tv') {
    getSaisons(id, result.value.details.number_of_seasons).then((response) => {
      result.value.saisons = response;
    });
  }
  isLoading.value = false;

});

const displayedCredits = computed(() => showAllCredits.value ? result.value.credits.cast : result.value.credits.cast.slice(0, 8));
const displayedVideos = computed(() => showAllVideos.value ? result.value.videos.results : result.value.videos.results.slice(0, 3));
const displayedRecommendations = computed(() => showAllRecommendations.value ? result.value.recommendations.results : result.value.recommendations.results.slice(0, 5));
const displayedSimilar = computed(() => showAllSimilar.value ? result.value.similar.results : result.value.similar.results.slice(0, 5));
</script>

<template>
  <ProfileBase>
    <div v-if="isLoading">
      <Loader></Loader>
    </div>
    <div v-else>
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800 ">
          {{ result.details.title || result.details.name }}
        </h1>
        <div class="flex flex-row items-center justify-evenly">
          <div class="flex justify-center items-center">
            <img
                :src="result.details.poster_path ? 'https://image.tmdb.org/t/p/w500' + result.details.poster_path : 'https://placehold.co/200x300'"
                alt="poster" class="w-48 h-72"/>
          </div>
          <div class="w-2/4">
            <p class="text-lg font-semibold text-gray-800 ">{{ result.details.overview }}</p>
            <br/>
            <p class="text-lg font-semibold text-gray-800 ">
              <span class="text-bold">Release date: </span>
              {{ result.details.release_date || result.details.first_air_date }}
            </p>
            <p class="text-lg font-semibold text-gray-800 ">
              <span class="text-bold">Score: </span>{{ result.details.vote_average }}
            </p>
            <p class="text-lg font-semibold text-gray-800 " v-if="type == 'movie'">
              <span class="text-bold">Duration: </span>
              {{ result.details.runtime || result.details.episode_run_time[0] }} mins
            </p>
          </div>
        </div>
      </div>
      <hr class="my-4"/>
      <!-- Episode Section -->
      <div class="container mx-auto text-center" v-if="type == 'tv'">
        <h1 class="text-2xl font-bold text-gray-800 ">Episodes</h1>
        <episode-section :saisons="result.saisons" :userId="userID" :serieType="type" :serieId="id"></episode-section>
      </div>
      <div class="container mx-auto text-center" v-else-if="type == 'movie'">
        <h1 class="text-2xl font-bold text-gray-800 ">Status</h1>
        <MovieSection serieType="movie" :serieId="id" :userId="userID"></MovieSection>
      </div>
      <hr class="my-4"/>
      <!-- Credits Section -->
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800 ">Credits</h1>
        <credit-grid :data="displayedCredits"></credit-grid>
        <button @click="showAllCredits = !showAllCredits"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{ showAllCredits ? 'Show Less' : 'Show All' }}
        </button>
      </div>
      <hr class="my-4"/>

      <!-- Videos Section -->
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800 ">Videos</h1>
        <video-grid :data="displayedVideos"></video-grid>
        <button @click="showAllVideos = !showAllVideos"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{ showAllVideos ? 'Show Less' : 'Show All' }}
        </button>
      </div>
      <hr class="my-4"/>

      <!-- Recommendations Section -->
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800 ">Recommendations</h1>
        <div class="flex justify-center items-center">
          <card-grid :data="displayedRecommendations" :media_type="type"></card-grid>
        </div>
        <button @click="showAllRecommendations = !showAllRecommendations"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{ showAllRecommendations ? 'Show Less' : 'Show All' }}
        </button>
      </div>
      <hr class="my-4"/>


      <!-- Similar Section -->
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800 ">Similar</h1>
        <div class="flex justify-center items-center">
          <card-grid :data="displayedSimilar" :media_type="type"></card-grid>
        </div>
        <button @click="showAllSimilar = !showAllSimilar"
                class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
          {{ showAllSimilar ? 'Show Less' : 'Show All' }}
        </button>
      </div>

      <!-- Comment Section -->
      <div class="container mx-auto text-center">
        <h1 class="text-2xl font-bold text-gray-800 ">Comments</h1>
        <comment-section :show_id="id" :show_type="type"></comment-section>
      </div>
    </div>
  </ProfileBase>
</template>

<style scoped>
</style>