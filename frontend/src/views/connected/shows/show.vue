<script setup lang="ts">
import ProfileBase from '../base.vue';
import {useRoute} from "vue-router";
import ApiService from "../../../services/api-service.ts";

const route = useRoute();
const id = route.params.id;
const type = route.params.type;

const result = await ApiService.callApi(`tmdb/${type}/${id}`, 'GET', {});
console.log(result);
</script>

<template>
  <ProfileBase>

  </ProfileBase>
</template>

<style scoped>

</style>