<template>
    <div class="card" style="padding: 4px 0px;">
        <Galleria :value="images" :responsiveOptions="responsiveOptions" containerStyle="width: 100%;"
            :showThumbnails="false" :showItemNavigators="true" :circular="true" :autoPlay="true"
            :transitionInterval="5000">
            <template #item="slotProps">
                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                    style="width: 100%; border-radius: 10px; display: block;" />
            </template>

            <template #caption="slotProps" class="visible-caption">
                <div class="grid" v-if="slotProps.item.caption">
                    <div class="col-12">
                        <h1>{{ slotProps.item.name }}</h1>
                        <h2 class="text-white"><u>{{ slotProps.item.title }}</u></h2>
                    </div>
                    <div class="col-12">
                        <a :href="slotProps.item.url">
                            <Button label="Comprar Boleta" class="btn-boleta" icon="pi pi-ticket" raised size="large" />
                        </a>
                    </div>
                </div>
                <div v-else>

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
        name: 'CONGRESO GENERAL EXPOCAMELLO 2024',
        title: '19 de Julio - Expofuturo, Pereira ',
        caption: true,
        url: 'https://sistema.extraboletas.com/?ev=69vsgaoyh7xr6fd4c1lmji088twyvz'
    },
    {
        itemImageSrc: banner2,
        alt: 'Description for Image 1',
        title: '24 de abril al 3 de mayo - Pereira',
        name: 'TRIPLETA AURIROJA',

        caption: true,
        url: 'https://sistema.extraboletas.com/?ev=zu3rf6vpd72rlb5isq8n4nyya59cet&pven=1'
    },
];

const images = ref(photos);
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);
</script>
