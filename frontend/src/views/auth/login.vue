<script setup lang="ts">

import BaseLayout from "../base.vue";
import LoginForm from "../../forms/login-form.vue";
</script>

<template>
  <BaseLayout>
    <div class="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
      <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto text-center">
        <span class="relative inline-block">
          <svg viewBox="0 0 52 24" fill="currentColor"
               class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
            <defs>
              <pattern id="27df4f81-c854-45de-942a-fe90f7a300f9" x="0" y="0" width=".135" height=".30">
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect fill="url(#27df4f81-c854-45de-942a-fe90f7a300f9)" width="52" height="24"></rect>
          </svg>
          <span class="relative">Connect</span>
        </span>
        to your account
      </h2>
      <h2 class="text-center">Don't have an account?
        <router-link to="/register" class="text-blue-500">Register</router-link>
      </h2>
      <LoginForm/>
    </div>
  </BaseLayout>
</template>

<style scoped>

</style>