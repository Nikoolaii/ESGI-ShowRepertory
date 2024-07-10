<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {checkEpisodeSeen, createSeen, deleteSeen} from '../controller/episodes-controller.ts';


const props = defineProps<{
  userId: number;
  serieType: string;
  serieId: string;
}>();

const isValidated = ref<boolean>(false);

async function checkMovieStatus() {
  isValidated.value = await checkEpisodeSeen(null, props.userId, props.serieType, props.serieId);
}

async function createSeenMovie() {
  const createRequest = await createSeen(null, props.userId, props.serieType, props.serieId);
  if (createRequest) {
    checkMovieStatus();
  }
}

async function removeSeenMovie() {
  const deleteRequest = await deleteSeen(null, props.userId, props.serieType, props.serieId);
  if (deleteRequest) {
    checkMovieStatus();
  }
}

onMounted(checkMovieStatus);
</script>

<template>
  <div>
    <button @click="removeSeenMovie" v-if="isValidated" class="flex mx-auto text-xl items-center">Seen
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7"/>
      </svg>
    </button>
    <button @click="createSeenMovie" v-else class="flex mx-auto text-xl items-center">Not seen
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
</style>