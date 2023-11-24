import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import RequestAnalyze from './requestAnalyze'
import { GetUrlRelativePath } from '@/utils/stringUtil'
import qs from 'qs'
import md5 from 'js-md5'
import { getCookie } from '@/utils/cookies'
// this is host config module.
const host = require('../../config/host')

const CANCEL_REQUEST = 'CANCEL_REQUEST'

// 请求幂等处理
// 存储请求的md5信息的对象，请求时存入，请求结束时删除。
// 请求中时，相同请求进来时，应中断，直到上一相同请求结束，才可以再次发起请求
const requestHashObject = {}
/**
 * md5格式化请求信息，同一请求相同传参时，返回值应相同
 * @param {string} url
 * @param {string} method
 * @param {*} data
 */
function getGenerateKey(config, contentType) {
  const url = config.url
  const method = config.method
  const data = config.data || config.params
  // 上传/下载请求不使用幂等
  if (config.isUpload || config.isDownload) {
    return ''
  }
  // OMC 系统中请求  没有额外添加时间戳，以后如果有额外时间戳参数，应在这里删除

  // 将data转成字符串
  // response的data直接为字符串，不需要转换
  let dataJSON = ''
  if (contentType) {
    // contentType为application/x-www-form-urlencoded时，需要通过qs转换
    // 这里将两种content-type的data都通过qs转
    if (
      contentType.indexOf('application/json') > -1 ||
      contentType.indexOf('application/x-www-form-urlencoded') > -1
    ) {
      if (typeof data === 'string') {
        dataJSON = data
      } else {
        dataJSON = qs.stringify(data, { arrayFormat: 'repeat' })
      }
    } else {
      // 其他contentType 不使用幂等 （待以后按需求，添加处理方式）
      return ''
    }
  } else {
    return ''
  }
  // 重新组织url
  const realUrl = url.replace('//', '/')
  return md5(`${realUrl || ''}${method || ''}${dataJSON || ''}`)
}

function removeGenerateKey(key) {
  if (key) {
    delete requestHashObject[key]
  }
}

// create an axios instance
const service = axios.create({
  timeout: 60000, // request timeout
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 接口权限预校验
    const { permissionKey } = config
    if (permissionKey) {
      const storePermissions = store.getters.permissions
      if (!storePermissions.some((perm) => perm.permitId === permissionKey)) {
        return Promise.reject({
          errCodes: CANCEL_REQUEST,
          message: 'no permission'
        })
      }
    }
    // update host by env.
    config.baseURL = host.getBaseUrl(config.hostType, process.env.ENV_CONFIG)
    // no-cache
    // config.headers['Cache-Control'] = 'no-cache';
    // Do something before request is sent
    const token = getCookie()
    if (token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = token
    }

    // 请求幂等
    // generateKey 可能为空字符串，表示不需要幂等处理
    if (config.needIdempotent) {
      const generateKey = getGenerateKey(config, config.headers['Content-Type'])
      if (generateKey) {
        if (requestHashObject[generateKey]) {
          console.log('cancel by idemotent')
          return Promise.reject({
            errCodes: CANCEL_REQUEST,
            message: 'same request is progess'
          })
        }
        requestHashObject[generateKey] = true
        config.requestGenerateKey = generateKey
      }
    }
    // ---请求幂等 end

    // --- for request analyze
    RequestAnalyze.beforeRequest(config)

    return config
  },
  (error) => {
    // Do something with request error
    console.log('interceptors.request', error) // for debug
    Promise.reject(error)
  }
)

// ----------------------------------------------
const CODES = {
  SUCCESS: '200',
  TOKEN_EXPIRED: '502', // token过期
  REPEAT_LOGIN: '503', // 其他地方已登录
  TOKEN_EXPIRE: '413', // token过期
  TEMPORARY_TOKEN_EXPIRE: '415', // 临时token过期
  SUCCESS_BIZECODE: '0000'
}

