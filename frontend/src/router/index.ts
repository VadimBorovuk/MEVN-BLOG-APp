import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import LoginView from '../views/Login.vue'
import BlogsView from "../views/Blogs.vue";
import ProfileView from "../views/Profile.vue";
import CreateBlogView from "../views/CreateBlog.vue";
import UpdateBlogView from "../views/UpdateBlog.vue";
import BlogsInfoView from "../views/BlogsInfo.vue";
import {useAuthStore} from "../stores/authStore.ts";
import Signup from "../views/Signup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BlogsView,
    meta: {requiresAuth: true, title: 'Blogs page'},
  },
  {
    path: '/blogs/:id',
    name: 'blogData',
    component: BlogsInfoView,
    meta: {requiresAuth: true, title: 'Blogs information page'}
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {requiresAuth: true, title: 'Profile page'}
  },
  {
    path: '/create-blog',
    name: 'createBlog',
    component: CreateBlogView,
    meta: {requiresAuth: true, title: 'Create blog page'}
  },
  {
    path: '/update-blog/:id',
    name: 'updateBlog',
    component: UpdateBlogView,
    meta: {requiresAuth: true, title: 'Update blog page'}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {guestOnly: true, title: 'Login page'}
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {guestOnly: true, title: 'Signup page'}
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
    return next({name: "login"});
  }

  if (to.meta.guestOnly && authStore.authUser) {
    return next({name: "home"});
  }

  next();
});

router.afterEach((to) => {
  const baseTitle = 'Blogify'
  document.title = to.meta.title
      ? `${to.meta.title} | ${baseTitle}`
      : baseTitle
})


export default router
