<script setup lang="ts">
defineProps<{
  blogPost: {
    id: number;
    title: string;
    description: string;
    imagePath: string;
    creationDate: string;
  };
  bigPreview?: boolean;
}>();
</script>

<template>
  <article class="group cool-shadow border-2 border-primary-dark">
    <a :href="`/blog/${blogPost.id}`">
      <div class="w-full h-32">
        <img :src="blogPost.imagePath" :alt="'Image of a blog post: ' + blogPost.title" class="w-full h-full object-center object-cover" />
      </div>
      <div class="px-4 py-3">
        <p class="text-xs text-primary-gray mt-1">
          {{ blogPost.creationDate }}
        </p>
        <h3 class="text-lg font-bold">
          {{ blogPost.title }}
        </h3>
        <p class="text-sm text-primary-gray">
          {{ blogPost.description }}
        </p>
      </div>
    </a>
  </article>
</template>
