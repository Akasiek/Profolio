<script setup lang="ts">
import type { IProject } from "@/helpers/interfaces";

defineProps<{
  project: IProject;
  bigPreview?: boolean;
}>();
</script>

<template>
  <!-- SMALL PREVIEW -->
  <template v-if="!bigPreview">
    <a
      :href="'/projects/' + project.id"
      class="group grid grid-cols-[40%_60%] items-center gap-3 md:grid-cols-[auto_70%] md:gap-4 lg:grid-cols-[auto_3fr] lg:gap-6"
    >
      <div
        class="h-full cursor-pointer overflow-hidden shadow-[0_0_0_#201E1F] transition-all duration-150 group-hover:shadow-[10px_10px_0_#201E1F] md:max-w-[16rem] lg:max-w-[14rem]"
      >
        <img :src="project.imagePath" :alt="project.name + ' project image'" class="h-full w-full object-cover object-center" />
      </div>
      <div>
        <h3 class="text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
          {{ project.name }}
        </h3>

        <p class="truncate-second-line max-w-xl text-xs text-primary-gray sm:text-sm lg:text-base">
          {{ project.description }}
        </p>

        <div class="mt-2 flex gap-2" v-if="project.technologies">
          <div
            v-for="(tech, index) in project.technologies.slice(0, 3)"
            :key="index"
            class="border-2 border-primary-gray px-1.5 py-0.5 text-xs text-primary-gray md:px-3 md:py-1 md:font-bold"
          >
            {{ tech.name }}
          </div>
        </div>
      </div>
    </a>
  </template>

  <!-- BIG PREVIEW -->
  <template v-if="bigPreview">
    <a :href="'/projects/' + project.id" class="cool-shadow group block h-full gap-6 border-2 border-primary-dark">
      <div class="h-36 w-full md:h-48 lg:h-64">
        <img :src="project.imagePath" :alt="project.name + ' project image'" class="h-full w-full object-cover object-center" />
      </div>
      <div class="px-4 py-4 md:py-5 lg:px-6 lg:py-8">
        <h3 class="mb-2 text-lg font-bold md:text-xl lg:text-2xl">
          {{ project.name }}
        </h3>
        <p class="max-lg:truncate-second-line text-sm text-primary-gray lg:text-base">{{ project.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2 lg:mt-6" v-if="project.technologies">
          <div
            v-for="(tech, index) in project.technologies"
            :key="index"
            class="border-2 border-primary-gray px-2 py-0.5 text-xs font-bold text-primary-gray md:px-3 md:py-1"
          >
            {{ tech.name }}
          </div>
        </div>
      </div>
    </a>
  </template>
</template>
