<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ProjectCard from "@/components/slides/Project/ProjectCard.vue";
import { fetchProjects, fetchTechnologies } from "@/helpers/fetch";
import { setPage } from "@/helpers/helper";
import TopBar from "@/components/TopBar.vue";
import type { IProject } from "@/helpers/interfaces";
import ErrorComponent from "@/components/ErrorComponent.vue";
import Multiselect from "@vueform/multiselect";
import { useRoute } from "vue-router";

const projects = ref<IProject[]>([]);
const status = ref<number | null>(null);
const currentPage = ref<number>(1);
const selectedTechnologies = ref<string[]>([]);
const technologiesOptions = ref<string[]>([]);

const route = useRoute();

const pageSize = 8;

const setCurrentPage = (page: number) => {
  setPage(page);
  currentPage.value = page;
};

const getProjects = async () => {
  const page = currentPage.value;
  const offset = page * pageSize;

  fetchProjects({ lower: offset - pageSize, upper: offset - 1 }, selectedTechnologies.value).then((res) => {
    projects.value = [];

    res.data?.forEach((element) => {
      const { id, name, description, image_link, technologies } = element;
      projects.value.push({ id: parseInt(id), name, description, imagePath: image_link, technologies });
    });

    status.value = res.status;
  });
};

const getTechnologies = async () => {
  fetchTechnologies().then((res) => {
    technologiesOptions.value = res.data?.map((element) => element.name) ?? [];
  });
};

const setDefaultTechnologies = () => {
  const technologies = route.query.tech as string | undefined;
  if (technologies) {
    selectedTechnologies.value = technologies.split(",").map((tech) => tech.charAt(0).toUpperCase() + tech.slice(1));
  }
};

onMounted(() => {
  setDefaultTechnologies();

  getProjects();
  getTechnologies();
});

watch([currentPage, selectedTechnologies], () => {
  getProjects();
});
</script>

<template>
  <main class="min-h-screen bg-primary-light" v-if="status === 200 || status === null">
    <TopBar header-text="Projects" home-link="/#projects" />

    <div class="mx-auto mt-6 max-w-5xl px-4 pb-12 md:px-8 md:pb-16">
      <div class="flex items-center">
        <label for="sort" class="mr-2 md:mr-4">Filter by</label>
        <Multiselect
          id="sort"
          mode="tags"
          v-model="selectedTechnologies"
          :options="technologiesOptions"
          class="select-default"
          style="max-width: 14rem; margin: 0"
          :canClear="false"
        />
      </div>

      <section class="my-10 grid grid-cols-1 gap-8 md:my-12 md:grid-cols-2 md:gap-10">
        <template v-for="project in projects" :key="project.id">
          <ProjectCard :project="project" big-preview />
        </template>
      </section>

      <div class="flex gap-4">
        <button @click="setCurrentPage(currentPage - 1)" :disabled="currentPage === 1" class="btn-pagination">Previous Page</button>
        <button @click="setCurrentPage(currentPage + 1)" :disabled="projects.length < pageSize" class="btn-pagination">Next Page</button>
      </div>
    </div>
  </main>
  <ErrorComponent v-else secondary-text="Projects could not be fetched..." />
</template>
