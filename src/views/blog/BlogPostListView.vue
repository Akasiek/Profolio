<script setup lang="ts">
import SecondaryTopBar from '@/components/SecondaryTopBar.vue';
import { onMounted, ref, watch } from 'vue';
import { setPage } from '@/helpers/helper';
import { fetchBlogPosts } from '@/helpers/fetch';
import BlogPostCard from '@/components/slides/Blog/BlogPostCard.vue';

const blogPosts = ref<{ id: number; title: string; description: string; imagePath: string; creationDate: string }[]>([]);
const status = ref<number | null>(null);
const currentPage = ref<number>(1);

const pageSize = 8;

const setCurrentPage = (page: number) => {
  setPage(page);
  currentPage.value = page;
};

const getBlogPosts = () => {
  const page = currentPage.value;
  const offset = page * pageSize;

  fetchBlogPosts({ lower: offset - pageSize, upper: offset - 1 }).then((res) => {
    blogPosts.value = [];

    res.data?.forEach((element) => {
      const { id, title, description, image_link, creation_date } = element;
      blogPosts.value.push({
        id: parseInt(id),
        title,
        description,
        imagePath: image_link,
        creationDate: creation_date,
      });
    });

    status.value = res.status;
  });
};

onMounted(() => {
  getBlogPosts();
});

watch(currentPage, () => {
  getBlogPosts();
});
</script>

<template>
  <main class="bg-primary-light min-h-screen" v-if="status === 200 || status === null">
    <SecondaryTopBar header-text="Blog posts" home-link="/#blog" />

    <div class="max-w-5xl mx-auto pb-16 px-6 md:px-8">
      <section class="my-12 grid grid-cols-1 lg:grid-cols-2 gap-10"><BlogPostCard v-for="post in blogPosts" :key="post.id" :blog-post="post" /></section>

      <div class="flex gap-4">
        <button @click="setCurrentPage(currentPage - 1)" :disabled="currentPage === 1" class="btn-link font-bold py-3 px-5 text-sm sm:text-base">Previous Page</button>
        <button @click="setCurrentPage(currentPage + 1)" :disabled="blogPosts.length < pageSize" class="btn-link font-bold py-3 px-5 text-sm sm:text-base">Next Page</button>
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
