<script setup>
import imgPoliticas from '../assets/politicasEB.jpg'
import imgLocalidades from '../assets/localidades.jpeg'
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const eventId = ref(null);
const router = useRouter();

const date = ref();
const hora = ref();
const ciudad = ref();
const responsable = ref();
const estadoSeleccionado = ref();
const nombreEvento = ref();
const ubicacion = ref();
const comentario = ref();
const lcompra = ref();
const banner = ref(null);

const localidadUpload = ref(null);
const verticalUpload = ref(null);
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
        const response = await axios.get(`${baseUrl}eventos/listar-eventos/${eventId.value}`);

        nombreEvento.value = response.data.nombre_evento;
        estadoSeleccionado.value = response.data.estado;
        date.value = formatearFecha(response.data.fecha_evento);
        hora.value = formatearHora(response.data.hora);
        ubicacion.value = response.data.ubicacion;
        ciudad.value = response.data.ciudad;
        responsable.value = response.data.responsable;
        comentario.value = response.data.descripcion_adicional;
        lcompra.value = response.data.link_compra;
        banner.value = `${baseUrl}uploads/${response.data.img_banner}`;
        localidadUpload.value = `${baseUrl}uploads/${response.data.img_localidades}`;
        verticalUpload.value = `${baseUrl}uploads/${response.data.img_vertical}`;


    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
});

</script>

<template>
    <div class="grid justify-content-center">
        <div class="col-12 md:col-9">
            <img :src="banner" alt="localidades-extraboletas" width="100%">

        </div>
        <div class="col-12 md:col-4 text-justify">
            <h3><b> INFORMACIÓN GENERAL</b></h3>
            <hr>
            <ul>
                <li>
                    <b> LUGAR:</b> {{ ubicacion }}
                </li>
                <li>
                    <b> CIUDAD:</b>{{ ciudad }}
                </li>
                <li>
                    <b> FECHA DEL EVENTO:</b> {{ date }}
                </li>
                <li>
                    <b> APERTURA DE PUERTAS:</b> {{ hora }}.
                </li>
                <li>
                    <b> NOMBRE EVENTO: </b><span style="text-transform: uppercase !important;"> {{ nombreEvento
                        }}</span>
                </li>
                <li>
                    <b> RESPONSABLE:</b> {{ responsable }}
                </li>
            </ul>
            <hr>
            <h4>ATENCIÓN:</h4>
            <p>
                <b>1. Recepción de boletas: </b> Las boletas las recibirá en PDF por correo

                electrónico o podrá descargarla desde la página, ingresando a su usuario. Su

                boleta se encuentra asociada directamente a su identificación

                oficial, por tanto, le solicitamos presentar su documento de identidad al

                ingresar al lugar del evento correspondiente.

            </p>
            <p>
                <b>2. Ingreso: </b> Esta BOLETA permite el ingreso al evento solamente la

                primera vez que su código sea escaneado, es decir, a la primera persona que

                lo use, ASI QUE, NO COMPARTAS, NI MUESTRES TU TICKET.
            </p>
            <p>
                <b>3. Duplicación: </b> La duplicación de este ticket o del código puede

                impedir su acceso al evento. El organizador del evento ni ExtraBoletas son

                responsables por cualquier inconveniente o pérdida por

                duplicación, al igual que por compra de entradas fuera de los puntos

                oficiales habilitados. En caso de duplicación, la organización se reserva el derecho de no permitir el
                acceso a ningún portador de este ticket.
            </p>
            <p>
                <b>4. Compra a terceros:</b> En caso de haber adquirido boletas o abonos para

                sus amigos, es importante informarles que las boletas ya se

                encuentran asociadas a sus respectivas identificaciones. Que deben descar-

                garlas en nuestra web, opción DESCAGAR BOLETA. Para eso es necesario

                registrarse, utilizando su número de identificación. Este proceso nos

                permitirá mantener un registro adecuado y garantizar la autenticidad de los

                compradores.
            </p>
            <h4>RECOMENDACIONES:</h4>
            <p>
                <b> 1. No compartas el ticket o código de barra </b> con ninguna persona ni lo

                envíes por WhatsApp. Por favor conserva el ticket en un lugar seguro, lleva tu

                cédula o el ticket descargado al evento.
            </p>
            <p>
                <b>2. Tu boleta será escaneada en la entrada del evento </b> y será válida

                únicamente si es legible, está completa y presenta condiciones óptimas para

                su validación.
            </p>
            <a :href="lcompra">
                <Button label="COMPRAR" severity="success" style="width: 100%;" /></a>


            <h2 class="bg-extraboleta subtitulos text-center">SíGUENOS </h2>
            <div class="w-full text-center">
                <a href="https://www.facebook.com/ExtraBoletas" target="_blank">
                    <Button icon="pi pi-facebook" size="large" class="mr-5 text-white "
                        style="background-color: #4E69A2;" aria-label="Search" /></a>
                <a href="https://www.instagram.com/extraboletas/" target="_blank">
                    <Button icon="pi pi-instagram" size="large" class="mr-5 text-white"
                        style="background-color: #3B3B3B;" aria-label="Search" /></a>
                <a href="https://api.whatsapp.com/send?phone=573105208930&text=hola%20buena%20tarde%20estoy%20interesado%20en%20comprar%20una%20boleta"
                    target="_blank">
                    <Button icon="pi pi-whatsapp" size="large" class="text-white bg-extraboleta" aria-label="Search"
                        style="background-color: #3AD774;" /></a>
            </div>
        </div>
        <div class="col-12 lg:col-4">
            <img :src="verticalUpload" alt="localidades-extraboletas" width="100%">

        </div>
        <div class="col-12 lg:col-10 text-center">
            <img :src="localidadUpload" alt="localidades-extraboletas" width="1024">

        </div>

        <div class="col-12 lg:col-10 mb-5 text-center ">
            <h2 class="bg-extraboleta subtitulos">CONDICIONES Y RESTRICCIONES</h2>
            <img :src="imgPoliticas" alt="politicas-extraboletas" width="1024">
        </div>
    </div>
</template>