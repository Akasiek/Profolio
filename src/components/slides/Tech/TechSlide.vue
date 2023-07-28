<script setup lang="ts">
import type { Component } from "vue";
import { ref } from "vue";
import * as Card from "./techInfoCards";
import { Motion, Presence } from "motion/vue";

const technologies: { name: string; logoPath: string; secondaryLogoPath?: string; cardComponent?: Component; span?: "2x" | "2y" }[] = [
  {
    name: "Yii",
    logoPath: "/icons/technologies/yii.svg",
    span: "2x",
    cardComponent: Card.YiiCard
  },
  {
    name: "React",
    logoPath: "/icons/technologies/react.svg",
    cardComponent: Card.ReactCard
  },
  {
    name: "Astro",
    logoPath: "/icons/technologies/astro-dark.svg",
    secondaryLogoPath: "/icons/technologies/astro.svg",
    cardComponent: Card.AstroCard
  },
  {
    name: "Vue",
    logoPath: "/icons/technologies/vue.svg",
    span: "2y",
    cardComponent: Card.VueCard
  },
  {
    name: "Tailwind",
    logoPath: "/icons/technologies/tailwind.svg",
    cardComponent: Card.TailwindCard
  },
  {
    name: "Django",
    logoPath: "/icons/technologies/django.svg",
    cardComponent: Card.DjangoCard
  },
  {
    name: "Typescript",
    logoPath: "/icons/technologies/typescript.svg",
    cardComponent: Card.TypescriptCard
  }
];

const idInfoCardTech = ref<number | null>(null);
const isModalOpen = ref<boolean>(false);
</script>

<template>
  <section class="relative flex h-screen w-screen flex-col justify-center bg-primary-light px-4 sm:px-6 md:px-12 2xl:px-24">
    <div class="mb-4 w-full max-w-4xl">
      <h1 class="slide-title mb-0">My Beloved Technologies</h1>
      <p class="mt-1 text-xs text-primary-gray">Click for some cool info O_O</p>
    </div>
    <div class="grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:relative lg:gap-10">
      <div
        v-for="(tech, index) in technologies"
        :key="tech.name"
        class="group flex cursor-pointer items-center justify-center border-2 border-primary-dark px-4 py-3 shadow-[0_0_0_#201E1F] transition-all duration-150 hover:shadow-[10px_10px_0_#201E1F] md:border-4 md:py-4 lg:py-7"
        :class="tech?.span === '2x' ? 'col-span-2' : '' || tech?.span === '2y' ? 'md:row-span-2' : ''"
        @click="
          () => {
            idInfoCardTech = index;
            isModalOpen = true;
          }
        "
        :aria-description="'Click to open modal with more info about ' + tech.name"
      >
        <div class="my-auto flex w-full items-center justify-between gap-4 md:justify-center md:gap-6">
          <p class="text-sm font-bold text-primary-dark md:text-base lg:text-lg">{{ tech.name }}</p>
          <img :src="tech.logoPath" class="h-6 transition-all sm:h-8 md:h-10 lg:h-12" :alt="tech.name + ' logo'" />
        </div>
      </div>
      <Presence>
        <Motion
          id="tech-info-modal-backdrop"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="absolute inset-0 z-10 h-full w-full bg-primary-dark/30"
          v-if="isModalOpen"
        ></Motion>
      </Presence>
      <Presence>
        <Motion
          id="tech-info-modal"
          :initial="{ opacity: 0, scale: 0.4 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.6 }"
          class="absolute inset-0 z-20 flex h-full w-full items-center justify-center"
          v-if="isModalOpen && idInfoCardTech !== null"
        >
          <div
            class="relative m-auto mx-4 flex h-fit min-h-fit w-fit items-center justify-center bg-primary-dark lg:mx-0 lg:h-full lg:w-full"
          >
            <article
              class="prose prose-sm prose-invert w-full max-w-3xl px-8 py-6 text-justify xl:prose-base prose-h1:mb-1 prose-h1:mr-8 prose-h1:text-left prose-h1:text-base prose-p:my-4 prose-img:my-0 prose-hr:my-2 prose-hr:border-t-primary-gray md:prose-h1:text-xl md:prose-hr:my-4 lg:max-w-none 2xl:prose-h1:text-3xl"
            >
              <component :is="technologies[idInfoCardTech]?.cardComponent">
                <img
                  :src="technologies[idInfoCardTech]?.secondaryLogoPath ?? technologies[idInfoCardTech]?.logoPath"
                  :alt="technologies[idInfoCardTech].name + ' logo'"
                  class="m-0 h-8 md:h-10 2xl:h-12"
                />
              </component>
            </article>
            <button
              aria-description="Close modal window"
              id="close-modal"
              @click="isModalOpen = false"
              class="absolute right-4 top-4 h-10 cursor-pointer"
            >
              <img class="h-full w-full" src="/icons/close-white.svg" alt="Close icon" />
            </button>
          </div>
        </Motion>
      </Presence>
    </div>
  </section>
</template>
