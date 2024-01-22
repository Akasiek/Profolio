<script setup lang="ts">
import { RouterView } from 'vue-router';
import { inject } from '@vercel/analytics';

inject();

</script>

<template>
  <RouterView />
</template>
