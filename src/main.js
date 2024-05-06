import './assets/main.css'
import "primeflex/primeflex.css";
import 'primevue/resources/themes/aura-dark-noir/theme.css'
import 'primeicons/primeicons.css'
import "primevue/resources/primevue.min.css";
import ToastService from 'primevue/toastservice';

import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';


import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.use(router)
app.use(PrimeVue);
app.mount('#app')
app.use(ToastService);
