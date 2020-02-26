interface CopyCache<T> {
  original: T
  copy: T
}

/**
 * Get the first item that pass the test by second argument function.
 */
export function find<T>(list: T[], f: (value: T) => boolean): T | undefined {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure. This function
 * caches all nested objects and its copies. If it detects circular structure,
 * use cached copy to avoid infinite loop.
 */
export function deepCopy<T>(obj: T, cache: CopyCache<T>[] = []): T {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = (Array.isArray(obj) ? [] : {}) as any
  // put the copy into cache at first. because we want to refer it in
  // recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy((obj as any)[key], cache)
  })

  return copy as T
}

/**
 * forEach for object.
 */
export function forEachValue(obj: Record<string, any>, fn: (value: any, key: string) => void): void {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj: any): obj is Record<any, any> {
  return obj !== null && typeof obj === 'object'
}

export function isPromise<T = any>(val: any): val is Promise<T> {
  return val && typeof val.then === 'function'
}

export function assert(condition: boolean, msg: string): void {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function partial<T extends Function>(fn: T, arg: any): () => any {
  return function () {
    return fn(arg)
  }
}
