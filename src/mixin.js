export default function (app, store, injectKey = 'store') {
  // TODO: Inject store instance to Vue instance to make `this.$store`
  // available. Not sure how to do that but when the time comes, I
  // think it would be easy.

  // TODO: Maybe we should use Symbol gor the key...?
  app.provide(injectKey, store)

  app.mixin({
    inject: [injectKey]
  })
}
