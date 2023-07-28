<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchBlogPosts } from "@/helpers/fetch";
import BlogPostCard from "@/components/slides/Blog/BlogPostCard.vue";
import type { IBlogPost } from "@/helpers/interfaces";

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
        creationDate: element.creation_date
      });
    });

    status.value = res.status;
  });
});
</script>

<template>
  <section
    class="flex h-screen w-screen flex-col justify-center overflow-hidden bg-primary-light px-4 text-primary-dark sm:px-6 md:px-12 2xl:px-24"
  >
    <template v-if="status === 200 && Array.isArray(blogPosts) && blogPosts.length > 0">
      <h1 class="slide-title mb-4 lg:mb-8">My Newest Blog Posts</h1>
      <section class="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
        <BlogPostCard
          v-for="(post, index) in blogPosts"
          :blog-post="post"
          :key="index"
          class="cool-shadow group border-2 border-primary-dark"
          :class="index === 3 ? 'hidden md:block' : ''"
        />
      </section>
      <a href="/blog" class="btn-link mt-6 font-bold">See all of my blog posts</a>
    </template>
    <div v-else>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="mb-4 text-lg text-zinc-400">Blog posts could not be fetched...</p>
    </div>
  </section>
</template>
