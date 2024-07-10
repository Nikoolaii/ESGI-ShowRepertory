<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  nbSerie: number;
  nbMovie: number;
}>();

const nbSeen = ref(0);

nbSeen.value = props.nbSerie + props.nbMovie;
</script>

<template>
  <!-- Do responsive card to show the number of movie, the number of series and the total number of seen -->
  <div class="flex flex-col items-center bg-gray-200 mx-auto p-4">
    <div class="flex flex-col items-center my-4">
      <h1 class="text-3xl">You have seen</h1>
      <h2 class="text-2xl"><span class="text-deep-purple-accent-400">{{ nbSeen }}</span> movies and series</h2>
    </div>
    <div class="flex flex-row items-center justify-evenly">
      <div class="flex justify-center items-center p-5 bg-gray-50 rounded-md m-2">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl"><span class="text-deep-purple-accent-400">{{ props.nbSerie }}</span></h1>
          <h2 class="text-xl">series</h2>
        </div>
      </div>
      <div class="flex justify-center items-center p-5 bg-gray-50 rounded-md m-2">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl"><span class="text-deep-purple-accent-400">{{ props.nbMovie }}</span></h1>
          <h2 class="text-xl">movies</h2>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>