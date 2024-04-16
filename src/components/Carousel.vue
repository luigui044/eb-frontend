<script setup>
import Carousel from 'primevue/carousel'
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import carnal from '../assets/img/carnal.png'
import visible from '../assets/img/visible.png'
import evento2 from '../assets/img/evento2.jpeg'
import evento3 from '../assets/img/millonarios.jpg'

import { ref, onMounted } from "vue";




const ProductService = [

    {
        id: '1001',
        code: 'f230fh0g3',
        name: 'Expofuturo - Pereira',
        description: '19 de julio',
        image: evento2,
        // price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Disponible',
        btn: 'Comprar Boleta',
        disable: true,
        url: 'https://extraboletas.com/congreso-empresarial/'
    },
    {
        id: '1001',
        code: 'f230fh0g3',
        name: 'Expofuturo - Pereira',
        description: '19 de julio',
        image: evento2,
        // price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Disponible',
        btn: 'Comprar Boleta',
        disable: true,
        url: 'https://extraboletas.com/congreso-empresarial/'
    },
    {
        id: '1001',
        code: 'f230fh0g3',
        name: 'Estadio Hernán Ramírez Villegas',
        description: '20 de abril',
        image: evento3,
        // price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Próximamente',
        btn: 'Próximamente',
        disable: false,
        url: '#!'
    }
]
const products = ref(ProductService);
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const getSeverity = (status) => {
    switch (status) {
        case 'Disponible':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'Próximamente':
            return 'danger';

        default:
            return null;
    }
};

</script>

<template>
    <div class="card card-carousel">
        <h1 class="text-center pt-2">
            <u> Eventos Próximos </u>
        </h1>
        <div class="grid">

            <div class="col-12 md:col-3 lg:col-3 text-center justify-content-center flex align-content-start flex-wrap">
                <div class="grid anuncio1">
                    <div class="col-12">
                        <h1>PATROCINIOS</h1>
                    </div>
                    <div class="col-12 ">
                        <div class="img-contenedor">
                            <img class="imagen" :src="carnal" alt="" srcset="">

                        </div>

                    </div>
                    <div class="col-12">
                        <a href="https://www.facebook.com/carnalmanizales">
                            <Button icon="pi pi-facebook" severity="info" class=" font-weight-bold"
                                label="Visitar Fanpage" /></a>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-3 lg:col-6">
                <Carousel :value="products" :numVisible="3" :numScroll="2" :responsiveOptions="responsiveOptions"
                    circular :autoplayInterval="5000">
                    <template #item="slotProps">
                        <div class="border-1 surface-border border-round m-2  p-3 bg-white"
                            style="color:black !important">
                            <div class="mb-3">
                                <div class="relative mx-auto">
                                    <img :src="slotProps.data.image" :alt="slotProps.data.name" class="border-round"
                                        width="100%" />
                                    <Tag :value="slotProps.data.inventoryStatus"
                                        :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute"
                                        style="left:5px; top: 5px" />
                                </div>
                            </div>
                            <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
                            <div class="justify-content-between align-items-center">
                                <div class="mt-0 font-semibold text-xl">{{ slotProps.data.description }}</div>
                                <span>
                                    <!-- <Button icon="pi pi-heart" severity="secondary" outlined /> -->
                                    <a :href="slotProps.data.url">
                                        <Button icon=" pi pi-shopping-cart"
                                            :severity="getSeverity(slotProps.data.inventoryStatus)"
                                            :label="slotProps.data.btn" class="ml-2" />

                                    </a>
                                </span>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
            <div
                class="col-12 md:col-3 lg:col-3 text-center justify-content-center flex align-content-center flex-wrap">
                <div class="grid">
                    <div class="col-12  ">
                        <h1>PATROCINIOS</h1>
                    </div>
                    <div class="col-12 anuncio2 ">
                        <div class="img-contenedor">
                            <img class="imagen" :src="carnal" alt="" srcset="">

                        </div>

                    </div>
                    <div class="col-12 anuncio2">
                        <a href="https://www.facebook.com/carnalmanizales">
                            <Button icon="pi pi-facebook" severity="info" class=" font-weight-bold"
                                label="Visitar Fanpage" /></a>
                    </div>
                    <div class="col-12 px-4">
                        <iframe width="100%" height="250"
                            src="https://www.youtube.com/embed/Tpb5WScQIQM?si=FAQBuyck126clWe5"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div class="col-12">
                        <div class="img-contenedor">
                            <a href="https://visiblepublicidad.com/">
                                <img :src="visible" width="200px" alt="" srcset="">
                            </a>

                        </div>

                    </div>
                    <div class="col-12">
                        <a href="https://visiblepublicidad.com/">

                            <Button icon="pi pi-play" severity="warning" class="text-white font-weight-bold"
                                label="Pública con nosotros" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>