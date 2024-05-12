<template>
    <div class=" w-full lg:w-full ">

        <div class="grid  justify-content-center text-center">

            <div class="col-6 surface-card p-4 shadow-2 border-round">
                <div class="text-center mb-5">
                    <img :src="Logo" alt="Extraboletas" width="250px">
                    <div class="text-900 text-3xl font-medium mb-3">Crear nuevo evento</div>

                </div>

                <div>
                    <form @submit.prevent="crearEvento">
                        <div class="grid">
                            <Minimenu></Minimenu>
                            <div class="col-6"> <label for="nombreEvento" class="block text-900 font-medium mb-2">Nombre
                                    de
                                    Evento</label>
                                <InputText v-model="nombreEvento" id="nombreEvento" type="text" class="w-full mb-3" />
                            </div>
                            <div class="col-6">
                                <label for="nombreResponsable"
                                    class="block text-900 font-medium mb-2">Responsable</label>
                                <InputText v-model="responsable" id="nombreResponsable" type="text"
                                    class="w-full mb-3" />
                            </div>
                            <div class="col-6">

                                <label for="ubicacion" class="block text-900 font-medium mb-2 ">Lugar de Evento</label>
                                <InputText v-model="ubicacion" id="ubicacion" type="text" class="w-full mb-3" />
                            </div>
                            <div class="col-6">

                                <label for="ciudad" class="block text-900 font-medium mb-2 ">Ciudad</label>
                                <InputText v-model="ciudad" id="ciudad" type="text" class="w-full mb-3" />
                            </div>
                            <div class="col-6">
                                <label for="fecha" class="block text-900 font-medium mb-2">Fecha de Evento</label>
                                <Calendar showIcon v-model="date" inputId="fecha" class="w-full mb-3" />
                            </div>
                            <div class="col-6">
                                <label for="hora" class="block text-900 font-medium mb-2">Hora</label>
                                <Calendar id="hora" v-model="hora" timeOnly class="w-full mb-3" />
                            </div>
                            <div class="col-8">
                                <label for="compra" class="block text-900 font-medium mb-2 ">Link de compra</label>
                                <InputText v-model="lcompra" id="compra" type="text" class="w-full mb-3" />
                            </div>
                            <div class="col-4">
                                <label for="estadoEvento" class="block text-900 font-medium mb-2 ">Estado de
                                    evento</label>

                                <Dropdown v-model="estadoSeleccionado" :options="estados" id="estadoEvento"
                                    optionLabel="name" optionValue="value" placeholder="Seleccione estado de evento"
                                    class="w-full mb-3" />
                            </div>
                            <div class="col-12">
                                <label for="comentario" class="block text-900 font-medium mb-2 ">Comentario
                                    adicional</label>

                                <Textarea v-model="comentario" id="comentario" aria-label="" class="w-full mb-3" />
                            </div>
                            <div class="col-6">
                                <label for="imgPortrait" class="block text-900 font-medium mb-2 ">Imagen 1x1</label>
                                <FileUpload ref="portraitUpload" name="imgPortrait[]" :showUploadButton="false"
                                    accept="image/*" :maxFileSize="30000000" :multiple="false" class="" />
                            </div>
                            <div class="col-6">
                                <label for="imgBanner" class="block text-900 font-medium mb-2 ">Imagen de banner</label>
                                <FileUpload ref="bannerUpload" name="imgBanner[]" :showUploadButton="false"
                                    accept="image/*" :maxFileSize="30000000" :multiple="false" class="" />

                            </div>
                            <div class="col-6">

                                <label for="imgLocalidad" class="block text-900 font-medium mb-2 ">Imagen de
                                    localidades</label>

                                <FileUpload ref="localidadUpload" name="imgLocalidad[]" :showUploadButton="false"
                                    accept="image/*" :maxFileSize="30000000" :multiple="false" class="" />
                            </div>
                            <div class="col-6">

                                <label for="imgVertical" class="block text-900 font-medium mb-2 ">Imagen
                                    vertical</label>

                                <FileUpload ref="verticalUpload" name="imgVertical[]" :showUploadButton="false"
                                    accept="image/*" :maxFileSize="30000000" :multiple="false" class="" />
                            </div>
                        </div>

                        <Button label="Crear Evento" icon="pi pi-cloud-upload" class="w-full mt-3"
                            type="submit"></Button>
                    </form>
                </div>
            </div>
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
import Logo from '../../assets/img/logoEB.png';
import Minimenu from '../../components/Minimenu.vue';
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

const portraitUpload = ref(null);
const bannerUpload = ref(null);
const localidadUpload = ref(null);
const verticalUpload = ref(null);

const estados = ref([
    { name: 'Habilitado', value: 1 },
    { name: 'Próximamente', value: 4 },
    { name: 'Borrador', value: 2 },
    { name: 'Deshabilitado', value: 3 },
]);




const crearEvento = async () => {

    console.log(estadoSeleccionado.value)
    const formData = new FormData();

    formData.append('nombre_evento', nombreEvento.value);
    formData.append('responsable', responsable.value);
    formData.append('ubicacion', ubicacion.value);
    formData.append('ciudad', ciudad.value);
    formData.append('link_compra', lcompra.value);
    formData.append('descripcion_adicional', comentario.value);
    formData.append('fecha_evento', date.value);
    formData.append('hora', hora.value);

    formData.append('estado', estadoSeleccionado.value);

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
        const response = await axios.post(`${baseUrl}eventos/crear-evento`, formData, {
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
</script>
