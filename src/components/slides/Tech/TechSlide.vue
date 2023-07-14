<script setup lang="ts">
import type { Component } from 'vue';
import { ref } from 'vue';
import * as Card from './techInfoCards';
import { Motion, Presence } from 'motion/vue';

const technologies: { name: string; logoPath: string; secondaryLogoPath?: string; cardComponent?: Component; span?: '2x' | '2y' }[] = [
  {
    name: 'Yii',
    logoPath: '/images/technologies/yii.svg',
    span: '2x',
    cardComponent: Card.YiiCard
  },
  {
    name: 'React',
    logoPath: '/images/technologies/react.svg',
    cardComponent: Card.ReactCard
  },
  { name: 'Astro', logoPath: '/images/technologies/astro-dark.svg', secondaryLogoPath: '/images/technologies/astro.svg', cardComponent: Card.AstroCard },
  {
    name: 'Vue',
    logoPath: '/images/technologies/vue.svg',
    span: '2y',
    cardComponent: Card.VueCard
  },
  {
    name: 'Tailwind',
    logoPath: '/images/technologies/tailwind.svg',
    cardComponent: Card.TailwindCard
  },
  {
    name: 'Django',
    logoPath: '/images/technologies/django.svg',
    cardComponent: Card.DjangoCard
  },
  {
    name: 'Typescript',
    logoPath: '/images/technologies/typescript.svg',
    cardComponent: Card.TypescriptCard
  }
];

const idInfoCardTech = ref<number | null>(null);
const isModalOpened = ref<boolean>(false);
</script>

<template>
  <section class="bg-primary-light w-full h-full flex flex-col justify-center px-12">
    <div class="max-w-4xl mx-auto w-full items-end mb-4">
      <h1 class="text-4xl font-bold text-primary-dark uppercase">My Beloved Technologies</h1>
      <p class="text-xs text-zinc-500 mt-1">click for some cool info O_O</p>
    </div>
    <div class="relative grid w-full max-w-4xl grid-cols-3 gap-10 mx-auto">
      <div
        v-for="(tech, index) in technologies"
        :key="tech.name"
        class="flex items-center justify-center px-4 py-7 border-4 border-primary-dark group cursor-pointer shadow-[0_0_0_#201E1F] hover:shadow-[10px_10px_0_#201E1F] transition-all duration-150"
        :class="tech?.span === '2x' ? 'col-span-2' : '' || tech?.span === '2y' ? 'row-span-2' : ''"
        @click="
          () => {
            idInfoCardTech = index;
            isModalOpened = true;
          }
        "
        :aria-description="'Click to open modal with more info about ' + tech.name"
      >
        <div class="my-auto flex items-center gap-6 text-primary-dark font-bold text-lg">
          <p class="text-lg">{{ tech.name }}</p>
          <img :src="tech.logoPath" class="h-12 transition-all" :alt="tech.name + ' logo'" />
        </div>
      </div>
      <Presence>
        <Motion
          id="tech-info-modal"
          :initial="{ opacity: 0, scale: 0.4 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.6 }"
          class="absolute inset-0 bg-primary-dark h-full min-h-fit"
          v-if="isModalOpened && idInfoCardTech !== null"
        >
          <article class="prose prose-invert py-6 px-8 text-justify max-w-3xl prose-hr:my-4 prose-hr:border-t-primary-gray prose-p:my-4 prose-h1:mb-1 prose-h1:text-3xl">
            <component :is="technologies[idInfoCardTech]?.cardComponent">
              <img
                :src="technologies[idInfoCardTech]?.secondaryLogoPath ?? technologies[idInfoCardTech]?.logoPath"
                :alt="technologies[idInfoCardTech].name + ' logo'"
                class="h-12 m-0"
              />
            </component>
          </article>
          <button aria-description="Close modal window" id="close-modal" @click="isModalOpened = false" class="absolute top-4 right-4 cursor-pointer h-10">
            <img class="h-full w-full" src="/icons/close-white.svg" alt="Close icon" />
          </button>
        </Motion>
      </Presence>
    </div>
  </section>
</template>