// respone interceptor
service.interceptors.response.use(
  (response) => {
    // 请求幂等
    // 删除幂等对象里对应的hash值
    removeGenerateKey(response.config.requestGenerateKey)
    // ---请求幂等end
    // --- for request analyze
    RequestAnalyze.onResponse(response)

    // dataAxios 是 axios 返回数据中的 data
    const res = response.data

    // 后端协议将bizCode改成code， message改成msg
    if (!res.bizCode && res.code) {
      res.bizCode = res.code === 'APPLY_SUCCESS' ? CODES.SUCCESS : res.code
    }
    if (!res.message && res.msg) {
      res.message = res.msg
    }

    return isValidResponse(response)
      .then(() => friendlyResponse(response))
      .catch(() => handleErrs(response))
  },
  (error) => {
    if (error.errCodes === CANCEL_REQUEST) {
      return new Promise(() => {})
    }
    error.config && removeGenerateKey(error.config.requestGenerateKey)
    // --- for request analyze
    RequestAnalyze.onResponse(error)

    if (!handleCustomerErrs(error)) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export function convertFormData(data) {
  const resultData = Object.assign({}, data)
  resultData.headers = { 'Content-Type': 'multipart/form-data' }
  const formData = new FormData()
  if (data.data) {
    for (const key in data.data) {
      if (data.data[key]) {
        formData.append(key, data.data[key])
      }
    }
  }
  resultData.data = formData
  return resultData
}

export function isValidResponse(response) {
  return new Promise((resolve, reject) => {
    if (!response || !response.data) {
      return reject()
    }

    // handle exports
    if (response.config.isDownload) {
      if (response.data.type.includes('application/json')) {
        return response.data.text().then((res) => {
          response.data = JSON.parse(res || '{}')
          return reject()
        })
      }
      return resolve()
    }
    [CODES.SUCCESS, CODES.SUCCESS_BIZECODE].includes(response.data.bizCode)
      ? resolve()
      : reject()
  })
}

export function friendlyResponse(response) {
  if (response.config.isDownload) {
    let filename = ''
    if (response.headers) {
      for (const v in response.headers) {
        if (response.headers.hasOwnProperty(v)) {
          if (v.toLowerCase() === 'content-disposition') {
            filename = response.headers[v].split('=')[1] || ''
          }
        }
      }
    }
    filename = filename ? decodeURI(filename.replace(/\"/g, '')) : 'default'
    response.filename = filename
  }
  return response
}

function handleCustomerErrs(response) {
  let errCodes = ''
  if (response.config) {
    errCodes = response.config.errCodes
  } else if (response.errCodes) {
    errCodes = response.errCodes
  }
  if (errCodes === '*') return true
  if (errCodes === CANCEL_REQUEST) return true

  const res = response.data
  return (
    res &&
    Array.isArray(errCodes) &&
    errCodes.some((errCode) => res.bizCode === errCode)
  )
}

function handleErrs(response) {
  if (!response || !response.data) {
    return Promise.reject()
  }
  const res = response.data
  // 后端协议将bizCode改成code， message改成msg
  if (!res.bizCode && res.code) {
    res.bizCode = res.code
  }
  if (!res.message && res.msg) {
    res.message = res.msg
  }
  if (handleCustomerErrs(response)) {
    return Promise.reject({ error: res.bizCode, message: res.message })
  } else {
    const loginUrl = store.loginUrl || `${process.env.LOGIN_URL}`
    const urlData = qs.parse(window.location.href.split('?')[1]) || {}
    let jumpLoginPath = null
    if (urlData.token) {
      jumpLoginPath = `${loginUrl}?orgUrl=${
        window.location.protocol +
        '//' +
        window.location.host +
        GetUrlRelativePath()
      }`
    } else {
      jumpLoginPath = `${loginUrl}?orgUrl=${window.location.href}`
    }
    // 接口502直接跳转登录
    if (res.bizCode === CODES.TOKEN_EXPIRED) {
      store.dispatch('LogOut').then(() => {
        window.location.href = jumpLoginPath
      })
      return Promise.reject()
    }
    if (
      res.bizCode === CODES.REPEAT_LOGIN ||
      res.bizCode === CODES.TOKEN_EXPIRE ||
      res.bizCode === CODES.TEMPORARY_TOKEN_EXPIRE
    ) {
      if (store.vue.messageBoxIsActive) {
        return Promise.reject({ error: res.bizCode, message: res.message })
      }
      store.vue.messageBoxIsActive = true
      MessageBox.confirm(
        store.vue.$t('errorCodeList.error502.content'),
        store.vue.$t('errorCodeList.error502.title'),
        {
          confirmButtonText: store.vue.$t('errorCodeList.error502.okStr'),
          cancelButtonText: store.vue.$t('errorCodeList.error502.cancelStr'),
          type: 'warning'
        }
      )
        .then(() => {
          store.vue.messageBoxIsActive = false
          store.dispatch('LogOut').then(() => {
            window.location.href = jumpLoginPath
          })
        })
        .catch(() => {
          store.vue.messageBoxIsActive = false
        })
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject({ error: res.bizCode, message: res.message })
  }
}

export default service
