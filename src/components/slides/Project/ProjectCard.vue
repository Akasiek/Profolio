<script setup lang="ts">
defineProps<{
  project: {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    technologies: string[];
  };
  bigPreview?: boolean;
}>();
</script>

<template>
  <template v-if="!bigPreview">
    <a :href="'/projects/' + project.id" class="flex items-center gap-6 group">
      <div class="h-32 aspect-video overflow-hidden cursor-pointer shadow-[0_0_0_#201E1F] group-hover:shadow-[10px_10px_0_#201E1F] transition-all duration-150">
        <img :src="project.imagePath" :alt="project.name + ' project image'" class="object-cover object-center h-full w-full" />
      </div>
      <div>
        <h3 class="font-bold text-2xl">
          {{ project.name }}
        </h3>
        <p class="text-primary-gray text-base max-w-xl">{{ project.description }}</p>
        <div class="flex gap-2 mt-2">
          <div v-for="(tech, index) in project.technologies.slice(0, 3)" :key="index" class="text-xs font-bold border-2 border-primary-gray text-primary-gray py-1 px-3">
            {{ tech }}
          </div>
        </div>
      </div>
    </a>
  </template>
  <template v-if="bigPreview">
    <a :href="'/projects/' + project.id" class="border-2 border-primary-dark cool-shadow block gap-6 group h-full">
      <div class="w-full h-64"><img :src="project.imagePath" :alt="project.name + ' project image'" class="object-cover object-center h-full w-full" /></div>
      <div class="py-8 px-6">
        <h3 class="font-bold text-2xl">
          {{ project.name }}
        </h3>
        <p class="text-primary-gray text-base">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 mt-6">
          <div v-for="(tech, index) in project.technologies" :key="index" class="text-xs font-bold border-2 border-primary-gray text-primary-gray py-1 px-3">
            {{ tech }}
          </div>
        </div>
      </div>
    </a>
  </template>
</template>
