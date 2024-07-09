<script setup lang="ts">
import {ref} from 'vue';
import ProfileBase from '../base.vue';
import searchForm from "../../../forms/search-form.vue";
import ApiService from "../../../services/api-service.ts";
import CardGrid from "../../../components/card-grid.vue";
import Loader from "../../../components/loader.vue";

const searchResults = ref([]);
const error = ref(null);
const formValidated = ref(false);
const isLoading = ref(false);

const search = async (searchQuery: string) => {
  isLoading.value = true;
  formValidated.value = true;
  const results = await ApiService.callApi(`tmdb/search/multi`, 'GET', {query: searchQuery});
  if (results.error) {
    isLoading.value = false;
    error.value = results.error;
    searchResults.value = [];
  } else {
    isLoading.value = false;
    searchResults.value = results.results;
    error.value = null;
  }
};
</script>

<template>
  <ProfileBase>
    <div v-if="isLoading">
      <loader></loader>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold text-gray-800 text-center my-4">Search a movie or a show</h1>
      <search-form @search="search"></search-form>

      <div id="search-results" class="flex items-center justify-center space-y-4 mt-4">
        <p v-if="error">{{ error }}</p>
        <p v-else-if="searchResults.length === 0 && formValidated">No result found</p>
        <p v-else>
          <card-grid :data="searchResults" media_type=null></card-grid>
        </p>
      </div>
    </div>

  </ProfileBase>
</template>