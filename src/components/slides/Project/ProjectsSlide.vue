<script setup lang="ts">
import { onMounted, ref } from "vue";
import ProjectCard from "@/components/slides/Project/ProjectCard.vue";
import { fetchProjects } from "@/helpers/fetch";
import type { IProject } from "@/helpers/interfaces";

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
  <section class="flex h-screen w-screen flex-col justify-center bg-primary-light px-4 text-primary-dark sm:px-6 md:px-12 2xl:px-24">
    <template v-if="status === 200 && Array.isArray(projects) && projects.length > 0">
      <h1 class="slide-title mb-4 lg:mb-8">My Latest Three Projects</h1>
      <section class="space-y-4 md:space-y-8 lg:space-y-10">
        <template v-for="(project, index) in projects" :key="index">
          <ProjectCard :project="project" />
        </template>
      </section>
      <a href="/projects" class="btn-link mt-6 font-bold md:mt-10 lg:mt-12"> See all of my projects </a>
    </template>
    <div v-else>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="mb-4 text-lg text-zinc-400">Projects could not be fetched...</p>
    </div>
  </section>
</template>
