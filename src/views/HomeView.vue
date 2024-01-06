<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import NavSide from '@/components/NavSide.vue';
import MainSlider from '@/components/MainSlider.vue';

const show = ref<boolean>(false);

onMounted(() => {
  show.value = true;
});

</script>

<template>
  <main class='grid grid-cols-1 lg:grid-cols-[25%_75%] bg-primary-light overflow-hidden'>
    <Transition name='nav'>
      <NavSide v-if='show' />
    </Transition>
    <Transition name='slider'>
      <MainSlider v-if='show' />
    </Transition>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .nav-enter-active,
  .nav-leave-active {
    transition: all 1s ease-in-out;
    transition-delay: 0.5s;
    transform: translateX(0);
  }

  .nav-enter-from,
  .nav-leave-to {
    transform: translateX(-100%);
  }

  .slider-enter-active,
  .slider-leave-active {
    transition: all 1s ease-in-out;
    transform: translateX(0);
  }

  .slider-enter-from,
  .slider-leave-to {
    transform: translateX(100%);
  }

}

</style>
