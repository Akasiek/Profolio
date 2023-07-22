<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ProjectCard from '@/components/slides/Project/ProjectCard.vue';
import { fetchProjects } from '@/helpers/fetch';
import { setPage } from '@/helpers/helper';
import SecondaryTopBar from '@/components/SecondaryTopBar.vue';

const projects = ref<{ id: number; name: string; description: string; imagePath: string; technologies: string[] }[]>([]);
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
    <SecondaryTopBar header-text="My projects" home-link="/#projects" />

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
  <main v-else class="bg-primary-light h-screen w-screen flex items-center justify-center">
    <div>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="text-zinc-400 text-lg mb-4">Projects could not be fetched...</p>
      <a href="/" class="btn-link py-2 font-bold w-full text-center block"> Go back to safety </a>
    </div>
  </main>
</template>
