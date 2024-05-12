<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref, watchEffect, onMounted } from 'vue'
import axios from 'axios';
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Galeria from './components/Galeria.vue'
import Button from 'primevue/button'
import Footer from '@/components/Footer.vue'
const route = useRoute();


const baseUrl = import.meta.env.VITE_API_BASE_URL;

const mostrarComponente = ref(false);
watchEffect(() => {
  mostrarComponente.value = debeMostrarComponente(route.path);
});
function debeMostrarComponente(ruta) {
  return ruta.startsWith("/admin");
}

const eventosAMostrar = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get(`${baseUrl}eventos/listar-eventos`);
    eventosAMostrar.value = response.data;
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
  }
});



</script>

<template>
  <Sidebar v-if="!mostrarComponente" />
  <header>

    <Navbar v-if="!mostrarComponente" />


    <Galeria v-if="$route.name === 'home' && eventosAMostrar.length" :eventos="eventosAMostrar" />
    <div class="w-100 text-center row">
      <div class="col-12 ">
        <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras"
          class="btn btn-primary mr-2 mb-1 link-movil">
          <Button label="Iniciar sesión" icon="pi pi-user" class="button-border" severity="info" style="color:white">

          </Button>
        </a>
        <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras"
          class="btn btn-primary mr-2 mb-1 link-movil">
          <Button label="Registrarme" icon="pi pi-pen-to-square" class="button-border" severity="info"
            style="color:white">

          </Button>
        </a>
        <hr class="link-movil2">
        <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras"
          class="btn btn-primary  mt-2 link-movil">
          <Button label="Descargar Boleta" icon="pi pi-ticket" class="button-border" severity="info"
            style="color:white">

          </Button>
        </a>

      </div>


    </div>

  </header>

  <RouterView :eventos="eventosAMostrar" />




  <Footer v-if="!mostrarComponente">
  </Footer>
</template>

<style scoped>
.button-border {
  border: 1.5px solid white;

}

.link-movil {
  display: none;
}
</style>
