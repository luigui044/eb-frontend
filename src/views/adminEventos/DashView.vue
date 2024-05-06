<template>
    <div class="card">
        <div class="p-mb-4">
            <h2 class="p-m-0">Lista de Eventos</h2>
        </div>
        <DataTable v-model:filters="filters" :value="eventos" :paginator="true" :rows="10"
            :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem"
            :globalFilterFields="['nombre_evento', 'ubicacion', 'fecha_evento']">
            <template #header>
                <div class="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <Column field="nombre_evento" header="Nombre de Evento"></Column>
            <Column field="ubicacion" header="Ubicación"></Column>
            <Column field="fecha_evento" header="Fecha de evento"></Column>
            <Column field="estado" header="Estado de evento">
                <template #body="{ index }">
                    <Tag :severity="getTagSeverity(index)" :value="getTagText(index)" />
                </template>
            </Column>

            <Column header="Acciones">
                <template #body="{ index }">
                    <div>
                        <router-link :to="{ name: 'editarEvento', params: { id: getId(index) } }">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                v-tooltip="{ value: 'Editar evento' }" />
                        </router-link>
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click=""
                            v-tooltip="{ value: 'Deshabilitar evento' }" />

                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const token = localStorage.getItem('token');
const eventos = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_evento: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ubicacion: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ubicacion: { value: null, matchMode: FilterMatchMode.CONTAINS },

});

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/eventos/listar-eventos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        eventos.value = response.data;
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
});
const getId = (index) => {
    // Usa el índice como ID o calcula el ID de alguna manera
    return eventos.value[index].id;
};

const getTagSeverity = (index) => {
    const estado = eventos.value[index].estado;
    switch (estado) {
        case 1:
            return 'success';
        case 2:
            return 'warning';
        case 3:
            return 'danger';
        case 4:
            return 'primary';
        default:
            return 'info';
    }
};

const getTagText = (index) => {
    const estado = eventos.value[index].estado;
    switch (estado) {
        case 1:
            return 'Habilitado';
        case 2:
            return 'Borrador';
        case 3:
            return 'Deshabilitado';
        case 4:
            return 'Próximamente';
        default:
            return 'Desconocido';
    }
};
</script>