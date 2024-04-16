<script setup>
import Carousel from "../components/Carousel.vue";
import 'https://static.elfsight.com/platform/platform.js';
import Button from 'primevue/button';
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <main>



    <Carousel />
    <hr width="90%">
    <div class="grid px-5">
      <div class="col-12 md:col-6">
        <div class="card text-center">
          <div class="card-header">
            <h2>Síguenos en nuestras redes sociales</h2>
          </div>
          <div class="card-body">
            <div class="elfsight-app-a389450c-5617-4f97-af51-06c306cc3346" data-elfsight-app-lazy></div>
          </div>

        </div>
      </div>
      <div class="col-12 md:col-6 mb-2 justify-content-center text-center  ">

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
  <footer class="px-2">
    <div class="grid  " style="padding: 10px 15px 0 15px;">
      <d iv class="col-12" style="border-bottom: 1px  solid white; ">
        <!-- Facebook -->
        <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1 text-white shadow-blanco"
          href="https://www.facebook.com/ExtraBoletas" role="button"><i
            class="pi pi-facebook font-icon-social mx-2"></i></a>

        <!-- Twitter -->
        <!-- <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1 text-white shadow-blanco" href="#!"
          role="button"><i class="pi pi-twitter font-icon-social mx-2"></i></a>
 -->


        <!-- Instagram -->
        <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1 text-white shadow-blanco"
          href="https://www.instagram.com/extraboletas" role="button"><i
            class="pi pi-instagram font-icon-social mx-2"></i></a>

        <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1 text-white shadow-blanco"
          href="https://api.whatsapp.com/send?phone=573105208930&text=hola%20buena%20tarde%20estoy%20interesado%20en%20comprar%20una%20boleta"
          role="button"><i class="pi pi-whatsapp font-icon-social mx-2"></i></a>
      </d>



    </div>

    <div class="grid justify-content-center">
      <div class="col-6 md:col-4 text-center">
        <h3 class="text-uppercase fw-bold mb-2">
          GESTORES DE CONTENIDOS S.A.S.
        </h3>
        <p>
          NIT: 901.376.086 - 6 <br>
          Pereira, Risaralda
        </p>
        <img src="../assets/img/logo2.png" alt="">

      </div>
      <div class="col-3 text-center" id="footer-menu">

        <!-- Links -->
        <h3 class="text-uppercase fw-bold mb-4">
          MENÚ
        </h3>
        <p>
          <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras" class="text-reset">Iniciar
            Sesión</a>
        </p>
        <p>
          <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras"
            class="text-reset">Descargar Boleta</a>
        </p>
        <p>
          <a href="https://extraboletas.com/eventos/" class="text-reset">Eventos</a>
        </p>
        <p>
          <a href="https://extraboletas.com/elementor-385/" class="text-reset">Contacto</a>
        </p>
        <p>
          <a href="https://extraboletas.com/?page_id=328" class="text-reset">Puntos de Ventas</a>
        </p>

      </div>
      <div class="col-6 md:col-4 text-center">
        <h3 class="text-uppercase fw-bold mb-4">Contacto</h3>
        <p><i class="fas fa-home me-3"></i>Pereira, Risaralda</p>
        <p>
          <i class="fas fa-calendar me-3"></i>
          Horario de atención:
          11:00 am a 7:00pm

        </p>
        <p><i class="fas fa-phone me-3"></i>310 5208930</p>
      </div>

    </div>
    <div class="grid" style="padding: 0 8px 0 8px; ">
      <div class="col-12 text-center copy-right" style="border-radius: 0 0 10px 10px;">
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">© 2024 - ExtraBoletas. All rights
          reserved.</a>
      </div>
    </div>
  </footer>
</template>
