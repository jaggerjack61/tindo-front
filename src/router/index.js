import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GalleryView from "../views/GalleryView.vue";
import ContactView from "@/views/ContactView.vue";
import AuthView from "@/views/AuthView.vue";
import ProfileView from "@/views/ProfileView.vue";
import PurchasesView from "@/views/PurchasesView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/purchases',
    name: 'purchases',
    component: PurchasesView
  },
  {
    path: '/home#about',
    name: 'about',
    component: HomeView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
  // mode:'history'
})

export default router
