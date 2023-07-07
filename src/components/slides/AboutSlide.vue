<script setup lang="ts">
const links = [
  { label: 'Github', url: '', description: 'a code hosting platform for version control and collaboration' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kamil-pomykala/', description: 'a business and employment-oriented online service' },
  { label: 'Mastodon', url: 'https://metalhead.club/@Akasiek', description: 'a free and open-source self-hosted social networking service' },
  { label: 'Letterboxd', url: 'https://letterboxd.com/Akasiek/', description: 'a social networking service for sharing and discussing films' },
  { label: 'Literal.club', url: 'https://literal.club/akasiek', description: 'a social networking service for sharing and discussing books' }
];
</script>

<template>
  <section class="bg-primary-light w-full h-full flex flex-col justify-center px-24">
    <div class="max-w-3xl">
      <h1 class="text-4xl font-bold mb-4 text-primary-dark uppercase">Something about me</h1>
      <div class="flex flex-col gap-5 text-primary-gray text-lg">
        <p>Like I said my name's Kamil, I'm 21 years old. I'm a <b>Junior Full Stuck Developer</b> located in Rzeszów, Poland.</p>
        <p>I started my coding adventure ️in Middle School. First it was <i>Scratch, C++, HTML</i> and then it just went on...</p>
        <p>
          Music is a big part of me. I worship Rock music and in particular the genres of <b>Progressive Rock</b> and <b>Post-Rock</b>.
          <a href="https://www.last.fm/pl/user/Akasiek" target="_blank" class="default-link">Here</a> you can check what I'm currently listening to.
        </p>
        <div>
          <p>Finding me on other socials is easy. Just look here:</p>
          <ul class="ml-2 mt-2 list-disc list-inside">
            <li v-for="(link, index) in links" :key="index" class="space-x-2">
              <a :href="link.url" target="_blank" class="default-link lowercase">{{ link.label }}</a>
              <span class="text-xs">{{ link.description }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
