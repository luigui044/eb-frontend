<script setup>

import img1 from '../assets/Pasados/1.jpg'
import img2 from '../assets/Pasados/2.jpg'
import img3 from '../assets/Pasados/3.jpg'
import img4 from '../assets/Pasados/4.jpg'
import img5 from '../assets/Pasados/5.jpg'
import img6 from '../assets/Pasados/6.jpg'
import img7 from '../assets/Pasados/7.jpg'
import img8 from '../assets/Pasados/8.jpg'
import img9 from '../assets/Pasados/9.jpg'
import img10 from '../assets/Pasados/10.jpg'
import img11 from '../assets/Pasados/11.jpg'
import img12 from '../assets/Pasados/12.jpg'
import img13 from '../assets/Pasados/13.jpg'
import img14 from '../assets/Pasados/14.jpg'
import img15 from '../assets/Pasados/15.jpg'
import prox1 from '../assets/img/evento2.jpeg'
import prox2 from '../assets/img/evento3.jpg'
import axios from 'axios';

import { ref, onMounted } from 'vue'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const eventos = ref([])
onMounted(async () => {
    try {
        const response = await axios.get(`${baseUrl}eventos/listar-eventos`);
        eventos.value = response.data;
        // console.log(eventos.value.id)
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
});


const proxiEvents = [{
    src: prox1
},
{ src: prox2 }]

const datos = [{
    src: img1
},
{
    src: img2
},
{
    src: img3
},
{
    src: img4
},
{
    src: img5
},
{
    src: img6
},
{
    src: img7
},
{
    src: img8
},
{
    src: img9
},
{
    src: img10
},
{
    src: img11
},
{
    src: img12
},
{
    src: img13
},
{
    src: img14
},
{
    src: img15
},
];


const images = ref(datos);
const eventosProx = ref(proxiEvents)

</script>
<template>
    <div class="grid justify-content-center">
        <div class="col-12 text-center">
            <h1 class="text-white"> Eventos Próximos</h1>
            <hr>
        </div>
        <div class="col-7 md:col-8 lg:col-9">
            <div class="grid justify-content-center mb-5 px-5">
                <template v-for="evento in eventos">
                    <div class="col-12 lg:col-3">
                        <img :src="baseUrl + 'uploads/' + evento.img_portrait" alt="" width="100%">
                    </div>
                </template>

            </div>
        </div>
        <div class="col-12 text-center">
            <h1 class="text-white"> Eventos Realizados</h1>
            <hr>
        </div>
        <div class="col-7 md:col-8 lg:col-9">
            <div class="grid justify-content-center mb-5 px-5">
                <template v-for="image in images">
                    <div class="col-12 lg:col-3">
                        <img :src="image.src" alt="" width="100%">
                    </div>
                </template>

            </div>
        </div>
    </div>


</template>