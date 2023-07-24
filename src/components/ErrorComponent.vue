<script setup lang="ts">
defineProps<{ secondaryText?: string; safetyLink?: string }>();
</script>

<template>
  <section class="bg-primary-light h-screen w-screen flex items-center justify-center">
    <div>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p v-if="secondaryText" class="text-zinc-400 text-lg mb-4">{{ secondaryText }}</p>
      <a :href="safetyLink ?? '/'" class="btn-link py-2 font-bold w-full text-center block"> Go back to safety </a>
    </div>
  </section>
</template>
