<script setup>
import Button from 'primevue/button';

import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';



</script>
<template>
    <div class="grid justify-content-center mb-5">
        <div class="col-12 text-center">
            <h1 class="text-white"> <u> Formulario de Contacto</u></h1>

        </div>
        <div class="col-3 text-center">
            <h3><u>Información General</u></h3>
            <h2><b> Horario de atención:</b></h2>
            <h2>11:00 am a 7:00 pm</h2>
        </div>
        <div class="col-7 md:col-8 lg:col-4">
            <div class="flex flex-column gap-2 mb-2">
                <label for="name">Nombre Completo</label>
                <InputText id="name" />
            </div>
            <div class="flex flex-column gap-2 mb-2">
                <label for="telefono">Teléfono</label>
                <InputText id="telefono" />
            </div>
            <div class="flex flex-column gap-2 mb-2">
                <label for="email">Correo Electrónico </label>
                <InputText id="email" />
            </div>

            <div class="flex flex-column gap-2 mb-2">
                <label for="mensaje">Mensaje</label>
                <Textarea id="mensaje" v-model="value" rows="5" cols="30" />

            </div>
            <Button label="Enviar" severity="success" style="width: 100%;" />

        </div>
        <div class="col-3 text-center">
            <h2><b>Contáctenos</b></h2>
            <h1><u>310 5208930</u></h1>
            <a class="btn btn-success"
                href="https://api.whatsapp.com/send?phone=573105208930&text=hola%20buena%20tarde%20estoy%20interesado%20en%20comprar%20una%20boleta">
                <Button icon="pi pi-whatsapp" severity="success" />

            </a>

        </div>

    </div>


</template>