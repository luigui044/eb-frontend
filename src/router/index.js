import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PuntosView from '../views/PuntosView.vue'
import EventosView from '../views/EventosView.vue'
import ContactoView from '../views/ContactoView.vue'
import LoginView from '../views/auth/LoginView.vue'
import Sidebar from 'primevue/sidebar'
import AdminView from '../views/auth/AdminView.vue'
import DashViewVue from '@/views/adminEventos/DashView.vue'
import CrearEvento from '@/views/adminEventos/CrearEvento.vue'
import EditarEvento from '@/views/adminEventos/EditarEvento.vue'
import DetalleEvento from '@/views/DetalleEvento.vue'

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
    {
      path: '/detalle-evento/:id',
      name: 'detalle',
      component: DetalleEvento
    },
    {
      path: '/admin',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashViewVue
        },
        {
          path: 'crearEvento',
          name: 'crearEvento',
          component: CrearEvento
        },
        {
          path: 'editarEvento/:id',
          name: 'editarEvento',
          component: EditarEvento
        }
      ]
    },
  ]
})




export default router
