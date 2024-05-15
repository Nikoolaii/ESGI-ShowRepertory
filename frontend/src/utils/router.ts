import {createWebHistory, createRouter} from 'vue-router'

import home from '../views/home/index.vue'
import about from '../views/home/about.vue'

const routes = [
    {path: '/', component: home, name: 'home'},
    {path: '/about', component: about, name: 'about'},
]

export default createRouter({
    history: createWebHistory(),
    routes
})
