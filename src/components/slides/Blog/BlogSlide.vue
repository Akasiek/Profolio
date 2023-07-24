<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchBlogPosts } from '@/helpers/fetch';
import BlogPostCard from '@/components/slides/Blog/BlogPostCard.vue';
import type { IBlogPost } from '@/helpers/interfaces';

const blogPosts = ref<IBlogPost[]>([]);
const status = ref<number>(0);

onMounted(() => {
  fetchBlogPosts({ lower: 0, upper: 3 }).then((res) => {
    blogPosts.value = [];

    res.data?.forEach((element) => {
      blogPosts.value.push({
        id: parseInt(element.id),
        title: element.title,
        description: element.description,
        imagePath: element.image_link,
        creationDate: element.creation_date,
      });
    });

    status.value = res.status;
  });
});
</script>

<template>
  <section class="bg-primary-light text-primary-dark w-full h-screen flex flex-col justify-center px-24">
    <template v-if="status === 200 && Array.isArray(blogPosts) && blogPosts.length > 0">
      <h1 class="text-4xl font-bold uppercase mb-8">My Newest Blog Posts</h1>
      <section class="grid grid-cols-2 gap-8 max-w-4xl">
        <BlogPostCard v-for="(post, index) in blogPosts" :blog-post="post" :key="index" class="group cool-shadow border-2 border-primary-dark" />
      </section>
      <a href="/blog" class="btn-link text-lg font-bold py-4 px-5 mt-6">See all of my blog posts</a>
    </template>
    <div v-else>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="text-zinc-400 text-lg mb-4">Blog posts could not be fetched...</p>
    </div>
  </section>
</template>
