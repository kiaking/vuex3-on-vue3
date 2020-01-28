<template>
  <h1>Hello, Vue 3.</h1>
</template>

<script>
import Vuex from './vuex'
import { ref } from 'vue'

const store = new Vuex.Store({})

export default {
  store
}
</script>
