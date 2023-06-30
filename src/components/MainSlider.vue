<script setup lang="ts">
import { ref } from 'vue';
import Flicking from '@egjs/vue3-flicking';
import { useSlideStore } from '@/stores/slide';
import WelcomeSlide from '@/components/slides/WelcomeSlide.vue';
import AboutSlide from '@/components/slides/AboutSlide.vue';
import TechSlide from '@/components/slides/TechSlide.vue';

const slideStore = useSlideStore();

const flicking = ref<Flicking | null>(null);

const slides = [WelcomeSlide, AboutSlide, TechSlide, WelcomeSlide, WelcomeSlide, WelcomeSlide];

const moveOnWheel = (e) => {
  if (!flicking.value?.animating) {
    const direction = e.deltaY > 0 ? 'next' : 'prev';
    flicking.value[direction]();
  }
};

const fixSlideDifference = () => {
  if (slideStore.currentSlide !== flicking.value?.getStatus().position.panel) {
    flicking.value?.moveTo(slideStore.currentSlide, 1000);
  }
};

slideStore.$subscribe(() => {
  fixSlideDifference();
});
</script>

<template>
  <Flicking
    :options="{ align: 'prev', circular: true, horizontal: false, duration: 800, moveType: ['strict', { count: 1 }] }"
    @move-end="slideStore.setSlide(flicking?.getStatus().position.panel ?? 0)"
    class="h-screen"
    @wheel="moveOnWheel"
    ref="flicking"
  >
    <div v-for="(slideComponent, index) in slides" :key="index" class="h-full w-full text-2xl flex items-center"><component :is="slideComponent" /></div>
  </Flicking>
</template>
