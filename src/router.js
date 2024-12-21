import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Channel from '@/views/Channel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/channel/@:id',
    name: 'Channel',
    component: Channel,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    beforeEnter() {
      window.location.href = 'https://tgstat.ru/';
  },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
