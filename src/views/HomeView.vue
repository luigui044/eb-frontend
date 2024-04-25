<script setup>
import Carousel from "../components/Carousel.vue";
import 'https://static.elfsight.com/platform/platform.js';
import Button from 'primevue/button';
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <main>

    <div class="grid  justify-content-center" style=" text-align: -moz-center;    text-align: -webkit-center;">
      <div class="col-12 lg:col-10 ">
        <Carousel />
      </div>
    </div>


    <hr width="90%">
    <div class="grid px-5 justify-content-center">
      <div class="col-12 md:col-6 lg:col-5">
        <div class="card text-center">
          <div class="card-header">
            <h2>Síguenos en nuestras redes sociales</h2>
          </div>
          <div class="card-body">
            <div class="elfsight-app-a389450c-5617-4f97-af51-06c306cc3346" data-elfsight-app-lazy></div>
          </div>

        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-4 mb-2 justify-content-center text-center  ">

        <div class="card text-center">
          <div class="card-header">
            <h2>Como comprar tu boleta</h2>
          </div>
          <div class="card-body">
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1328548425205069%2F&show_text=false&width=267&t=0"
              width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
              allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen="true"></iframe>
            <br>
            <br>
            <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras">
              <Button label="Comprar Boleta" class="btn-boleta2" icon="pi pi-ticket" raised size="large" /></a>

          </div>

        </div>

      </div>
    </div>

  </main>

</template>
