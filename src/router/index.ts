import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectList from '@/views/projects/ProjectList.vue';
import { BlogPostList, BlogPostView } from '@/views/blog';
import ErrorView from '@/views/ErrorView.vue';
import ProjectView from '@/views/projects/ProjectView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectList,
    },
    {
      path: '/projects/:id',
      name: 'Project',
      component: ProjectView,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: BlogPostList,
    },
    {
      path: '/blog/:id',
      name: 'Blog Post',
      component: BlogPostView,
    },
    // Catch all other routes
    {
      path: '/:pathMatch(.*)*',
      component: ErrorView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `Kamil Pomykała | Profolio`;

  if (['Blog Post', 'Projects', 'Blog'].includes(String(to.name))) {
    document.title = `Kamil Pomykała | Profolio - ${String(to.name)}`;
  }

  next();
});

export default router;
