<script setup lang="ts">
const images = [{ src: './images/1.webp', alt: 'My autoportrait' }];
</script>

<template>
  <div v-for="(image, index) in images" :key="index" class="h-screen">
    <img :src="image.src" :alt="image.alt" class="h-screen w-full object-center object-cover" />
  </div>
</template>
