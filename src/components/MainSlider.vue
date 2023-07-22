<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Status } from '@egjs/vue3-flicking';
import Flicking from '@egjs/vue3-flicking';
import { useSlideStore } from '@/stores/slide';
import type { VueFlicking } from '@egjs/vue3-flicking/declaration/types';
import * as Slide from '@/components/slides/';

const slideStore = useSlideStore();

const flicking = ref<VueFlicking | undefined>();

const slides = [
  { component: Slide.WelcomeSlide, hash: '#welcome' },
  { component: Slide.AboutSlide, hash: '#about' },
  { component: Slide.TechSlide, hash: '#tech' },
  { component: Slide.ProjectsSlide, hash: '#projects' },
  { component: Slide.BlogSlide, hash: '#blog' },
  { component: Slide.ContactSlide, hash: '#contact' },
];

const getDefaultSlide = () => {
  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const slide = slides.findIndex((slide) => slide.hash === hash);

  flicking.value?.moveTo(slide, 0);
  slideStore.setSlide(slide);
};

const moveOnWheel = (event: WheelEvent) => {
  if (flicking.value && !flicking.value?.animating) {
    const direction = event.deltaY > 0 ? 'next' : 'prev';
    flicking.value[direction]();

    slideStore.setSlide(calculateNextSlide(flicking.value.getStatus(), direction) ?? 0);
  }
};

const calculateNextSlide = (status: Status, direction: 'next' | 'prev') => {
  const currentSlide = status.position?.panel ?? 0;

  if (currentSlide === status.panels.length - 1 && direction === 'next') {
    return 0;
  }

  if (currentSlide === 0 && direction === 'prev') {
    return status.panels.length - 1;
  }

  return currentSlide + (direction === 'next' ? 1 : -1);
};

onMounted(() => {
  getDefaultSlide();

  slideStore.flicking = flicking.value;
});
</script>

<template>
  <Flicking
    :options="{ align: 'prev', circular: true, horizontal: false, duration: 800, moveType: ['strict', { count: 1 }], inputType: ['pointer'] }"
    @move-end="(event) => event.isTrusted && slideStore.setSlide(flicking?.getStatus().position.panel ?? 0)"
    class="h-screen"
    @wheel="moveOnWheel"
    ref="flicking"
  >
    <div v-for="(slide, index) in slides" :key="index" class="h-full w-full text-2xl flex items-center">
      <component :is="slide.component" />
    </div>
  </Flicking>
</template>
