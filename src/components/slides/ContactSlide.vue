<script setup lang="ts">
const links = [
  {
    iconPath: "/icons/contact/mail.svg",
    iconAlt: "Mail icon",
    url: "mailto:kamil@kamilpomykala.dev",
    title: "Send me an email",
    subtitle: "kamil@kamilpomykala.dev",
    noBlank: true
  },
  {
    iconPath: "/icons/contact/discord.svg",
    iconAlt: "Discord logo",
    url: "https://discordapp.com/users/202501503280349184",
    title: "DM me on Discord",
    subtitle: "@akasiek"
  },
  {
    iconPath: "/icons/about/linkedin.svg",
    iconAlt: "LinkedIn logo",
    url: "https://www.linkedin.com/in/kamil-pomykala/",
    title: "Connect with me on LinkedIn",
    subtitle: "Kamil Pomykała",
    span: 2
  }
];
</script>

<template>
  <section class="flex h-full w-full flex-col justify-center bg-primary-light px-4 text-primary-dark sm:px-6 md:px-12 2xl:px-24">
    <div class="mx-auto lg:mx-0">
      <div class="mb-4 w-full max-w-5xl lg:mb-6">
        <h1 class="slide-title mb-0">Easiest ways of contacting me</h1>
        <p class="text-xs text-primary-gray lg:mt-1">Yes, there are only 3 options.</p>
      </div>
      <div class="grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.url"
          class="btn-link flex w-full items-center gap-3 px-5 py-4 md:gap-5 md:px-6 md:py-5"
          :class="link.span && 'md:col-span-2'"
          :target="link.noBlank ? '_self' : '_blank'"
        >
          <img :src="link.iconPath" :alt="link.iconAlt" class="h-6 md:h-8" />
          <div>
            <p class="text-base font-bold sm:text-lg md:text-xl">{{ link.title }}</p>
            <p class="break-all text-xs text-primary-gray md:text-sm">{{ link.subtitle }}</p>
          </div>
        </a>
      </div>
      <div>
        <p class="mt-3 text-xs text-zinc-500 md:mt-4">Kamil Pomykała Profolio - Copyright &copy; 2023 - 2024 | All Rights Reserved</p>
      </div>
    </div>
  </section>
</template>
