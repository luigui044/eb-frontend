<template>
    <div class="w-full">
        <div class="grid  justify-content-center text-center">
            <div class="col-6 surface-card p-4 shadow-2 border-round">
                <div class="text-center mb-5">
                    <img :src="Logo" alt="Extraboletas" width="250px">
                    <div class="text-900 text-3xl font-medium mb-3">Crear nuevo usuario</div>

                </div>

                <div>
                    <form @submit.prevent="crearUsuario">
                        <div class="grid">
                            <Minimenu></Minimenu>
                            <div class="col-6">
                                <label for="name" class="block text-900 font-medium mb-2">Nombre
                                    Completo</label>
                                <InputText v-model="name" id="name" type="text" class="w-full mb-3" required />
                            </div>
                            <div class="col-6">
                                <label for="email" class="block text-900 font-medium mb-2">Correo</label>
                                <InputText v-model="email" :class="{ 'p-invalid': !isValidEmail }" class="w-full"
                                    @input="validateEmail" :feedback="emailFeedback" required>
                                </InputText>
                            </div>
                            <div class="col-4">

                                <label for="cedula" class="block text-900 font-medium mb-2 ">Cédula </label>
                                <InputMask v-model="cedula" mask="9999999999" placeholder="C.C" id="cedula" type="text"
                                    class="w-full mb-3" required />
                            </div>
                            <div class="col-4">

                                <label for="password" class="block text-900 font-medium mb-2 ">Contraseña</label>
                                <InputText v-model="password" id="password" type="text" class="w-full mb-3" required
                                    readonly />

                            </div>
                            <div class="col-3 align-content-center">
                                <Button label="Generar Contraseña" @click="generarClave" icon="pi pi-key"
                                    class="w-full mt-3" severity="info"></Button>
                            </div>

                            <div class="col-4">
                                <label for="rol" class="block text-900 font-medium mb-2 ">Rol</label>

                                <Dropdown v-model="rolSeleccionado" :options="roles" id="rol" optionLabel="name"
                                    optionValue="value" placeholder="Seleccione rol" class="w-full" required />
                            </div>


                        </div>

                        <Button label="Crear usuario" icon="pi pi-cloud-upload" class="w-full mt-3"
                            type="submit"></Button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import Minimenu from '../../components/Minimenu.vue';
import Logo from '../../assets/img/logoEB.png';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ref } from 'vue';

const router = useRouter();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');
const password = ref();
const name = ref();
const email = ref();
const cedula = ref();
const rolSeleccionado = ref();
const isValidEmail = ref(true);
const emailFeedback = ref('');

const roles = [{ name: 'Administrador', value: 1 }, { name: 'Editor', value: 2 }]

const generarClave = () => {
    const claveAleatoria = generarClaveAleatoria();

    password.value = claveAleatoria;
};

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail.value = emailRegex.test(email.value);
    emailFeedback.value = isValidEmail.value ? '' : 'Correo electrónico no válido';
};

const generarClaveAleatoria = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let clave = '';
    for (let i = 0; i < 12; i++) {
        clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return clave;
};


const crearUsuario = async () => {
    const formData = new FormData();

    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('rol', rolSeleccionado.value);
    formData.append('cedula', cedula.value);

    try {
        const response = await axios.post(`${baseUrl}users/signup`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado',
                text: 'El usuario ha sido creado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                router.push({ name: 'dashboard' });

            }, 1500);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear usuario',
                text: 'No se pudo crear el usuario',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                router.push({ name: 'dashboard' });

            }, 1500);
        }
    }
    catch (error) {
        console.log(error);
    }
}

</script>