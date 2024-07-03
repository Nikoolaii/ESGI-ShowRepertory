<script setup lang="ts">
import ProfileBase from '../base.vue';
import LocalStorageService from "../../../services/local-storage-service.ts";

const user = LocalStorageService.getItem('user');
</script>

<template>
  <ProfileBase>
  </ProfileBase>
</template>

<style scoped>

</style>