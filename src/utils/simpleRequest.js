import request from './request'
import axios from 'axios'

export function get(url, params, config) {
  config = mergeConfig(config)
  return request({
    url,
    method: 'get',
    params,
    ...config
  })
}

export function post(url, data, config) {
  config = mergeConfig(config)
  return request({
    url,
    method: 'post',
    data,
    ...config
  })
}

export function postAppForm(url, data, config) {
  config = mergeConfig(config)
  const formData = new FormData()
  if (data) {
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key])
      }
    }
  }
  return request({
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData,
    ...config
  })
}

function mergeConfig(config) {
  return Object.assign({ hostType: 'NEW_COMMON' }, config)
}

/**
 * for element upload components.
 * support below props
 * on-success,
 * on-error,
 * on-progress
 *
 * @param
 * option: element-ui provide this.
 */
export function upload(url, option, config) {
  config = mergeConfig(config)
  const formData = new FormData()
  // option.data is the extra params
  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key])
    })
  }
  formData.append(option.filename, option.file, option.file.name)

  return request({
    url,
    method: 'post',
    data: formData,
    timeout: 5 * 60 * 1000,
    isUpload: true,
    ...config,
    onUploadProgress: function progress(ev) {
      if (ev.total > 0) {
        ev.percent = (ev.loaded / ev.total) * 100
      }
      option.onProgress(ev)
    }
  })
    .then((res) => {
      console.log('upload.then', res)
      option.onSuccess(res.data)
      return Promise.resolve(res)
    })
    .catch((err) => {
      console.log('upload failed:', err)
      option.onError(err)
      return Promise.reject(err)
    })
}

/**
 * for aws upload.
 */
export function uploadAws(url, option, config) {
  config = mergeConfig(config)
  const formData = new FormData()
  // option.data is the extra params
  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key])
    })
  }
  formData.append(option.filename, option.file, option.file.name)

  return axios({
    url,
    method: 'PUT',
    data: option.file,
    timeout: 5 * 60 * 1000,
    isUpload: true,
    onUploadProgress: function progress(ev) {
      if (ev.total > 0) {
        ev.percent = (ev.loaded / ev.total) * 100
      }
      option.onProgress(ev)
    }
  })
    .then((res) => {
      console.log('upload.then', res)
      option.onSuccess(res.data)
      return Promise.resolve(res)
    })
    .catch((err) => {
      console.log('upload failed:', err)
      option.onError(err)
      return Promise.reject(err)
    })
}

// 直接使用该方法下载外链资源可能会导致跨域错误
// 该方法多用于走接口保存返回字节流到文件
export function download(url, data, config) {
  return request({
    url,
    method: 'post',
    data,
    isDownload: true,
    responseType: 'blob',
    timeout: 300000,
    ...config
  })
    .then((res) => {
      const link = document.createElement('a')
      const blob = new Blob([res.data])
      link.download = res.filename
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(blob)
      return Promise.resolve(res)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
