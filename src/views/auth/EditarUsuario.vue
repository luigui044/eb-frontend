<template>
    <div class="w-full">
        <div class="grid  justify-content-center text-center">
            <div class="col-6 surface-card p-4 shadow-2 border-round">
                <div class="text-center mb-5">
                    <img :src="Logo" alt="Extraboletas" width="250px">
                    <div class="text-900 text-3xl font-medium mb-3">Editar usuario</div>

                </div>

                <div>
                    <form @submit.prevent="actualizarUsuario">
                        <div class="grid">
                            <Minimenu></Minimenu>
                            <div class="col-6">
                                <label for="name" class="block text-900 font-medium mb-2">Nombre
                                    Completo</label>
                                <InputText v-model="name" id="name" type="text" class="w-full mb-3" />
                            </div>
                            <div class="col-6">
                                <label for="email" class="block text-900 font-medium mb-2">Correo</label>
                                <InputText v-model="email" :class="{ 'p-invalid': !isValidEmail }" class="w-full"
                                    @input="validateEmail" :feedback="emailFeedback">
                                </InputText>
                            </div>
                            <div class="col-4">

                                <label for="cedula" class="block text-900 font-medium mb-2 ">Cédula </label>
                                <InputText v-model="cedula" id="cedula" type="text" class="w-full mb-3" />
                            </div>
                            <div class="col-4">

                                <label for="password" class="block text-900 font-medium mb-2 ">Contraseña</label>
                                <InputText v-model="password" id="password" type="text" class="w-full mb-3" />

                            </div>

                            <div class="col-4">
                                <label for="rol" class="block text-900 font-medium mb-2 ">Rol</label>

                                <Dropdown v-model="rolSeleccionado" :options="roles" id="rol" optionLabel="name"
                                    optionValue="value" placeholder="Seleccione rol" class="w-full" />
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
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ref, onMounted } from 'vue';
const userId = ref(null);

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
const originalValues = ref({}); // Objeto para almacenar los valores originales del usuario

const roles = [{ name: 'Administrador', value: 1 }, { name: 'Editor', value: 2 }]

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail.value = emailRegex.test(email.value);
    emailFeedback.value = isValidEmail.value ? '' : 'Correo electrónico no válido';
};

onMounted(async () => {
    userId.value = parseInt(router.currentRoute.value.params.id);
    try {
        const response = await axios.get(`${baseUrl}users/get-user/${userId.value}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        name.value = response.data.name;
        email.value = response.data.email;
        cedula.value = response.data.cedula;
        rolSeleccionado.value = response.data.rol;

        // Almacena los valores originales del usuario
        originalValues.value = {
            name: response.data.name,
            email: response.data.email,
            cedula: response.data.cedula,
            rol: response.data.rol
        };
    } catch (error) {
        console.log(error)
    }
})

const actualizarUsuario = async () => {
    const formData = new FormData();

    // Compara los valores actuales con los originales para determinar qué campos han cambiado
    const dataToUpdate = {};
    if (name.value !== originalValues.value.name) {
        dataToUpdate.name = name.value;
    }
    if (email.value !== originalValues.value.email) {
        dataToUpdate.email = email.value;
    }
    if (password.value) {
        dataToUpdate.password = password.value;
    }
    if (rolSeleccionado.value !== originalValues.value.rol) {
        dataToUpdate.rol = rolSeleccionado.value;
    }
    if (cedula.value !== originalValues.value.cedula) {
        dataToUpdate.cedula = cedula.value;
    }

    // Agrega al formData solo los campos que han sido modificados
    Object.entries(dataToUpdate).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        const response = await axios.post(`${baseUrl}users/update-user/${userId.value}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                text: 'El usuario ha sido actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                router.push({ name: 'dashboard' });
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar usuario' + response.status,
                text: 'No se pudo actualizar el usuario',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al actualizar usuario',
            text: 'No se pudo actualizar el usuario',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
</script>
