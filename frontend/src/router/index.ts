import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '../views/Login.vue'
import BlogsView from "../views/Blogs.vue";
import ProfileView from "../views/Profile.vue";
import CreateBlogView from "../views/CreateBlog.vue";
import UpdateBlogView from "../views/UpdateBlog.vue";
import BlogsInfoView from "../views/BlogsInfo.vue";
import {useAuthStore} from "../stores/authStore.ts";
import Signup from "../views/Signup.vue";
import SettingsView from "../views/Settings.vue";

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
    meta: { requiresAuth: true }
  },
  {
    path: '/create-blog',
    name: 'create blog',
    component: CreateBlogView,
    meta: { requiresAuth: true }
  },
  {
    path: '/update-blog/:id',
    name: 'update blog',
    component: UpdateBlogView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { guestOnly: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();

  // якщо ще не перевіряли авторизацію — робимо перевірку
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
