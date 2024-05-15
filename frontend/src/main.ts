import {createApp} from 'vue'
import './style.css'
import './output.css'
import App from './App.vue'
import router from './utils/router'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faBolt} from '@fortawesome/free-solid-svg-icons'
import {faTv} from '@fortawesome/free-solid-svg-icons'
import {faSitemap} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core"

library.add(faBolt)
library.add(faTv)
library.add(faSitemap)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
