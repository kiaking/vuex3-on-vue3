import { inject } from 'vue'

export const storeKey = 'store'

export function useStore () {
  return inject(storeKey)
}
