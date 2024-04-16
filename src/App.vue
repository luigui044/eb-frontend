<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Galeria from './components/Galeria.vue'

</script>

<template>
  <Sidebar />
  <header>

    <Navbar />
    <Galeria />
  </header>

  <RouterView />


</template>

<style scoped></style>./components/Carousel.vue
