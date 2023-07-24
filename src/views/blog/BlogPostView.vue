<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Presence } from 'motion/vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';

import { fetchBlogPost } from '@/helpers/fetch';
import type { IBlogPost } from '@/helpers/interfaces';
import TopBar from '@/components/TopBar.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';

const route = useRoute();

const blogPost = ref<IBlogPost | null>(null);
const status = ref<number | null>(null);

const getBlogPost = () => {
  fetchBlogPost(route.params.id.toString()).then((res) => {
    status.value = res.status;

    if (!res.data || res.data.length === 0) {
      return;
    }

    const { id, title, description, creation_date, image_link, content } = res.data[0];
    blogPost.value = {
      id,
      title,
      description,
      creationDate: creation_date,
      imagePath: image_link,
      content,
    };
  });
};

onMounted(() => {
  getBlogPost();
});

watch(route, () => {
  getBlogPost();
});
</script>

<template>
  <Presence>
    <main v-if="status === 200 && blogPost" class="bg-primary-light min-h-screen pb-12">
      <TopBar header-text="Blog posts" home-link="/#blog" />

      <section class="h-[40vh] w-full">
        <img :src="blogPost.imagePath" alt="" class="object-center object-cover w-full h-full" />
      </section>

      <article class="max-w-5xl mx-auto px-6 md:px-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mt-8 mb-4">
          {{ blogPost.title }}
        </h1>

        <p class="text-zinc-400 text-lg mb-4">{{ blogPost.description }}</p>

        <p class="text-zinc-400 text-lg mb-4">
          {{ new Date(blogPost.creationDate).toLocaleDateString() }}
        </p>

        <hr class="border-zinc-400 border-0 border-t-2 mb-8" />

        <div v-if="blogPost.content" class="prose max-w-none text-justify prose-hr:mt-4 prose-hr:mb-4 mb-12" v-html="marked.parse(blogPost.content)"></div>
      </article>
    </main>
    <LoadingIndicator v-else-if="status === null && blogPost === null" />
    <ErrorComponent v-else secondaryText="Blog post could not been found..." />
  </Presence>
</template>
