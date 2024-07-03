<script setup lang="ts">
import {ref} from 'vue';
import ProfileBase from '../base.vue';
import searchForm from "../../../forms/search-form.vue";
import ApiService from "../../../services/api-service.ts";
import CardGrid from "../../../components/card-grid.vue";

const searchResults = ref([]);
const error = ref(null);
const formValidated = ref(false);

const search = async (searchQuery: string) => {
  formValidated.value = true;
  const results = await ApiService.callApi(`tmdb/search/multi`, 'GET', {query: searchQuery});
  if (results.error) {
    error.value = results.error;
    searchResults.value = [];
  } else {
    searchResults.value = results.results;
    error.value = null;
  }
};
</script>

<template>
  <ProfileBase>
    <search-form @search="search"></search-form>
    <div id="search-results" class="flex items-center justify-center space-y-4 mt-4">
      <p v-if="error">{{ error }}</p>
      <p v-else-if="searchResults.length === 0 && formValidated">No result found</p>
      <p v-else></p>
    </div>
    <card-grid :data="searchResults"></card-grid>

  </ProfileBase>
</template>