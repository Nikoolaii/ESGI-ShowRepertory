<script setup lang="ts">
import BaseLayout from '../base.vue';
import LocalStorageService from "../../services/local-storage-service.ts";
import {useRouter} from 'vue-router';

const router = useRouter();

if (LocalStorageService.getItem('token')) {
  router.push({name: 'profile-index'});
}
</script>

<template>
  <BaseLayout>
    <div class="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
      <div class="max-w-xl mx-auto lg:max-w-screen-xl">
        <div class="mb-16 lg:max-w-lg lg:mb-0">
          <div class="max-w-xl mb-6">
            <div>
              <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                Welcome
              </p>
            </div>
            <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              To the new<br class="hidden md:block"/>
              way
              <span class="inline-block text-deep-purple-accent-400">to remember</span>
            </h2>
            <p class="text-base text-gray-700 md:text-lg">
              Tired of not remembering which episode you're on? So are we! ShowTracker is a simple way to keep track of
              your favorite shows and episodes.
            </p>
          </div>
          <div class="flex items-center">
            <router-link to='register'>
              <button
                  class="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </button>
            </router-link>
            <router-link to='about'>
              <p aria-label=""
                 class="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
                Learn
                more</p>
            </router-link>
          </div>
        </div>
      </div>
      <div
          class="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
        <img src="/home/nav-presentation.png"
             class="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
             alt=""/>
      </div>
    </div>
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
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
          <span class="relative">The</span>
        </span>
          new way to remember your shows
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
          Track and remember your favorite shows and episodes with ShowTracker. Never forget which episode you're on
          again!
        </p>
      </div>
      <div class="grid max-w-screen-lg gap-8 row-gap-10 mx-auto lg:grid-cols-2">
        <div class="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div class="mr-4">
            <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <font-awesome-icon icon="bolt" class="w-6 h-6 text-deep-purple-accent-400"/>
            </div>
          </div>
          <div>
            <h6 class="mb-3 text-xl font-bold leading-5">The deep ocean</h6>
            <p class="mb-3 text-sm text-gray-900">
              A flower in my garden, a mystery in my panties. Heart attack never stopped old Big Bear. I didn't even
              know we were calling him Big Bear. We never had the chance to.
            </p>
          </div>
        </div>
        <div class="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div class="mr-4">
            <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <font-awesome-icon icon="tv" class="w-6 h-6 text-deep-purple-accent-400"/>
            </div>
          </div>
          <div>
            <h6 class="mb-3 text-xl font-bold leading-5">When has justice</h6>
            <p class="mb-3 text-sm text-gray-900">
              Rough pomfret lemon shark plownose chimaera southern sandfish kokanee northern sea robin Antarctic cod.
              Yellow-and-black triplefin gulper South American Lungfish mahi-mahi, butterflyfish glass catfish soapfish
              ling gray mullet!
            </p>
          </div>
        </div>
        <div class="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div class="mr-4">
            <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <font-awesome-icon icon="sitemap" class="w-6 h-6 text-deep-purple-accent-400"/>
            </div>
          </div>
          <div>
            <h6 class="mb-3 text-xl font-bold leading-5">Organically grow</h6>
            <p class="mb-3 text-sm text-gray-900">
              A slice of heaven. O for awesome, this chocka full cuzzie is as rip-off as a cracker. Meanwhile, in behind
              the bicycle shed, Hercules Morse, as big as a horse and Mrs Falani were up to no good with a bunch of
              crook pikelets.
            </p>
          </div>
        </div>
        <div class="flex flex-col max-w-md sm:mx-auto sm:flex-row">
          <div class="mr-4">
            <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
              <font-awesome-icon icon="gauge" class="w-6 h-6 text-deep-purple-accent-400"/>
            </div>
          </div>
          <div>
            <h6 class="mb-3 text-xl font-bold leading-5">A slice of heaven</h6>
            <p class="mb-3 text-sm text-gray-900">
              Disrupt inspire and think tank, social entrepreneur but preliminary thinking think tank compelling.
              Inspiring, invest synergy capacity building, white paper; silo, unprecedented challenge B-corp
              problem-solvers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>

</style>