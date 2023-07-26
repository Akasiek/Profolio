<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Presence } from "motion/vue";
import { marked } from "marked";

import TopBar from "@/components/TopBar.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import { fetchProject } from "@/helpers/fetch";
import type { IProject } from "@/helpers/interfaces";

const route = useRoute();

const project = ref<IProject | null>(null);
const status = ref<number | null>(null);

const getProject = () => {
  fetchProject(route.params.id.toString()).then((res) => {
    status.value = res.status;

    if (!res.data || res.data.length === 0) {
      return;
    }

    const { id, name, description, image_link, technologies, content, github_link } = res.data[0];
    project.value = {
      id,
      name,
      description,
      imagePath: image_link,
      technologies,
      content,
      githubLink: github_link
    };
  });
};

onMounted(() => {
  getProject();
});

watch(route, () => {
  getProject();
});
</script>

<template>
  <Presence>
    <main v-if="status === 200 && project" class="bg-primary-light min-h-screen pb-12">
      <TopBar header-text="Projects" home-link="/#projects" />

      <section class="h-[40vh] w-full">
        <img :src="project.imagePath" alt="" class="object-center object-cover w-full h-full" />
      </section>

      <article class="max-w-5xl mx-auto px-6 md:px-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mt-8 mb-4">
          {{ project.name }}
        </h1>

        <p class="text-zinc-400 text-lg mb-4">{{ project.description }}</p>

        <div class="flex gap-6 flex-wrap items-center justify-between">
          <div class="flex flex-wrap gap-3 items-center">
            Technologies used:
            <div class="flex flex-wrap gap-3 items-center">
              <span
                v-for="(tech, index) in project.technologies"
                :key="index"
                class="text-xs font-bold border-2 border-primary-gray text-primary-gray py-1 px-3"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>
          <a :href="project.githubLink" target="_blank" class="text-lg btn-link py-2 px-4"> View on GitHub </a>
        </div>

        <hr class="border-zinc-400 border-0 border-t-2 mb-8 mt-8" />

        <div
          v-if="project.content"
          class="prose max-w-none text-justify prose-hr:mt-4 prose-hr:mb-4 mb-12"
          v-html="marked.parse(project.content)"
        ></div>
      </article>
    </main>
    <LoadingIndicator v-else-if="status === null && project === null" />
    <ErrorComponent v-else secondaryText="Project could not been found..." />
  </Presence>
</template>

<style scoped></style>
