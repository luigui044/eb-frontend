<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';

import Button from 'primevue/button';

const items = ref([
    {
        label: 'Descargar Boleta',
        icon: 'pi pi-ticket',
        id: 'descargarBoleta',
        url: 'https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras'
    },
    {
        label: 'Iniciar sesión',
        icon: 'pi pi-user',
        id: 'iniciarSesion',
        url: 'https://sistema.extraboletas.com/perfil.html?tab_seleccionado=mis-compras'

    },


]);
</script>

<template>
    <div class="card">
        <Menubar :model="items" class="centered-menu">
            <template #start>
                <img src="../assets/logo.png" alt="Extraboletas" width="250px">
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex align-items " v-bind="props.action" :href="item.url">
                    <span :class="item.icon" />
                    <span class="ml-2 ">{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut"
                        class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut
                        }}</span>
                    <i v-if="hasSubmenu"
                        :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                </a>
            </template>
            <template #end>
                <!-- <div class="flex align-items-center gap-2">
                    <Button label="Iniciar Sesión" icon="pi pi-user" severity="contrast" raised outlined />
                </div> -->
            </template>
        </Menubar>
    </div>


</template>