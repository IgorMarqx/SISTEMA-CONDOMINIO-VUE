import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './index.css';
// SWEETALERT2
import VueSweetalert2 from 'vue-sweetalert2';

// SWEETALERT2 CSS
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(VueSweetalert2);

app.use(router);

app.mount('#app');