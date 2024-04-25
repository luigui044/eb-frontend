<script setup>
import Carousel from 'primevue/carousel'
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import carnal from '../assets/img/carnal.png'
import visible from '../assets/img/visible.png'
import evento2 from '../assets/img/evento2.jpeg'
import evento3 from '../assets/img/evento3.jpg'
import Card from 'primevue/card';
import { ref, onMounted } from "vue";




const ProductService = [

    {
        id: '1001',
        code: 'f230fh0g3',
        name: 'Expofuturo - Pereira',
        description: '19 de julio',
        image: evento2,
        icon: 'pi pi-shopping-cart',
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Disponible',
        btn: 'Comprar Boleta',
        disable: true,
        url: 'https://extraboletas.com/congreso-empresarial/'
    },
    {
        id: '1002',
        code: 'f230fh0g3',
        name: 'Pereira',
        description: '24 de abril al 3 de mayo',
        image: evento3,
        icon: 'pi pi-shopping-cart',
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Disponible',
        btn: 'Comprar Boleta',
        disable: true,
        url: 'https://sistema.extraboletas.com/?ev=zu3rf6vpd72rlb5isq8n4nyya59cet&pven=1'
    },
    // {
    //     id: '1003',
    //     code: 'f230fh0g3',
    //     name: 'Expofuturo - Pereira',
    //     description: '19 de julio',
    //     image: evento2,
    //     icon: 'pi pi-shopping-cart',
    //     category: 'Accessories',
    //     quantity: 24,
    //     inventoryStatus: 'Disponible',
    //     btn: 'Comprar Boleta',
    //     disable: true,
    //     url: 'https://extraboletas.com/congreso-empresarial/'
    // }, {
    //     id: '1004',
    //     code: 'f230fh0g3',
    //     name: 'Expofuturo - Pereira',
    //     description: '19 de julio',
    //     image: evento2,
    //     icon: 'pi pi-shopping-cart',
    //     category: 'Accessories',
    //     quantity: 24,
    //     inventoryStatus: 'Disponible',
    //     btn: 'Comprar Boleta',
    //     disable: true,
    //     url: 'https://extraboletas.com/congreso-empresarial/'
    // },
    // {
    //     id: '1001',
    //     code: 'f230fh0g3',
    //     name: 'Estadio Hernán Ramírez Villegas',
    //     description: '20 de abril',
    //     image: evento3,
    //     // price: 65,
    //     category: 'Accessories',
    //     quantity: 24,
    //     inventoryStatus: 'Próximamente',
    //     btn: 'Próximamente',
    //     disable: false,
    //     url: '#!'
    // }
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
        <div class="grid justify-content-center pl-2 ">

            <!-- <div class="col-12 md:col-3 lg:col-3 text-center justify-content-center flex align-content-start flex-wrap">
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
            </div> -->
            <div v-for="product in products" class="col-12 md:col-3 lg:col-3">
                <Card style="width: 21rem; overflow: hidden">
                    <template #header>
                        <img alt="user header" :src="product.image" width="100%" />
                    </template>
                    <template #title>{{ product.name }}</template>
                    <template #subtitle>{{ product.description }}</template>
                    <template #content>

                    </template>
                    <template #footer>
                        <div class="flex gap-3 mt-1">
                            <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" /> -->
                            <a :href="product.url" class="w-full">
                                <Button :icon="product.icon" label="Comprar boleta" class="w-full" severity="success" />
                            </a>
                        </div>
                    </template>
                </Card>

                <!-- {{ product.id }} -->
            </div>

            <div class="col-12  lg:col-12 text-center justify-content-center flex align-content-center flex-wrap">
                <div class="grid">
                    <div class="col-12  ">
                        <h1>PATROCINIOS</h1>
                    </div>
                    <div class="col-12 lg:col-6 ">
                        <div class="img-contenedor">
                            <img class="imagen" :src="carnal" alt="" srcset="">

                        </div>
                        <br>
                        <a href="https://www.facebook.com/carnalmanizales">
                            <Button icon="pi pi-facebook" severity="info" class=" font-weight-bold"
                                label="Visitar Fanpage" /></a>
                    </div>

                    <div class="col-12 lg:col-6 px-4">
                        <iframe width="100%" height="250"
                            src="https://www.youtube.com/embed/Tpb5WScQIQM?si=FAQBuyck126clWe5"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <div class="img-contenedor">
                            <a href="https://visiblepublicidad.com/">
                                <img :src="visible" width="200px" alt="" srcset="">
                            </a>

                        </div>
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