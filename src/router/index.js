import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PuntosView from '../views/PuntosView.vue'
import EventosView from '../views/EventosView.vue'
import ContactoView from '../views/ContactoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/puntos-de-venta',
      name: 'puntos',
      component: PuntosView
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: EventosView
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: ContactoView
    },
  ]
})

export default router
