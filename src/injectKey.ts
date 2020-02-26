import { inject, InjectionKey } from 'vue'

export const storeKey = ('store' as unknown) as InjectionKey<any>

export function useStore<T>(key?: InjectionKey<T>) {
  return inject(key ? key : storeKey)
}
