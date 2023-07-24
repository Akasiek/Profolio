import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectList from '@/views/projects/ProjectList.vue';
import { BlogPostList, BlogPostView } from '@/views/blog';

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
      component: ProjectList,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPostList,
    },
    {
      path: '/blog/:id',
      name: 'blogPost',
      component: BlogPostView,
    },
  ],
});

export default router;
