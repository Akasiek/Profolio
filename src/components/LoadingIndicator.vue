<script setup lang="ts">
import { Motion } from 'motion/vue';

/**
 * When used, loading indicator component and other components should be wrapped in a <Presence> component.
 */
</script>

<template>
  <Motion
    id="loading-indicator"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1, transition: { duration: 1 } }"
    :exit="{ opacity: 0, transition: { duration: 1 } }"
    class="fixed inset-0 flex items-center justify-center"
  >
    <img class="h-64" src="/rings.svg" alt="" />
  </Motion>
</template>
