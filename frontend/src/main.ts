import {createApp} from 'vue'
import './style.css'
import './output.css'
import App from './App.vue'
import router from './services/router-service.ts'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import fontAwesomeLibrary from "./utils/font-awesome-library.ts";

fontAwesomeLibrary()

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
