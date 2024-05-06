<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Editar evento</div>
        </div>

        <div>
            <form @submit.prevent="editarEvento">
                <label for="nombreEvento" class="block text-900 font-medium mb-2">Nombre de Evento</label>
                <InputText v-model="nombreEvento" id="nombreEvento" type="text" class="w-full mb-3" />

                <label for="nombreResponsable" class="block text-900 font-medium mb-2">Responsable</label>
                <InputText v-model="responsable" id="nombreResponsable" type="text" class="w-full mb-3" />

                <label for="ubicacion" class="block text-900 font-medium mb-2 ">Lugar de Evento</label>
                <InputText v-model="ubicacion" id="ubicacion" type="text" class="w-full mb-3" />

                <label for="ciudad" class="block text-900 font-medium mb-2 ">Ciudad</label>
                <InputText v-model="ciudad" id="ciudad" type="text" class="w-full mb-3" />

                <label for="fecha" class="block text-900 font-medium mb-2">Fecha de Evento</label>
                <Calendar showIcon v-model="date" inputId="fecha" class="w-full mb-3" />

                <label for="hora" class="block text-900 font-medium mb-2">Hora</label>
                <Calendar id="hora" v-model="hora" timeOnly class="w-full mb-3" />


                <label for="compra" class="block text-900 font-medium mb-2 ">Link de compra</label>
                <InputText v-model="lcompra" id="compra" type="text" class="w-full mb-3" />

                <Dropdown v-model="estadoSeleccionado" :options="estados" optionLabel="name" optionValue="value"
                    placeholder="Seleccione estado de evento" class="w-full mb-3" />
                <Textarea v-model="comentario" id="comentario" aria-label="" class="w-full mb-3" />

                <label for="imgPortrait" class="block text-900 font-medium mb-2 ">Imagen 1x1</label>
                <img id="unoimage" :src="portraitUploadOld" alt="" width="40%">
                <FileUpload ref="portraitUpload" name="imgPortrait[]" :showUploadButton="false" accept="image/*"
                    :maxFileSize="30000000" :multiple="false" class="" @change="hidePortraitImage" />
                <label for="imgBanner" class="block text-900 font-medium mb-2 ">Imagen de banner</label>
                <img id="dosimage" :src="bannerUploadOld" alt="" width="50%">

                <FileUpload ref="bannerUpload" name="imgBanner[]" :showUploadButton="false" accept="image/*"
                    :maxFileSize="30000000" :multiple="false" class="" @change="hideBannerImage" />


                <label for="imgLocalidad" class="block text-900 font-medium mb-2 ">Imagen de localidades</label>
                <img id="tresimage" :src="localidadUploadOld" alt="" width="50%">

                <FileUpload ref="localidadUpload" name="imgLocalidad[]" :showUploadButton="false" accept="image/*"
                    :maxFileSize="30000000" :multiple="false" class="" @change="hideLocalidadImage" />

                <label for="imgVertical" class="block text-900 font-medium mb-2 ">Imagen vertical</label>
                <img id="cuatroimage" :src="verticalUploadOld" alt="" width="20%">
                <FileUpload ref="verticalUpload" name="imgVertical[]" :showUploadButton="false" accept="image/*"
                    :maxFileSize="30000000" :multiple="false" class="" @change="hideVerticalImage" />


                <Button label="Actualizar Evento" icon="pi pi-cloud-upload" class="w-full mt-3" type="submit"></Button>
            </form>
        </div>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const eventId = ref(null);
const router = useRouter();
const token = localStorage.getItem('token');
const date = ref();
const hora = ref();
const ciudad = ref();
const responsable = ref();
const estadoSeleccionado = ref();
const nombreEvento = ref();
const ubicacion = ref();
const comentario = ref();
const lcompra = ref();


const portraitUploadOld = ref(null);
const bannerUploadOld = ref(null);
const localidadUploadOld = ref(null);
const verticalUploadOld = ref(null);

const portraitUpload = ref(null);
const bannerUpload = ref(null);
const localidadUpload = ref(null);
const verticalUpload = ref(null);

let originalValues = {}; // Almacena los valores originales de los campos

