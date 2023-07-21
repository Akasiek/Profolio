import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { VueFlicking } from '@egjs/vue3-flicking/declaration/types';

export const useSlideStore = defineStore('slide', () => {
  const currentSlide = ref(0);
  const flicking = ref<VueFlicking | undefined>();

  const setSlide = (slide: number) => (currentSlide.value = slide);
  const incrementSlide = () => (currentSlide.value += 1);

  return { currentSlide, flicking, setSlide, incrementSlide };
});
