<script setup lang="ts">
import { supabase } from '@/supabase';
import { onMounted, ref } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';

const projects = ref<{ id: number; name: string; description: string; imagePath: string; technologies: string[] }[]>([]);
const status = ref<number>(0);

const getProjects = async () => {
  let { data, status } = await supabase.from('Projects').select(`id, name, description, image_link, technologies`).order('creation_date', { ascending: false }).limit(3);

  return { data, status };
};

onMounted(() => {
  getProjects().then((res) => {
    res.data?.forEach((element) => {
      projects.value.push({ id: parseInt(element.id), name: element.name, description: element.description, imagePath: element.image_link, technologies: element.technologies });
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
      <a href="/project" class="btn-link text-lg font-bold py-4 px-5 mt-12">See all of my projects</a>
    </template>
    <div v-else>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="text-zinc-400 text-lg mb-4">Projects could not be fetched...</p>
    </div>
  </section>
</template>
