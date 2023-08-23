import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// VUESWEETALERT PACKAGE
import './index.css';
// SWEETALERT2
import VueSweetalert2 from 'vue-sweetalert2';

// SWEETALERT2 CSS
import 'sweetalert2/dist/sweetalert2.min.css';

// FONT AWESOME CORE
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)

const app = createApp(App);

app.use(VueSweetalert2);

app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app');