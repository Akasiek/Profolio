<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProjectCard from '@/components/slides/Project/ProjectCard.vue';
import { fetchProjects } from '@/helpers/fetch';
import type { IProject } from '@/helpers/interfaces';

const projects = ref<IProject[]>([]);
const status = ref<number>(0);

onMounted(() => {
  fetchProjects({ lower: 0, upper: 2 }).then((res) => {
    projects.value = [];

    res.data?.forEach((element) => {
      const { id, name, description, image_link, technologies } = element;
      projects.value.push({ id: parseInt(id), name, description, imagePath: image_link, technologies });
    });

    status.value = res.status;
  });
});
</script>

<template>
  <section class="bg-primary-light text-primary-dark w-full h-full flex flex-col justify-center px-24">
    <template v-if="status === 200 && Array.isArray(projects) && projects.length > 0">
      <h1 class="text-4xl font-bold uppercase mb-8">My Latest Three Projects</h1>
      <section class="space-y-10">
        <template v-for="(project, index) in projects" :key="index">
          <ProjectCard :project="project" />
        </template>
      </section>
      <a href="/projects" class="btn-link text-lg font-bold py-4 px-5 mt-12">See all of my projects</a>
    </template>
    <div v-else>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="text-zinc-400 text-lg mb-4">Projects could not be fetched...</p>
    </div>
  </section>
</template>
