<template>
    <div class="card" style="padding: 4px 0px; ">
        <Galleria :value="images" :responsiveOptions="responsiveOptions" containerStyle="width: 100%; "
            :showThumbnails="false" :showItemNavigators="true" :circular="true" :autoPlay="true"
            :transitionInterval="5000">
            <template #item="slotProps">
                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                    style="width: 100%;border-radius: 10px; display: block" />
            </template>
            <!-- <template #thumbnail="slotProps">
                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block" />
            </template> -->
            <template #caption="slotProps" style="text-align: center;">
                <!-- <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div> -->
                <div class="grid" v-if="slotProps.item.caption">
                    <div class="col-12">
                        <h1>CONGRESO GENERAL EXPOCAMELLO 2024</h1>
                        <h2 class="text-white"> <u> {{ slotProps.item.title }}</u></h2>

                    </div>
                    <div class="col-12">


                        <a :href="slotProps.item.url">
                            <Button label="Comprar Boleta" class="btn-boleta" icon="pi pi-ticket" raised size="large" />
                        </a>
                    </div>
                </div>

            </template>
        </Galleria>
    </div>
</template>

<script setup>
import Button from 'primevue/button';

import Galleria from 'primevue/galleria';
import { ref, onMounted } from "vue";
import banner from '../assets/img/banner5.jpg'
import banner2 from '../assets/img/banner3.png'
const photos = [

    {
        itemImageSrc: banner,
        alt: 'Description for Image 1',
        title: '19 de Julio - Expofuturo, Pereira',
        caption: true,
        url: 'https://extraboletas.com/congreso-empresarial/'
    },
    {
        itemImageSrc: banner2,
        alt: 'Description for Image 1',
        title: '09 de Abril - Estadio Hernán Ramírez Villegas',
        caption: false
    },
]

const images = ref(photos);
// const responsiveOptions = ref([
//     {
//         breakpoint: '1300px',
//         numVisible: 4
//     },
//     {
//         breakpoint: '575px',
//         numVisible: 1
//     }
// ]);
</script>
