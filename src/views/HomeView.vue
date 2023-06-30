<script setup lang="ts">
import ImagePanel from '@/components/ImagePanel.vue';
import NavSide from '@/components/NavSide.vue';
import MainSlider from '@/components/MainSlider.vue';
</script>

<template>
  <main class="grid grid-cols-[20%_20%_60%]">
    <NavSide />
    <ImagePanel />
    <MainSlider />
  </main>
</template>
