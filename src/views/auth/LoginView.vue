<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Logo from '../../assets/img/logoEB.png';
import Swal from 'sweetalert2'
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const email = ref('');
const password = ref('');
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const router = useRouter();
const loading = ref(false);


const login = async () => {

  loading.value = true;



  if (!validateEmail(email.value)) {

    Swal.fire({
      title: 'Error!',
      text: 'El correo electrónico no es válido',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    return;
  }


  if (!validatePassword(password.value)) {
    Swal.fire({
      title: 'Error!',
      text: 'La contraseña no es válida o esta vacia ',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  try {
    const response = await axios.post(`${baseUrl}users/signin`, {
      email: email.value,
      password: password.value
    });
    let access_token = response.data.access_token;
    let uId = response.data.userId;
    localStorage.setItem('token', access_token);
    localStorage.setItem('userId', uId);
    router.push({ name: 'dashboard' });


  } catch (error) {
    Swal.fire({
      title: `Error ${error.response.status} al iniciar sesión`,
      text: error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    loading.value = false;

  }
};

const getUserData = async () => {


  try {
    const response = await axios.get(`${baseUrl}users/get-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    console.log(response.data)


  } catch (error) {
    console.error('Error al obtener datos de usuario', error);
    return false
  }
};

if (token) {
  // getUserData();
}

// Redireccionar si existe un token y el usuario está en la página de inicio de sesión
if (token && router.currentRoute.value.name === 'login') {
  router.push({ name: 'dashboard' });
}


const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length > 0 && password.length >= 8 && password.length <= 24;
};


</script>
<style>
.sombra {
  box-shadow: 0px 4px 10px white, 0px 0px 2px white, 0px 2px 6px white !important;
}
</style>

<template>
  <div class="grid justify-content-center  align-content-center" style="height: 100vh;">
    <div class="col-4 px-5 ">
      <div class="surface-card py-4 sombra border-round w-full px-5">
        <div class="text-center mb-5">
          <img :src="Logo" alt="Extraboletas" width="250px" class="mb-3" />
          <div class="text-900 text-3xl font-medium mb-3">Extraboletas administración</div>

        </div>

        <div class="px-8">
          <form @submit.prevent="login">
            <label for="email1" class="block text-900 font-medium mb-2">E-mail</label>
            <InputText id="email1" v-model="email" type="text" class="w-full mb-3" />

            <label for="password1" class="block text-900 font-medium mb-2">Contraseña</label>
            <InputText id="password1" v-model="password" type="password" class="w-full mb-3" />


            <Button label="Sign In" type="submit" icon="pi pi-user" class="w-full" :loading="loading" />
          </form>
        </div>
      </div>
    </div>
  </div>

</template>