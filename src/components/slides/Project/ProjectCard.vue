<script setup lang="ts">
defineProps<{
  project: {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    technologies: string[];
  };
}>();
</script>

<template>
  <a :href="'/project/' + project.id" class="flex items-center gap-6 group">
    <div class="h-32 aspect-video overflow-hidden cursor-pointer shadow-[0_0_0_#201E1F] group-hover:shadow-[10px_10px_0_#201E1F] transition-all duration-150">
      <img :src="project.imagePath" :alt="project.name + ' project image'" class="object-cover object-center h-full w-full" />
    </div>
    <div>
      <h3 class="font-bold text-2xl">
        {{ project.name }}
      </h3>
      <p class="text-primary-gray text-base max-w-xl">{{ project.description }}</p>
      <div class="flex gap-2 mt-2">
        <div v-for="(tech, index) in project.technologies" :key="index" class="text-xs font-bold border-2 border-primary-gray text-primary-gray py-1 px-3">
          {{ tech }}
        </div>
      </div>
    </div>
  </a>
</template>
