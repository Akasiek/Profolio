import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectListView from '@/views/projects/ProjectListView.vue';
import BlogPostListView from '@/views/blog/BlogPostListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projectList',
      component: ProjectListView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPostListView,
    },
  ],
});

export default router;
