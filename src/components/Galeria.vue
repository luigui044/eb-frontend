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
import { ref, onMounted, defineProps } from "vue";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const props = defineProps({
    eventos: {
        type: Array,
        required: true
    }
});

const images = ref([]);
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
const formatearFecha = (fecha) => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const fechaEvento = new Date(fecha);
    const dia = fechaEvento.getDate();
    const mesIndex = fechaEvento.getMonth();
    const mes = meses[mesIndex];
    return `${dia} de ${mes}`;
};
onMounted(() => {
    const photos = props.eventos.map(evento => ({
        itemImageSrc: `${baseUrl}uploads/${evento.img_banner}`,
        alt: evento.nombre_evento,
        name: evento.nombre_evento,
        title: formatearFecha(evento.fecha_evento) + ' - ' + evento.ubicacion,
        caption: true,
        url: `${baseUrl}uploads/${evento.id}`
    }));
    images.value = photos;
});
</script>
