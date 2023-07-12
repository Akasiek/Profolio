<script setup lang="ts">
import { ref } from 'vue';
import Flicking from '@egjs/vue3-flicking';
import { useSlideStore } from '@/stores/slide';
import type { VueFlicking } from '@egjs/vue3-flicking/declaration/types';
import * as Slide from '@/components/slides/';

const slideStore = useSlideStore();

const flicking = ref<VueFlicking | undefined>();

const slides = [Slide.WelcomeSlide, Slide.AboutSlide, Slide.TechSlide, Slide.ProjectsSlide, Slide.BlogSlide, Slide.WelcomeSlide];

const moveOnWheel = (event: WheelEvent) => {
  if (flicking.value && !flicking.value?.animating) {
    const direction = event.deltaY > 0 ? 'next' : 'prev';
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
    :options="{ align: 'prev', circular: true, horizontal: false, duration: 800, moveType: ['strict', { count: 1 }], panelsPerView: 1, inputType: ['pointer'] }"
    @move-end="slideStore.setSlide(flicking?.getStatus().position.panel ?? 0)"
    class="h-screen"
    @wheel="moveOnWheel"
    ref="flicking"
  >
    <div v-for="(slideComponent, index) in slides" :key="index" class="h-full w-full text-2xl flex items-center"><component :is="slideComponent" /></div>
  </Flicking>
</template>
