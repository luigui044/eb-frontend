<script setup>
import imgLogo from '../assets/img/logoEB.png'
</script>

<template>
    <footer class="px-2">
        <div class="grid  " style="padding: 10px 15px 0 15px;">
            <div class="col-12" style="border-bottom: 1px  solid white; ">
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
            </div>



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
                <img :src="imgLogo" alt="">

            </div>
            <div class="col-3 text-center" id="footer-menu">

                <!-- Links -->
                <h3 class="text-uppercase fw-bold mb-4">
                    MENÚ
                </h3>
                <p>


                    <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras"
                        class="text-reset">Iniciar
                        Sesión</a>
                </p>
                <p>
                    <a href="https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras"
                        class="text-reset">Descargar Boleta</a>
                </p>
                <p>
                    <RouterLink to="/eventos" class="text-reset">
                        Eventos

                    </RouterLink>
                </p>
                <p>
                    <RouterLink to="/contacto" class="text-reset">
                        Contacto
                    </RouterLink>

                </p>
                <p>
                    <RouterLink to="/puntos-de-venta" class="text-reset">
                        Puntos de Ventas
                    </RouterLink>

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