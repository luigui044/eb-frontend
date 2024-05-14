<template>
    <div class="card">
        <div class="p-mb-4">
            <div class="grid">
                <Minimenu></Minimenu>
                <div class="col">
                    <h2 class="p-m-0 text-left">Lista de Eventos</h2>

                </div>

            </div>
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
            <Column field="fecha_evento" header="Fecha de evento">
                <template #body="{ index }">
                    {{ formatDate(index) }}
                </template>
            </Column>
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


                        <Button v-if="getState(index) !== 3" icon="pi pi-trash" class="p-button-rounded p-button-danger"
                            @click="editarEvento(getId(index), 3, index)"
                            v-tooltip="{ value: 'Deshabilitar evento' }" />

                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
    <div class="card">
        <div class="p-mb-4">
            <div class="grid">
                <div class="col">
                    <h2 class="p-m-0 text-left">Lista de usuarios</h2>
                </div>
            </div>
        </div>
        <DataTable v-model:userFilters="userFilters" :value="users" :paginator="true" :rows="10"
            :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem"
            :globalFilterFields="['name', 'email', 'cedula']">
            <template #header>
                <div class="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="userFilters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <Column field="name" header="Nombre de usuario"></Column>
            <Column field="email" header="Correo"></Column>
            <Column field="cedula" header="Cédula"> </Column>
            <Column field="rol" header="Rol">

                <template #body="{ index }">
                    {{ getRol(index) }}
                </template>
            </Column>
            <Column field="estado" header="Estado de evento">
                <template #body="{ index }">
                    <Tag :severity="getUserTagSeverity(index)" :value="getUserTagText(index)" />
                </template>
            </Column>
            <Column header="Acciones">
                <template #body="{ index }">
                    <div>
                        <router-link :to="{ name: 'editarUsuario', params: { id: getIdUser(index) } }">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                v-tooltip="{ value: 'Editar usuario' }" />
                        </router-link>
                        <Button v-if="getUserState(index) !== 2" icon="pi pi-trash"
                            class="p-button-rounded p-button-danger" @click="editUsuario(getUserId(index), 2, index)"
                            v-tooltip="{ value: 'Deshabilitar evento' }" />

                    </div>
                </template>
            </Column>
        </DataTable>
    </div>


</template>
<script setup>
import Minimenu from '../../components/Minimenu.vue';
import Swal from 'sweetalert2';

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');


const eventos = ref([]);
const users = ref([])

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_evento: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ubicacion: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ubicacion: { value: null, matchMode: FilterMatchMode.CONTAINS },

});

const userFilters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cedula: { value: null, matchMode: FilterMatchMode.CONTAINS },

});




const formatDate = (index) => {
    const fechaEvento = eventos.value[index].fecha_evento;
    if (fechaEvento) {
        const date = new Date(fechaEvento);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }
    return ''; // Retornar cadena vacía si no hay fecha
};

onMounted(async () => {


    try {
        const response1 = await axios.get(`${baseUrl}users/get-users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        users.value = response1.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }

    try {
        const response = await axios.get(`${baseUrl}eventos/listar-eventos`);
        eventos.value = response.data;
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
});
const getId = (index) => {
    // Usa el índice como ID o calcula el ID de alguna manera
    return eventos.value[index].id;
};

const getUserId = (index) => {
    // Usa el índice como ID o calcula el ID de alguna manera
    return users.value[index].id;
};


const getState = (index) => {
    // Usa el índice como ID o calcula el ID de alguna manera
    return eventos.value[index].estado;
};

const getUserState = (index) => {
    // Usa el índice como ID o calcula el ID de alguna manera
    return users.value[index].estado;
};

const getIdUser = (index) => {
    // Usa el índice como ID o calcula el ID de alguna manera
    return users.value[index].id;
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

const getUserTagSeverity = (index) => {
    const estado = users.value[index].estado;
    switch (estado) {
        case 1:
            return 'success';
        case 2:
            return 'danger';

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

const getUserTagText = (index) => {
    const estado = users.value[index].estado;
    switch (estado) {
        case 1:
            return 'Habilitado';
        case 2:
            return 'Deshabilitado';

    }
};

const getRol = (index) => {
    const estado = users.value[index].estado;
    switch (estado) {
        case 1:
            return 'Administrador';
        case 2:
            return 'Editor';

    }
}

const editUsuario = async (userId, estado, index) => {
    const formData = new FormData();
    formData.append('estado', estado);

    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás a punto de deshabilitar al usuario. ¿Estás seguro de que quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, deshabilitar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {

        if (parseInt(userId) === parseInt(localStorage.getItem('userId'))) {
            Swal.fire({
                icon: 'error',
                title: 'Accion no permitida',
                text: 'No se puede deshabilitar el usuario con que esta logueado',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}users/update-user/${userId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                // Actualiza el estado del usuario en la lista local de usuarios
                users.value[index].estado = estado;

                // Si el estado es 2 (Deshabilitado), cambia el tagSeverity y el tagText
                if (estado === 2) {
                    users.value[index].tagSeverity = 'danger';
                    users.value[index].tagText = 'Deshabilitado';
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario actualizado',
                    text: 'El usuario ha sido deshabilitado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    router.push({ name: 'dashboard' });
                }, 1500);
            } else {
                throw new Error('Error al actualizar usuario');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar usuario',
                text: 'No se pudo deshabilitar el usuario',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
};


const editarEvento = async (eventoId, estado, index) => {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás a punto de desactivar el evento. ¿Estás seguro de que quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
        const formData = new FormData();
        formData.append('estado', estado);

        try {
            const response = await axios.patch(`${baseUrl}eventos/actualizar-evento/${eventoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Actualiza el estado del evento en la lista local de eventos
                eventos.value[index].estado = estado;

                // Si el estado es 3 (Deshabilitado), cambia el tagSeverity y el tagText
                if (estado === 3) {
                    eventos.value[index].tagSeverity = 'danger';
                    eventos.value[index].tagText = 'Deshabilitado';
                }

                showSuccessMessage();
            } else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al actualizar los cambios.' + error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }
};

</script>