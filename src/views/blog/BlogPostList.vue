<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import { onMounted, ref, watch } from "vue";
import { setPage } from "@/helpers/helper";
import { fetchBlogPosts } from "@/helpers/fetch";
import BlogPostCard from "@/components/slides/Blog/BlogPostCard.vue";
import type { IBlogPost } from "@/helpers/interfaces";
import ErrorComponent from "@/components/ErrorComponent.vue";
import Multiselect from "@vueform/multiselect";

const blogPosts = ref<IBlogPost[]>([]);
const status = ref<number | null>(null);
const currentPage = ref<number>(1);
const selectedSort = ref<"newest" | "oldest">("newest");

const sortOptions = {
  newest: "Newest",
  oldest: "Oldest"
};
const pageSize = 8;

const setCurrentPage = (page: number) => {
  setPage(page);
  currentPage.value = page;
};

const getBlogPosts = () => {
  const page = currentPage.value;
  const offset = page * pageSize;

  fetchBlogPosts({ lower: offset - pageSize, upper: offset - 1 }, selectedSort.value).then((res) => {
    blogPosts.value = [];

    res.data?.forEach((element) => {
      const { id, title, description, image_link, creation_date } = element;
      blogPosts.value.push({
        id: parseInt(id),
        title,
        description,
        imagePath: image_link,
        creationDate: creation_date
      });
    });

    status.value = res.status;
  });
};

onMounted(() => {
  getBlogPosts();
});

watch([currentPage, selectedSort], () => {
  getBlogPosts();
});
</script>

<template>
  <main class="min-h-screen bg-primary-light" v-if="status === 200 || status === null">
    <TopBar header-text="Blog posts" home-link="/#blog" />

    <div class="mx-auto mt-6 max-w-5xl px-4 pb-12 md:px-8 md:pb-16">
      <div class="flex items-center">
        <label for="sort" class="mr-2 md:mr-4">Sort by</label>
        <Multiselect
          id="sort"
          v-model="selectedSort"
          :options="sortOptions"
          class="select-default"
          style="width: 10rem; margin: 0"
          :canClear="false"
        />
      </div>

      <section class="my-10 grid grid-cols-1 gap-8 md:my-12 md:grid-cols-2 lg:gap-10">
        <BlogPostCard v-for="post in blogPosts" :key="post.id" :blog-post="post" />
      </section>

      <div class="flex gap-4">
        <button @click="setCurrentPage(currentPage - 1)" :disabled="currentPage === 1" class="btn-pagination">Previous Page</button>
        <button @click="setCurrentPage(currentPage + 1)" :disabled="blogPosts.length < pageSize" class="btn-pagination">Next Page</button>
      </div>
    </div>
  </main>
  <ErrorComponent v-else secondary-text="Blog posts could not be fetched..." />
</template>

<style></style>
