<script setup lang="ts">
import { useSlideStore } from '@/stores/slide';

const slideStore = useSlideStore();

const links = [
  { label: 'Welcome', url: '#welcome' },
  { label: 'About', url: '#about' },
  { label: 'Technologies', url: '#tech' },
  { label: 'Projects', url: '#projects' },
  { label: 'Blog', url: '#blog' },
  { label: 'Contact', url: '#contact' }
];

// TODO: Fix clicking function. Make it stop animation and play the new one.
</script>

<template>
  <nav class="bg-primary-light text-primary-dark h-screen">
    <div class="h-full w-fit mx-auto flex flex-col justify-center text-right text-2xl font-black">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.url"
        @click="slideStore.setSlide(index)"
        class="hover:opacity-100 transition-opacity py-3"
        :class="{ 'opacity-100': slideStore.currentSlide === index, 'opacity-50': slideStore.currentSlide !== index }"
      >
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>
