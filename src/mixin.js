import { storeKey } from './injectKey'

export default function (app, store, injectKey) {
  app.provide(injectKey || storeKey, store)

  app.mixin({
    beforeCreate () {
      const options = this.$options

      if (!this.parent) {
        this.$store = typeof store === 'function' ? store() : store
      } else {
        const options = this.parent.$options
        this.$store = options.$store
      }
    }
  })
}
