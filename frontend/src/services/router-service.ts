import {createWebHistory, createRouter} from 'vue-router'
import LocalStorageService from "./local-storage-service.ts";

import home from '../views/home/index.vue'
import about from '../views/home/about.vue'
import register from '../views/auth/register.vue'
import login from '../views/auth/login.vue'
import profileIndex from '../views/connected/profile/index.vue'
import popular from '../views/connected/shows/popular.vue'
import search from '../views/connected/shows/search.vue'
import show from "../views/connected/shows/show.vue";

const routes = [
    {path: '/about', component: about, name: 'about'},
    {path: '/register', component: register, name: 'register'},
    {path: '/login', component: login, name: 'login'},
    {path: '/popular', component: popular, name: 'popular'},
    {path: '/search', component: search, name: 'search'},
    {path: '/shows/:type/:id', component: show, name: 'show'},
]

if (LocalStorageService.getItem('token')) {
    routes.push({path: '/', component: profileIndex, name: 'profile-index'})
} else {
    routes.push({path: '/', component: home, name: 'home'})
}


export default createRouter({
    history: createWebHistory(),
    routes
})
