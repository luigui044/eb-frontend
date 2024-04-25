<script setup>
import Button from 'primevue/button';
import Estadio from '../assets/img/estadio.jpg'
import Unicentro from '../assets/img/unicentro.png'

import Card from 'primevue/card';
</script>
<template>
    <div class="grid justify-content-center mb-5">
        <div class="col-12 text-center">
            <h1 class="text-white">CONTÁCTANOS 310 5208930</h1>
            <hr>
            <h2>
                PUNTOS DE VENTA AUTORIZADOS
            </h2>
        </div>
        <div class="col-3">
            <Card style="width: 25rem; overflow: hidden">
                <template #header>
                    <img alt="user header" :src="Unicentro" width="100%" />
                </template>
                <template #title>
                    Centro Comercial Unicentro Pereira

                </template>

                <template #subtitle>Plazoleta Higuerón al lado de Dunkin’ Donuts, frente a Seven Seven.</template>

                <!-- <template #footer>
                    <div class="flex gap-3 mt-1">
                        <Button label="Cancel" severity="secondary" outlined class="w-full" />
                        <Button label="Save" class="w-full" />
                    </div>
                </template> -->
            </Card>

        </div>
        <div class="col-3">
            <Card style="width: 25rem; overflow: hidden">
                <template #header>
                    <img alt="user header" :src="Estadio" width="100%" />
                </template>
                <template #title>
                    Taquilla Estadio Hernán Ramírez

                </template>

                <template #subtitle>Sector occidental. <br> </template>

                <!-- <template #footer>
                    <div class="flex gap-3 mt-1">
                        <Button label="Cancel" severity="secondary" outlined class="w-full" />
                        <Button label="Save" class="w-full" />
                    </div>
                </template> -->
            </Card>
        </div>
    </div>

</template>