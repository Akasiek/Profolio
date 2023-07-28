<script setup lang="ts">
import type { IBlogPost } from "@/helpers/interfaces";

defineProps<{
  blogPost: IBlogPost;
  bigPreview?: boolean;
}>();
</script>

<template>
  <article class="cool-shadow group border-2 border-primary-dark">
    <a :href="`/blog/${blogPost.id}`" class="grid grid-cols-[35%_65%] items-center md:grid-cols-1">
      <div class="h-full w-full md:h-24 lg:h-32">
        <img :src="blogPost.imagePath" :alt="'Image of a blog post: ' + blogPost.title" class="h-full w-full object-cover object-center" />
      </div>
      <div class="px-3 py-2 md:px-4 md:py-3">
        <p class="text-xs text-primary-gray lg:mt-1">
          {{ blogPost.creationDate }}
        </p>
        <h3 class="text-base font-bold md:text-lg">
          {{ blogPost.title }}
        </h3>
        <p class="max-lg:truncate-second-line truncate-third-line text-xs text-primary-gray md:text-sm">
          {{ blogPost.description }}
        </p>
      </div>
    </a>
  </article>
</template>
