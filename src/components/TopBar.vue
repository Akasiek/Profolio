<script setup lang="ts">
defineProps<{
  headerText: string;
  homeLink?: string;
}>();
</script>

<template>
  <div class="sticky top-0 inset-x-0 bg-primary-light z-50">
    <div class="max-w-5xl mx-auto flex items-center gap-4 justify-between px-6 md:px-8 py-4 md:py-6">
      <h1 class="w-fit text-lg md:text-2xl lg:text-3xl font-bold uppercase">{{ headerText }}</h1>

      <a :href="homeLink ?? '/'" class="btn-link px-3 md:px-5 py-2 font-bold whitespace-nowrap h-fit text-sm sm:text-base">
        <span class="hidden md:inline">Back to home →</span>
        <img src="/icons/home.svg" alt="Home icon" class="block md:hidden h-6 w-full" />
      </a>
    </div>
  </div>
</template>
