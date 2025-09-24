import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'
import BlogsView from "../views/Blogs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
