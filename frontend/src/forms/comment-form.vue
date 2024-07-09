<script setup lang="ts">
import {ref} from 'vue';
import ApiService from "../services/api-service.ts";

const props = defineProps<{
  serie_id: string;
  serie_type: string;
}>();

const user = localStorage.getItem('user');
const commentText = ref('');
const commentTitle = ref('');

const error = ref(false);

const userID = user ? JSON.parse(user).id : '';

const emit = defineEmits(['comment-added']);

const submitComment = () => {
  ApiService.callApi(`posts/`, 'post', {
    title: commentTitle.value,
    content: commentText.value,
    authorId: userID,
    serieId: props.serie_id,
    serieType: props.serie_type,
  }).then((response) => {
    if (response.error) {
      error.value = true;
    } else {
      error.value = false;
      // Get the user data
      ApiService.callApi(`users/${userID}/`, 'get').then((userResponse) => {
        response.user = userResponse;
        emit('comment-added', response);
        commentText.value = '';
        commentTitle.value = '';
      });
    }
  });
};
</script>

<template>
  <form @submit.prevent="submitComment">
    <label for="title" class="text-lg font-semibold text-gray-800 dark:text-gray-200">Title</label>
    <input type="text" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"
           v-model="commentTitle">
    <label for="comment" class="text-lg font-semibold text-gray-800 dark:text-gray-200">Comment</label>
    <textarea v-model="commentText"
              class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg my-4"></textarea>
    <div class="mx-auto text-center">
      <p v-if="error" class="text-red-500">Error submitting comment</p>
      <button type="submit"
              class="px-4 py-2 text-lg font-semibold text-white bg-deep-purple-accent-400 rounded-lg shadow-md hover:bg-deep-purple-accent-700 focus:outline-none focus:ring focus:ring-deep-purple-accent-400 focus:ring-opacity-50 my-4">
        Submit
      </button>
    </div>
  </form>
</template>

<style scoped>
</style>