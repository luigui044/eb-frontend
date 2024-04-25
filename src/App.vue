<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Galeria from './components/Galeria.vue'
import Button from 'primevue/button'
import Footer from '@/components/Footer.vue'





</script>

<template>
  <Sidebar />
  <header>

    <Navbar />
    <Galeria v-if="$route.name === 'home'" />
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

  <RouterView />


  <Footer />
</template>

<style scoped>
.button-border {
  border: 1.5px solid white;

}

.link-movil {
  display: none;
}
</style>./components/Carousel.vue
