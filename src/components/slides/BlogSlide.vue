<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase';

const blogPosts = ref<{ id: number; title: string; description: string; imagePath: string; creationDate: string }[]>([]);
const status = ref<number>(0);

const getBlogPosts = async () => {
  let { data, status } = await supabase.from('BlogPosts').select(`id, title, description, image_link, creation_date`).order('creation_date', { ascending: false }).limit(4);

  return { data, status };
};

onMounted(() => {
  getBlogPosts().then((res) => {
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
  <section class="bg-primary-light text-primary-dark w-full h-screen flex flex-col justify-center px-24">
    <template v-if="status === 200 && Array.isArray(blogPosts) && blogPosts.length > 0">
      <h1 class="text-4xl font-bold uppercase mb-8">My Newest Blog Posts</h1>
      <section class="grid grid-cols-2 gap-8 max-w-4xl">
        <article v-for="(post, index) in blogPosts" :key="index" class="group cool-shadow border-2 border-primary-dark">
          <div class="w-full h-32">
            <img :src="post.imagePath" :alt="'Image of a blog post: ' + post.title" class="w-full h-full object-center object-cover" />
          </div>
          <div class="px-4 py-3">
            <p class="text-xs text-primary-gray mt-1">
              {{ post.creationDate }}
            </p>
            <h3 class="text-lg font-bold">
              {{ post.title }}
            </h3>
            <p class="text-sm text-primary-gray">
              {{ post.description }}
            </p>
          </div>
        </article>
      </section>
      <a href="/blog" class="btn-link text-lg font-bold py-4 px-5 mt-6">See all of my blog posts</a>
    </template>
    <div v-else>
      <h1 class="text-6xl font-bold text-primary-dark">Don't Panic!</h1>
      <p class="text-zinc-400 text-lg mb-4">Blog posts could not be fetched...</p>
    </div>
  </section>
</template>
