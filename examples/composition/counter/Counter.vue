<template>
  <div id="app">
    Clicked: {{ state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup () {
    const store = inject('store')

    return {
      state: store.state,
      evenOrOdd: store.getters.evenOrOdd,
      increment: () => store.dispatch('increment'),
      decrement: () => store.dispatch('decrement'),
      incrementIfOdd: () => store.dispatch('incrementIfOdd'),
      incrementAsync: () => store.dispatch('incrementAsync')
    }
  }
}
</script>
