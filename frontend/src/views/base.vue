<script setup lang="ts">
import Navbar from '../components/navbar.vue';
</script>

<template>
  <div>
    <Navbar/>
    <main>
      <!-- This is where the content of child components will be injected -->
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>

</style>