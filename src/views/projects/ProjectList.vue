<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ProjectCard from '@/components/slides/Project/ProjectCard.vue';
import { fetchProjects } from '@/helpers/fetch';
import { setPage } from '@/helpers/helper';
import TopBar from '@/components/TopBar.vue';
import type { IProject } from '@/helpers/interfaces';
import ErrorComponent from '@/components/ErrorComponent.vue';

const projects = ref<IProject[]>([]);
const status = ref<number | null>(null);
const currentPage = ref<number>(1);

const pageSize = 8;

const setCurrentPage = (page: number) => {
  setPage(page);
  currentPage.value = page;
};

const getProjects = async () => {
  const page = currentPage.value;
  const offset = page * pageSize;

  fetchProjects({ lower: offset - pageSize, upper: offset - 1 }).then((res) => {
    projects.value = [];

    res.data?.forEach((element) => {
      const { id, name, description, image_link, technologies } = element;
      projects.value.push({ id: parseInt(id), name, description, imagePath: image_link, technologies });
    });

    status.value = res.status;
  });
};

onMounted(() => {
  getProjects();
});

watch(currentPage, () => {
  getProjects();
});
</script>

<template>
  <main class="bg-primary-light min-h-screen" v-if="status === 200 || status === null">
    <TopBar header-text="Projects" home-link="/#projects" />

    <div class="max-w-5xl mx-auto pb-16 px-6 md:px-8">
      <section class="my-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <template v-for="project in projects" :key="project.id">
          <ProjectCard :project="project" big-preview />
        </template>
      </section>

      <div class="flex gap-4">
        <button @click="setCurrentPage(currentPage - 1)" :disabled="currentPage === 1" class="btn-link font-bold py-3 px-5 text-sm sm:text-base">Previous Page</button>
        <button @click="setCurrentPage(currentPage + 1)" :disabled="projects.length < pageSize" class="btn-link font-bold py-3 px-5 text-sm sm:text-base">Next Page</button>
      </div>
    </div>
  </main>
  <ErrorComponent v-else secondary-text="Projects could not be fetched..." />
</template>
