<script setup lang="ts">
defineProps<{
  link: {
    label: string;
    url: string;
    description: string;
    iconPath: string;
    tagOnTheLeft?: boolean;
  };
}>();
</script>

<template>
  <div class="border-2 border-primary-dark w-fit aspect-square relative icon-container">
    <a :href="link.url" target="_blank" class="block p-2 sm:p-3 lg:p-4">
      <img :src="link.iconPath" :alt="`${link.label} icon`" class="h-5 sm:h-6 lg:h-8" />
    </a>
    <div class="hidden lg:block absolute inset-x-0 -inset-y-[2px] z-20" :class="link.tagOnTheLeft ? 'clip-path-right' : 'clip-path-left'">
      <div
        class="absolute bg-primary-dark flex flex-col justify-center px-3 text-primary-light inset-y-0 transition duration-300 ease-in-out"
        :class="link.tagOnTheLeft ? 'right-[100%] translate-x-full' : 'left-[100%] -translate-x-full'"
      >
        <h3 class="text-sm sm:text-base lg:text-lg font-bold">{{ link.label }}</h3>
        <p class="text-xs text-secondary-light whitespace-nowrap">{{ link.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clip-path-left {
  clip-path: inset(0 -100vw 0 100%);
}

.clip-path-right {
  clip-path: inset(0 100% 0 -100vw);
}

.icon-container > a:hover + .clip-path-left > div,
.icon-container > a:hover + .clip-path-right > div {
  transform: translateX(0);
}
</style>
