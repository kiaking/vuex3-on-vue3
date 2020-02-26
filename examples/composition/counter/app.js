import 'babel-polyfill'
import { createApp } from 'vue'
import Vuex from 'vuex'
import Counter from './Counter.vue'
import store from './store'

const app = createApp(Counter)

app.use(store)

app.mount('#app')
