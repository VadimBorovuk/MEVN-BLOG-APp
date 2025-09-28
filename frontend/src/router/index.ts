import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '../views/Login.vue'
import BlogsView from "../views/Blogs.vue";
import ProfileView from "../views/Profile.vue";
import BlogsInfoView from "../views/BlogsInfo.vue";
import {useAuthStore} from "../stores/authStore.ts";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BlogsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/blogs/:id',
    name: 'blogs id',
    component: BlogsInfoView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // перевіряємо чи користувач вже авторизований
  if (!authStore.isChecked) {
    await authStore.checkAuth();
  }

  if (to.meta.requiresAuth && !authStore.authUser) {
    return next({ name: "login" });
  }

  if (to.meta.guestOnly && authStore.authUser) {
    return next({ name: "home" });
  }

  next();
});

export default router
