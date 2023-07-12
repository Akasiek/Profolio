<script setup lang="ts">
const dummyBlog = [
  {
    title: 'First Dummy Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam beatae dolorem.',
    publicationDate: '2023-04-20',
    imagePath: '/images/blog/dummy_image.jpg'
  },
  {
    title: 'Second Dummy Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam beatae dolorem.',
    publicationDate: '2023-03-14',
    imagePath: '/images/blog/dummy_image.jpg'
  },
  {
    title: 'Third Dummy Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam beatae dolorem.',
    publicationDate: '2023-02-30',
    imagePath: '/images/blog/dummy_image.jpg'
  },
  {
    title: 'Fourth Dummy Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aperiam beatae dolorem.',
    publicationDate: '2022-12-20',
    imagePath: '/images/blog/dummy_image.jpg'
  }
];
</script>

<template>
  <section class="bg-primary-light text-primary-dark w-full h-full flex flex-col justify-center px-24">
    <h1 class="text-4xl font-bold uppercase mb-8">My Newest Blog Posts</h1>
    <section class="grid grid-cols-2 gap-y-8 gap-x-8 max-w-4xl">
      <article v-for="(post, index) in dummyBlog" :key="index" class="group cool-shadow border-2 border-primary-dark">
        <div class="w-full h-44">
          <img :src="post.imagePath" :alt="'Image of a blog post: ' + post.title" class="w-full h-full object-center object-cover" />
        </div>
        <div class="px-4 py-3">
          <p class="text-xs text-primary-gray mt-1">
            {{ post.publicationDate }}
          </p>
          <h3 class="font-bold">
            {{ post.title }}
          </h3>
          <p class="text-sm text-primary-gray">
            {{ post.description }}
          </p>
        </div>
      </article>
    </section>
  </section>
</template>
