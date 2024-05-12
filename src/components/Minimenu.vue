<template>
    <div class="col-9 text-left">
        <router-link :to="{ name: 'home' }">
            <Button severity="info" icon="pi pi-home" label="Inicio" class="mr-2 "></Button>
        </router-link>
        <router-link :to="{ name: 'dashboard' }" v-if="$route.name !== 'dashboard'">
            <Button severity="info" icon="pi pi-chart-bar" class="mr-2 " label="Dashboard"></Button>
        </router-link>
        <router-link :to="{ name: 'crearEvento' }">


            <Button icon="pi pi-calendar-plus" v-if="$route.name !== 'crearEvento'" label="Crear Nuevo Evento"
                class="float-right" severity="info"></Button>
        </router-link>

    </div>
    <div class="col-3  text-right ">
        <router-link :to="{ name: 'logout' }">
            <Button severity="danger" icon="pi pi-sign-out" label="Cerrar sesión" @click="logout" :loading="loading" />
        </router-link>

    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute();

const loading = ref(false);
const logout = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;

    }, 2000);
};

</script>