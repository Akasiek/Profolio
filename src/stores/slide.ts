import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSlideStore = defineStore('slide', () => {
  const currentSlide = ref(0);

  const setSlide = (slide: number) => (currentSlide.value = slide);
  const incrementSlide = () => (currentSlide.value += 1);

  return { currentSlide, setSlide, incrementSlide };
});
