<script setup lang="ts">
import { useSlideStore } from "@/stores/slide";
import { ref } from "vue";

const slideStore = useSlideStore();

const showNav = ref(false);

const links = [
  { label: "Welcome", url: "#welcome" },
  { label: "About", url: "#about" },
  { label: "Technologies", url: "#tech" },
  { label: "Projects", url: "#projects" },
  { label: "Blog", url: "#blog" },
  { label: "Contact", url: "#contact" }
];

const handleNavigation = (index: number) => {
  if (!slideStore.flicking) {
    return;
  }

  showNav.value = false;

  if (slideStore.flicking.animating) {
    slideStore.flicking.control.stopAnimation();
  }

  slideStore.setSlide(index);
  slideStore.flicking.moveTo(index, 1000);
};
</script>

<template>
  <button
    class="fixed left-0 right-0 top-0 z-50 flex cursor-pointer justify-end bg-primary-light p-4 lg:hidden"
    @click="showNav = !showNav"
  >
    <img src="/icons/menu.svg" alt="" class="h-8 md:h-12" />
  </button>
  <nav
    class="fixed inset-0 z-50 block h-screen bg-primary-light text-primary-dark transition-transform duration-700 lg:static"
    :class="showNav ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'"
  >
    <button class="fixed right-0 top-0 z-50 cursor-pointer p-4 lg:hidden" @click="showNav = !showNav">
      <img src="/icons/close.svg" alt="" class="h-8 md:h-12" />
    </button>
    <div class="mx-auto flex h-full w-fit flex-col justify-center text-right text-2xl font-black">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.url"
        @click="handleNavigation(index)"
        class="py-3 transition-opacity hover:opacity-100"
        :class="{ 'opacity-100': slideStore.currentSlide === index, 'opacity-50': slideStore.currentSlide !== index }"
      >
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>
