import Cookies from 'js-cookie'

const TOKENKEY = 'xToken'
const COOKIEKEY = '_micro-common-info'
const ENV = process.env.ENV_CONFIG
const DOMAIN = 'payermax.com'
const REG = /payermax\.com$/

export function getCookie() {
  const cookie = getAllCookie()[ENV]
  return cookie && cookie[TOKENKEY]
}

export function setCookie(token) {
  const cookie = getAllCookie()
  if (!cookie[ENV]) {
    cookie[ENV] = {}
  }
  cookie[ENV][TOKENKEY] = token
  // save the token for 1 year
  return new Promise((resolve, reject) => {
    try {
      Cookies.set(COOKIEKEY, cookie, {
        domain: getDomain()
      })
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export function removeCookie() {
  setCookie('')
  return true
}

function getDomain() {
  return ['localhost', '127.0.0.1', '0.0.0.0'].includes(document.domain)
    ? document.domain
    : REG.test(document.domain)
      ? DOMAIN
      : document.domain
}

function getAllCookie() {
  const cookStr = Cookies.get(COOKIEKEY, {
    domain: getDomain()
  })
  if (cookStr && typeof cookStr === 'string') {
    try {
      const cookie = JSON.parse(cookStr)
      if (cookie && typeof cookie === 'object') {
        return cookie
      }
    } catch (e) {
      console.error(e)
    }
  }
  return {}
}
