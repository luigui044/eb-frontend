import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PuntosView from '../views/PuntosView.vue';
import EventosView from '../views/EventosView.vue';
import ContactoView from '../views/ContactoView.vue';
import LoginView from '../views/auth/LoginView.vue';
import DashViewVue from '@/views/adminEventos/DashView.vue';
import CrearEvento from '@/views/adminEventos/CrearEvento.vue';
import EditarEvento from '@/views/adminEventos/EditarEvento.vue';
import DetalleEvento from '@/views/DetalleEvento.vue';
import CrearUsuario from '@/views/auth/CreateUsers.vue';
import EditarUsuario from '@/views/auth/EditarUsuario.vue';

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
          component: DashViewVue,
          meta: { requiresAuth: true } // Ruta protegida
        },
        {
          path: 'crearEvento',
          name: 'crearEvento',
          component: CrearEvento,
          meta: { requiresAuth: true }
        },
        {
          path: 'editarEvento/:id',
          name: 'editarEvento',
          component: EditarEvento,
          meta: { requiresAuth: true }
        },
        {
          path: 'logout',
          name: 'logout',
          beforeEnter: (to, from, next) => {
            logout();
          },
        },
        {
          path: 'crearUsuario',
          name: 'crearUsuario',
          component: CrearUsuario,
          meta: { requiresAuth: true }
        },
        {
          path: 'editarUsuario/:id',
          name: 'editarUsuario',
          component: EditarUsuario,
          meta: { requiresAuth: true }
        },
        {
          path: '*',
          redirect: 'dashboard'
        }
      ]
    },
    { path: '/admin', redirect: '/admin/dashboard' }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication(); // Llamamos a la función para verificar autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/admin/login');
  } else {
    next();
  }
});

function checkAuthentication() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate > new Date();
  }
  return false;
}

function logout() {
  // Simula un proceso de logout con un tiempo de espera de 2 segundos
  setTimeout(() => {
    // Elimina el token del localStorage u otro proceso de cierre de sesión
    localStorage.removeItem('token');
    router.push({ name: 'login' })
  }, 2000);
}

export default router;
