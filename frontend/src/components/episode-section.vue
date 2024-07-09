<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import {parseISO, isBefore} from 'date-fns';
import {RouteParamValue} from 'vue-router';
import {checkEpisodeSeen, createSeen, deleteSeen} from '../controller/episodes-controller.ts';

const props = defineProps<{
  saisons: any[];
  userId: number | RouteParamValue[];
  serieType: string | RouteParamValue[];
  serieId: string | RouteParamValue[];
}>();

const seasons = ref<{ season: number, episodes: any[] }[]>([]);
const filteredSeasons = ref<{ season: number, episodes: any[] }[]>([]);

watch(() => props.saisons, (newSaisons) => {
  if (newSaisons) {
    seasons.value = [];
    newSaisons.forEach((saison: any) => {
      seasons.value.push({
        season: saison.season_number,
        episodes: saison.episodes,
      });
    });
    filterSeasons();
  }
}, {immediate: true});

const currentDate = new Date();

async function filterSeasons() {
  const updatedSeasons = await Promise.all(seasons.value.map(async (season) => {
    const updatedEpisodes = await Promise.all(season.episodes.map(async (episode) => {
      const isValidated = await checkEpisodeSeen(
          episode.id,
          props.userId,
          props.serieType,
      );
      return {
        ...episode,
        validated: isValidated,
      };
    }));
    return {
      ...season,
      episodes: updatedEpisodes.filter(episode => isBefore(parseISO(episode.air_date), currentDate)),
    };
  }));
  filteredSeasons.value = updatedSeasons;
}

async function createSeenEpisode(episodeId: string) {
  const createRequest = await createSeen(episodeId, props.userId, props.serieType);
  if (createRequest) {
    filterSeasons();
  }
}

async function removeSeenEpisode(episodeId: string) {
  const deleteRequest = await deleteSeen(episodeId, props.userId, props.serieType);
  if (deleteRequest) {
    filterSeasons();
  }
}

onMounted(filterSeasons);
</script>

<template>
  <div v-if="filteredSeasons.length" class="space-y-4 container">
    <div v-for="season in filteredSeasons" :key="season.season"
         class="bg-white p-4 rounded-lg shadow-md">
      <details>
        <summary class="cursor-pointer text-lg font-semibold text-gray-800">
          Season {{ season.season }}
        </summary>
        <ul class="list-disc list-inside mt-2 space-y-2">
          <li v-for="episode in season.episodes" :key="episode.id"
              class="flex items-center space-x-4 bg-gray-50 border-2 rounded-md justify-between">
            <div class="flex items-center space-x-4">
              <img :src="`http://image.tmdb.org/t/p/w500/${episode.still_path}`" :alt="episode.name"
                   class="w-20 h-20 object-cover rounded-lg shadow-md">
              <div class="flex flex-col items-start">
                <h4 class="text-lg font-semibold text-gray-800 ">{{ episode.episode_number }}.
                  {{ episode.name }}</h4>
                <p class="text-gray-800 ">Air date: {{ episode.air_date }}</p>
              </div>
            </div>
            <div v-if="episode.validated" class="text-green-500 text-right ml-auto p-4"
                 @click="removeSeenEpisode(episode.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div v-else class="text-red-500 text-right ml-auto p-4" @click="createSeenEpisode(episode.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </li>
        </ul>
      </details>
    </div>
  </div>
  <div v-else>
    <p class="text-gray-800">No episodes available.</p>
  </div>
</template>

<style scoped>
</style>