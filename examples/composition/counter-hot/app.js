import { createApp } from 'vue'
import Vuex from 'vuex'
import store from './store'
import CounterControls from './CounterControls.vue'

const app = createApp(CounterControls)

app.use(Vuex, store)

app.mount('#app')
