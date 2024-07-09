<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {parseISO, isBefore} from 'date-fns';

const props = defineProps<{
  saisons: any[];
}>();

const seasons = ref<{ season: number, episodes: any[] }[]>([]);

watch(() => props.saisons, (newSaisons) => {
  if (newSaisons) {
    seasons.value = [];
    newSaisons.forEach((saison: any) => {
      seasons.value.push({
        season: saison.season_number,
        episodes: saison.episodes,
      });
    });
  }
}, {immediate: true});

const currentDate = new Date();

const filteredSeasons = computed(() => {
  return seasons.value.map(season => ({
    ...season,
    episodes: season.episodes.filter(episode => isBefore(parseISO(episode.air_date), currentDate))
  }));
});
</script>

<template>
  <div v-if="filteredSeasons.length" class="space-y-4 container">
    <div v-for="season in filteredSeasons" :key="season.season"
         class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <details>
        <summary class="cursor-pointer text-lg font-semibold text-gray-800 dark:text-gray-200">
          Season {{ season.season }}
        </summary>
        <ul class="list-disc list-inside mt-2 space-y-2">
          <li v-for="episode in season.episodes" :key="episode.id"
              class="flex items-center space-x-4 bg-gray-50 border-2 rounded-md">
            <img :src="`http://image.tmdb.org/t/p/w500/${episode.still_path}`" :alt="episode.name"
                 class="w-20 h-20 object-cover rounded-lg shadow-md">
            <div class="flex flex-col items-start">
              <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ episode.episode_number }}.
                {{ episode.name }}</h4>
              <p class="text-gray-800 dark:text-gray-200">Air date: {{ episode.air_date }}</p>
            </div>
          </li>
        </ul>
      </details>
    </div>
  </div>
  <div v-else>
    <p class="text-gray-800 dark:text-gray-200">No episodes available.</p>
  </div>
</template>

<style scoped>
</style>