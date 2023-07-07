<script setup lang="ts"></script>

<template>
  <div class="flex items-center gap-4">
    <slot />
    <h1>Astro - The King Of Static</h1>
  </div>
  <p>It was the love at first sign with Astro and I... Well... I don't know if it loves me but I love it!</p>
  <hr />
  <p>
    Astro is a build tool for modern static web apps. It new but it already has many features that I love. For example - on default it uses its own templating language which is
    similar to HTML but you can also create components from other frameworks (React, Vue, Svelte, etc.) and use them in Astro. It also has a built-in support for TypeScript.
  </p>
  <a href="/projects?tech=astro" class="default-link-light">My projects that use Astro</a>
</template>
