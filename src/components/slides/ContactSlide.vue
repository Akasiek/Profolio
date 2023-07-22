<script setup lang="ts">
const links = [
  {
    iconPath: '/icons/contact/mail.svg',
    iconAlt: 'Mail icon',
    url: 'mailto:kpomykala2002@gmail.com',
    title: 'Send me an email',
    subtitle: 'kpomykala2002@gmail.com',
    noBlank: true,
  },
  {
    iconPath: '/icons/contact/discord.svg',
    iconAlt: 'Discord logo',
    url: 'https://discordapp.com/users/202501503280349184',
    title: 'DM me on Discord',
    subtitle: '@akasiek',
  },
  {
    iconPath: '/icons/about/linkedin.svg',
    iconAlt: 'LinkedIn logo',
    url: 'https://www.linkedin.com/in/kamil-pomykala/',
    title: 'Connect with me on LinkedIn',
    subtitle: 'Kamil Pomykała',
    span: 2,
  },
];
</script>

<template>
  <section class="bg-primary-light text-primary-dark w-full h-full flex flex-col justify-center px-24">
    <div class="max-w-4xl w-full mb-8">
      <h1 class="text-4xl font-bold text-primary-dark uppercase">Easiest ways of contacting me</h1>
      <p class="text-xs text-primary-gray mt-1">Yes, there are only 3 options.</p>
    </div>
    <div class="grid grid-cols-2 max-w-2xl gap-8">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.url"
        class="w-full btn-link py-5 px-6 flex items-center gap-5"
        :class="link.span && 'col-span-2'"
        :target="link.noBlank ? '_self' : '_blank'"
      >
        <img :src="link.iconPath" :alt="link.iconAlt" class="h-8" />
        <div>
          <p class="text-xl font-bold">{{ link.title }}</p>
          <p class="text-sm text-primary-gray break-all">{{ link.subtitle }}</p>
        </div>
      </a>
    </div>
    <div>
      <p class="text-xs text-zinc-500 mt-4">Kamil Pomykała Profolio - Copyright &copy; 2023 | All Rights Reserved</p>
    </div>
  </section>
</template>
