<script setup lang="ts"></script>

<template>
  <article class="prose prose-invert">
    <div class="flex items-center gap-4">
      <slot />
      <h1>Django - Cowboy of Backend</h1>
    </div>
    <p>Django was my first backend framework because I was learning Python back then and Django is one of the most popular Python libraries.</p>
    <hr />
    <p>
      I really like the simplicity of creating API and lack of boilerplate code. Also Django has many complementary libraries than can help to remove even more boilerplate. For
      example I used Django REST Framework that, as name suggests, helps with creating REST APIs in Django. It simple and fast.
    </p>
    <p>Of course Django has some drawbacks like speed, size of the files and Python semantics</p>
    <a href="/projects?tech=django" class="default-link-light">My projects that use Django</a>
  </article>
</template>
