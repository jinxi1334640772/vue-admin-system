import i18n from '../lang'

const MODULE_KEY = '_moduleKey'

function $$t(...params) {
  if (!params.length) {
    return
  }

  let moduleKey
  if (this.hasOwnProperty(MODULE_KEY) && this[MODULE_KEY]) {
    moduleKey = this[MODULE_KEY]
  } else {
    moduleKey = getModuleKey(this.$route)
    this[MODULE_KEY] = moduleKey
  }
  if (!moduleKey) {
    return
  }

  const key = params.shift()
  return i18n.t(moduleKey + '.' + key, ...params)
}

function $$tc(...params) {
  if (!params.length) {
    return
  }

  let moduleKey
  if (this.hasOwnProperty(MODULE_KEY) && this[MODULE_KEY]) {
    moduleKey = this[MODULE_KEY]
  } else {
    moduleKey = getModuleKey(this.$route)
    this[MODULE_KEY] = moduleKey
  }
  if (!moduleKey) {
    return
  }

  const key = params.shift()
  return i18n.tc(moduleKey + '.' + key, ...params)
}

function integrateLang(lang, route) {
  if (!lang) {
    return
  }

  const thisRoute = route || this.$route
  if (!thisRoute) {
    return
  }

  const moduleKey = getModuleKey(thisRoute)
  if (!moduleKey) {
    return
  }

  const hasModule = i18n.te(moduleKey)
  if (hasModule) {
    return
  }

  const local = { zh: {}, en: {}}
  local.zh[moduleKey] = {}
  local.en[moduleKey] = {}

  if (lang.zh) {
    for (const key in lang.zh) {
      local.zh[moduleKey][key] = lang.zh[key]
    }
  }
  if (lang.en) {
    for (const key in lang.en) {
      local.en[moduleKey][key] = lang.en[key]
    }
  }

  i18n.mergeLocaleMessage('zh', local.zh)
  i18n.mergeLocaleMessage('en', local.en)
}

function getModuleKey(route) {
  // let moduleKey = route.path;
  const moduleKey = route.name
  if (!moduleKey) {
    return
  }
  // moduleKey = moduleKey.replace(/\//g, '_');
  return moduleKey
}

export default {
  $$t,
  $$tc,
  integrateLang
}
