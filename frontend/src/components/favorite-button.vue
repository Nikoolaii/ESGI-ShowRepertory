<script setup lang="ts">
import localStorageService from "../services/local-storage-service.ts";
import ApiService from "../services/api-service.ts";
import {ref, onMounted} from "vue";

const props = defineProps<{
  serie_id: string;
  serie_type: string;
}>();

const user = localStorageService.getItem('user');
const userID = user ? user.id : '';
const favorite = ref(false);

onMounted(() => {
  ApiService.callApi(`favorites/user/${userID}/${props.serie_type}/${props.serie_id}`, 'get').then((response) => {
    favorite.value = response !== null;
  });
});

function addFavorite() {
  ApiService.callApi(`favorites/`, 'post', {
    userId: userID,
    serieId: props.serie_id,
    serieType: props.serie_type,
  }).then(() => {
    favorite.value = true;
  });
}

function removeFavorite() {
  ApiService.callApi(`favorites/user/${userID}/${props.serie_type}/${props.serie_id}`, 'delete').then(() => {
    favorite.value = false;
  });
}
</script>

<template>
  <div>
    <button v-if="!favorite" @click="addFavorite" class="flex mx-auto items-center text-deep-purple-accent-400">
      ❤️ Add to favorites
    </button>
    <button v-else @click="removeFavorite">Remove from favorites</button>
  </div>
</template>

<style scoped>
</style>