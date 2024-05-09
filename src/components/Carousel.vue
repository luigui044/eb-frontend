<script setup>
import Carousel from 'primevue/carousel'
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import carnal from '../assets/img/carnal.png'
import visible from '../assets/img/visible.png'
import evento2 from '../assets/img/evento2.jpeg'
import evento3 from '../assets/img/evento3.jpg'
import Card from 'primevue/card';
import { ref, onMounted, defineProps } from "vue";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const products = ref([]);

const props = defineProps({
    eventos: {
        type: Array,
        required: true
    }
})
const formatearFecha = (fecha) => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const fechaEvento = new Date(fecha);
    const dia = fechaEvento.getDate();
    const mesIndex = fechaEvento.getMonth();
    const mes = meses[mesIndex];
    return `${dia} de ${mes}`;
};
onMounted(() => {
    const ProductService = props.eventos.map(evento => ({
        id: evento.id,
        name: evento.ubicacion,
        description: formatearFecha(evento.fecha_evento),
        image: `${baseUrl}uploads/${evento.img_portrait}`,
        icon: 'pi pi-shopping-cart',
        category: 'Accessories',
        inventoryStatus: 'Disponible',
        title: evento.fecha_evento + ' - ' + evento.ubicacion,
        btn: 'Comprar Boleta',
        disable: true,
        url: `${baseUrl}uploads/${evento.id}`
    }));
    products.value = ProductService;
});




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
<style>
.p-card-subtitle {
    color: black !important;


}

.p-card-eventos {
    border: 1px solid white !important;
}
</style>
<template>
    <div class="card card-carousel">
        <h1 class="text-center pt-2">
            <u> Eventos Próximos </u>
        </h1>
        <div class="grid justify-content-center pl-2 ">

            <div v-for="product in  products " class="col-12 md:col-3 lg:col-3">
                <Card style="width: 21rem; overflow: hidden" class="bg-primary p-card-eventos">
                    <template #header>
                        <img alt="user header" :src="product.image" width="100%" />
                    </template>
                    <template #title>{{ product.name }}</template>
                    <template #subtitle style="color: black;">{{ product.description }}</template>
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
                        <!-- <iframe width="100%" height="250"
                            src="https://www.youtube.com/embed/Tpb5WScQIQM?si=FAQBuyck126clWe5"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
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