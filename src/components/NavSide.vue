<script setup lang="ts">
import { useSlideStore } from '@/stores/slide';

const slideStore = useSlideStore();

const links = [
  { label: 'Welcome', url: '#welcome' },
  { label: 'About', url: '#about' },
  { label: 'Technologies', url: '#tech' },
  { label: 'Projects', url: '#projects' },
  { label: 'Blog', url: '#blog' },
  { label: 'Contact', url: '#contact' },
];
</script>

<template>
  <nav class="bg-primary-light text-primary-dark h-screen">
    <div class="h-full w-fit mx-auto flex flex-col justify-center text-right text-2xl font-black">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.url"
        @click="
          () => {
            if (!slideStore.flicking) return;

            if (slideStore.flicking.animating) slideStore.flicking.control.stopAnimation();

            slideStore.setSlide(index);
            slideStore.flicking.moveTo(index, 1000);
          }
        "
        class="hover:opacity-100 transition-opacity py-3"
        :class="{ 'opacity-100': slideStore.currentSlide === index, 'opacity-50': slideStore.currentSlide !== index }"
      >
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>
