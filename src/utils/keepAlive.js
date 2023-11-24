export function microCacheReform(keepAlive, params) {
  if (!keepAlive || !params) {
    return
  }
  keepAlive.created = function() {
    window._globalInfo.vueCaches = window._globalInfo.vueCaches || {}
    let cacheInfo = window._globalInfo.vueCaches[params.sysCode]
    if (cacheInfo) {
      handlerCacheInfo(cacheInfo)
    } else {
      cacheInfo = {
        cache: Object.create(null),
        keys: []
      }
      window._globalInfo.vueCaches[params.sysCode] = cacheInfo
    }
    this.keys = cacheInfo.keys
    this.cache = cacheInfo.cache
  }
  const render = keepAlive.render
  keepAlive.render = function() {
    const slots = this.$slots.default
    const component = getCurrentComponent(slots)
    if (component && component.componentOptions) {
      const key = component.key
      component.key = generateCacheKey(key)
      const newComponent = render.call(this)
      component.key = key
      return newComponent
    }
    return component || (slots && slots[0])
  }
  const destroyed = keepAlive.destroyed
  keepAlive.destroyed = function() {
    if (!params.isDestory) {
      destroyed.call(this)
    }
  }
}

function generateCacheKey(key) {
  if (!key) {
    return key
  }
  const keys = key.split('-')
  return keys[2] || key
}

function getCurrentComponent(slots) {
  if (Array.isArray(slots)) {
    for (let i = 0; i < slots.length; i++) {
      const c = slots[i]
      if (
        !isNull(c) &&
        (!isNull(c.componentOptions) || (c.isComment && c.asyncFactory))
      ) {
        return c
      }
    }
  }
}

function isNull(val) {
  return val === null || val === undefined
}

function handlerCacheInfo(cacheInfo) {
  const cache = cacheInfo.cache || {}
  Object.keys(cache).forEach((key) => {
    if (!cache[key]) {
      delete cache[key]
    }
  })
}
