<script setup lang="ts">
import ApiService from "../services/api-service.ts";
import Loader from "./loader.vue";
import {ref} from "vue";
import CommentForm from "../forms/comment-form.vue";
import Comment from "../interface/comment-interface.ts";

const props = defineProps<{
  show_id: string;
  show_type: string;
}>();

const comments = ref<Comment[]>([]);
const isLoading = ref(true);

const apiComments = ApiService.callApi(`posts/${props.show_type}/${props.show_id}/`, 'get');

apiComments.then((response) => {
  comments.value = response;

  comments.value.forEach((comment) => {
    ApiService.callApi(`users/${comment.authorId}/`, 'get').then((response) => {
      comment.user = response;
    });
  });
  isLoading.value = false;
});

const addComment = (newComment) => {
  comments.value.push(newComment);
};

</script>

<template>
  <div>
    <div v-if="isLoading">
      <loader></loader>
    </div>
    <div v-else>
      <div class="container mx-auto text-left">
        <div v-if="comments.length != 0">
          <div v-for="comment in comments" :key="comment.id">
            <div class="bg-gray-100 p-4 rounded-lg my-4">
              <h2 class="text-xl font-semibold text-gray-800 ">{{ comment.title }}</h2>
              <p class="text-gray-800 font-light"
                 v-if="comment.user && comment.user.name">By {{
                  comment.user.name
                }}</p>
              <br/>
              <p class="text-gray-800 ">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-800 ">No comments yet</p>
        </div>
        <comment-form :serie_id="props.show_id" :serie_type="props.show_type"
                      @comment-added="addComment"></comment-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>