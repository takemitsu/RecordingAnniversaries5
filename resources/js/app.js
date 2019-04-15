
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const Pickup = Vue.component('pickup', require('./components/pickup').default)
const Entities = Vue.component('entities', require('./components/entities').default)

const Entity = Vue.component('entity', require('./components/entity').default)
const Anniv = Vue.component('anniv', require('./components/anniv').default)

const routes = [
    {path: '/pickup', name: 'pickup', component: Pickup},
    {path: '/entities', name: 'entities', component: Entities},
    {path: '/entities/:entity_id/edit', name: 'entity-edit', component: Entity},
    {path: '/entities/:entity_id/anniv/:anniv_id', name: 'anniv-edit', component: Anniv},
    {path: '/*', redirect: {name: 'pickup'}},
]

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const router = new VueRouter({
    routes
})
Vue.use(VueRouter)
const app = new Vue({
    router
}).$mount('#app')