onMounted(async () => {
    eventId.value = parseInt(router.currentRoute.value.params.id);
    const formatearFecha = (fecha) => {
        const fechaEvento = new Date(fecha);
        const dia = fechaEvento.getDate();
        const mes = fechaEvento.getMonth() + 1;
        const año = fechaEvento.getFullYear();
        return `${mes.toString().padStart(2, '0')}/${dia.toString().padStart(2, '0')}/${año}`;
    };


    const formatearHora = (fecha) => {
        const fechaHora = new Date(fecha);
        let hora = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        let periodo = "AM";

        // Convertir la hora a formato de 12 horas y determinar el periodo (AM o PM)
        if (hora >= 12) {
            periodo = "PM";
            hora = hora === 12 ? 12 : hora - 12; // Si la hora es 12, mantenerla como está
        } else if (hora === 0) {
            hora = 12; // Si la hora es 0, convertirla a 12 AM
        }

        // Agregar ceros a la izquierda si es necesario para que siempre tenga dos dígitos
        const horaFormateada = hora.toString().padStart(2, '0');
        const minutosFormateados = minutos.toString().padStart(2, '0');

        return `${horaFormateada}:${minutosFormateados} ${periodo}`;
    };
    try {
        const response = await axios.get(`http://localhost:3000/eventos/listar-eventos/${eventId.value}`);

        nombreEvento.value = response.data.nombre_evento;
        estadoSeleccionado.value = response.data.estado;
        date.value = formatearFecha(response.data.fecha_evento);
        hora.value = formatearHora(response.data.hora);
        ubicacion.value = response.data.ubicacion;
        ciudad.value = response.data.ciudad;
        responsable.value = response.data.responsable;
        comentario.value = response.data.descripcion_adicional;
        lcompra.value = response.data.link_compra;

        portraitUploadOld.value = `http://localhost:3000/uploads/${response.data.img_portrait}`;
        bannerUploadOld.value = `http://localhost:3000/uploads/${response.data.img_banner}`;

        localidadUploadOld.value = `http://localhost:3000/uploads/${response.data.img_localidades}`;
        verticalUploadOld.value = `http://localhost:3000/uploads/${response.data.img_vertical}`;


        // Guarda los valores originales de los campos
        originalValues = {
            nombreEvento: nombreEvento.value,
            ubicacion: ubicacion.value,
            date: date.value,
            hora: hora.value,
            ciudad: ciudad.value,
            responsable: responsable.value,
            lcompra: lcompra.value,
            estadoSeleccionado: estadoSeleccionado.value,
            comentario: comentario.value,
        };
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
});

const estados = ref([
    { name: 'Habilitado', value: 1 },
    { name: 'Próximamente', value: 4 },
    { name: 'Borrador', value: 2 },
    { name: 'Deshabilitado', value: 3 },
]);

const editarEvento = async () => {

    const formData = new FormData();

    // Agregar los campos al formData solo si han cambiado
    if (nombreEvento.value !== originalValues.nombreEvento) formData.append('nombre_evento', nombreEvento.value);
    if (responsable.value !== originalValues.responsable) formData.append('responsable', responsable.value);
    if (ubicacion.value !== originalValues.ubicacion) formData.append('ubicacion', ubicacion.value);
    if (ciudad.value !== originalValues.ciudad) formData.append('ciudad', ciudad.value);
    if (lcompra.value !== originalValues.lcompra) formData.append('link_compra', lcompra.value);
    if (comentario.value !== originalValues.comentario) formData.append('descripcion_adicional', comentario.value);
    if (date.value !== originalValues.date) formData.append('fecha_evento', date.value);
    if (hora.value !== originalValues.hora) formData.append('hora', hora.value);
    if (estadoSeleccionado.value !== originalValues.estadoSeleccionado) formData.append('estado', estadoSeleccionado.value);
    // Obtener los archivos de los FileUpload
    const portraitFile = portraitUpload.value ? portraitUpload.value.files[0] : null;
    const bannerFile = bannerUpload.value ? bannerUpload.value.files[0] : null;
    const localidadFile = localidadUpload.value ? localidadUpload.value.files[0] : null;
    const verticalFile = verticalUpload.value ? verticalUpload.value.files[0] : null;

    // Agregar archivos al formData si están definidos
    if (portraitFile) formData.append('img_portrait', portraitFile);
    if (bannerFile) formData.append('img_banner', bannerFile);
    if (localidadFile) formData.append('img_localidades', localidadFile);
    if (verticalFile) formData.append('img_vertical', verticalFile);

    try {

        const response = await axios.patch(`http://localhost:3000/eventos/actualizar-evento/${eventId.value}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response);
    } catch (error) {
        console.error('Error al crear el evento:', error);
    }
};

const hidePortraitImage = () => {
    portraitUploadOld.value = null;
};

const hideBannerImage = () => {
    bannerUploadOld.value = null;
};

const hideLocalidadImage = () => {
    localidadUploadOld.value = null;
};
const hideVerticalImage = () => {
    verticalUploadOld.value = null;
};
</script>
