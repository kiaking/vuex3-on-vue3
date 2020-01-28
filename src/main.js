import { createApp } from 'vue'
import Vuex from './vuex'
// import App from './App.vue'

const app = createApp()

app.use(Vuex)

const store = new Vuex.Store({})

const Application = {
  store
}

app.mount(Application, '#app')
