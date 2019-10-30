import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import bootstrap from './bootstrap'
bootstrap()

Vue.component('guest-layout', require('./layout/guest').default)
Vue.component('default-layout', require('./layout/default').default)

Vue.component('auth-register', require('./components/auth/register').default)
Vue.component('auth-login', require('./components/auth/login').default)

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

Vue.use(VueRouter)
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    vuetify: new Vuetify({})
}).$mount('#app')
