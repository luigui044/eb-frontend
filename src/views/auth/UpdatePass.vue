<template>
    <div class="w-full">
        <div class="grid  justify-content-center text-center">
            <div class="col-6 surface-card p-4 shadow-2 border-round">
                <div class="text-center mb-5">
                    <img :src="Logo" alt="Extraboletas" width="250px">
                    <div class="text-900 text-3xl font-medium mb-3">Actualizar Contraseña</div>
                </div>
                <div>
                    <form @submit.prevent="actualizarUsuario">
                        <div class="grid">
                            <Minimenu></Minimenu>
                            <div class="col-6">
                                <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
                                <Password v-model="password" id="password" type="password" @input="validatePassword"
                                    :feedback="passwordFeedback">
                                </Password>
                            </div>
                            <div class="col-6">
                                <label for="confirm-password" class="block text-900 font-medium mb-2 ">Confirmar
                                    Contraseña</label>
                                <Password v-model="ConfirmPassword" id="confirm-password" type="password"
                                    @input="validateConfirmPassword" :feedback="confirmPasswordFeedback">
                                </Password>
                            </div>
                        </div>
                        <Button label="Actualizar Contraseña" icon="pi pi-cloud-upload" class="w-full mt-3"
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

import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ref } from 'vue';
import Password from 'primevue/password';

const userId = localStorage.getItem('userId');
console.log(userId)
const ConfirmPassword = ref('');
const router = useRouter();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');
const password = ref('');
const passwordFeedback = ref('');
const confirmPasswordFeedback = ref('');
const isValidPassword = ref(true);
const isValidConfirmPassword = ref(true);

const validatePassword = () => {
    isValidPassword.value = password.value.length >= 6; // Define tu lógica de validación de contraseña
    passwordFeedback.value = isValidPassword.value ? '' : 'La contraseña debe tener al menos 6 caracteres';
};

const validateConfirmPassword = () => {
    isValidConfirmPassword.value = password.value === ConfirmPassword.value;
    confirmPasswordFeedback.value = isValidConfirmPassword.value ? '' : 'Las contraseñas no coinciden';
};

const actualizarUsuario = async () => {
    if (!isValidPassword.value || !isValidConfirmPassword.value) {
        return Swal.fire({
            icon: 'error',
            title: 'Error de validación',
            text: 'La contraseña o la confirmación de la contraseña no son válidas.',
            showConfirmButton: false,
            timer: 1500
        });
    }

    const formData = new FormData();
    formData.append('password', password.value);

    try {
        const response = await axios.post(`${baseUrl}users/update-user/${userId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'La contraseña ha sido actualizada correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                router.push({ name: 'dashboard' });
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar contraseña',
                text: 'No se pudo actualizar la contraseña',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al actualizar contraseña',
            text: 'No se pudo actualizar la contraseña',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
</script>
