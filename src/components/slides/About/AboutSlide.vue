<script setup lang="ts">
import AboutLink from './AboutLink.vue';

const links = [
  {
    label: "Github",
    url: "https://github.com/Akasiek",
    description: "a code hosting platform for version control and collaboration",
    iconPath: "/icons/about/github.svg"
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/kamil-pomykala/",
    description: "a business and employment-oriented online service",
    iconPath: "/icons/about/linkedin.svg"
  },
  {
    label: "Mastodon",
    url: "https://metalhead.club/@Akasiek",
    description: "a free and open-source self-hosted social networking service",
    iconPath: "/icons/about/mastodon.svg"
  },
  {
    label: "Letterboxd",
    url: "https://letterboxd.com/Akasiek/",
    description: "a social networking service for sharing and discussing films",
    iconPath: "/icons/about/letterboxd.svg"
  },
  {
    label: "Literal.club",
    url: "https://literal.club/akasiek",
    description: "a social networking service for sharing and discussing books",
    iconPath: "/icons/about/literal-club.svg"
  }
];

// Calculate my age based on my birthdate - 2002-06-17
const currentDate = new Date();
let calculatedAge = currentDate.getFullYear() - 2002;

if (currentDate.getMonth() < 5 || (currentDate.getMonth() === 5 && currentDate.getDate() < 17)) {
  calculatedAge--;
}

</script>

<template>
  <section class="bg-primary-light w-screen h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 2xl:px-24">
    <div class="max-w-3xl">
      <h1 class="slide-title">Something about me</h1>
      <div class="flex flex-col gap-3 lg:gap-5 text-primary-gray text-base lg:text-lg">
        <p>Like I said my name's Kamil, I'm {{ calculatedAge }} years old. I'm a <b>Junior Full Stack Developer</b> located in Rzeszów, Poland.</p>
        <p>I started my coding adventure ️in Middle School. First it was <i>Scratch, C++, HTML</i> and then it just went on...</p>
        <p>
          Music is a big part of me. I worship Rock music and in particular the genres of <b>Progressive Rock</b> and <b>Post-Rock</b>.
          <a href="https://www.last.fm/pl/user/Akasiek" target="_blank" class="default-link">Here</a> you can check what I'm currently
          listening to.
        </p>
        <div>
          <p>Finding me on other socials is easy. Just look here:</p>
          <section class="flex gap-4 sm:gap-6 lg:gap-10 grid-cols-5 w-full mt-4">
            <template v-for="(link, index) in links" :key="index">
              <AboutLink :link="link" />
            </template>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
