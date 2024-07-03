<script setup lang="ts">
import ProfileNavbar from "../../components/profile-navbar.vue";
</script>

<template>
  <div>
    <ProfileNavbar/>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>

</style>