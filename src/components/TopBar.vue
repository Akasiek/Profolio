<script setup lang="ts">
defineProps<{
  headerText: string;
  homeLink?: string;
}>();
</script>

<template>
  <div class="sticky inset-x-0 top-0 z-50 bg-primary-light">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
      <h1 class="w-fit text-lg font-bold uppercase md:text-2xl lg:text-3xl">{{ headerText }}</h1>

      <a :href="homeLink ?? '/'" class="btn-link h-fit whitespace-nowrap px-3 py-2 text-sm font-bold sm:text-base md:px-5">
        <span class="hidden md:inline">Back to home →</span>
        <img src="/icons/home.svg" alt="Home icon" class="block h-5 w-full md:hidden md:h-6" />
      </a>
    </div>
  </div>
</template>
