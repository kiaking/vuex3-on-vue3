<template>
  <div>
    t: {{ test }}
    Value: {{ count }}
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    <div>
      <div>Recent History (last 5 entries): {{ recentHistory }}</div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  setup () {
    const store = inject('store')

    const test = computed(() => store.getters.t)
    const count = computed(() => store.getters.count)

    return {
      test,
      count,
      recentHistory: store.getters.recentHistory,
      increment: () => store.dispatch('increment'),
      decrement: () => store.dispatch('decrement'),
      incrementIfOdd: () => store.dispatch('incrementIfOdd'),
      incrementAsync: () => store.dispatch('incrementAsync')
    }
  }
}
</script>
