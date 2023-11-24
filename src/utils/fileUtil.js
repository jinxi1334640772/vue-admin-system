/**
 * 文件相关函数
 */

/**
 * 在状态数组中找到某个状态对应的描述
 * @param {*} file 具体文件
 * @return 返回当前值对应的描述
 */
export function isValidImgFile(file) {
  if (file) {
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/bmp' ||
      file.type === 'image/webp'
    ) {
      return true
    }
  }
  return false
}

// 是否是有效的上传图片
export function isValidUploadImg(file) {
  if (isValidImgFile(file)) {
    const isLt5M = file.size / 1024 / 1024 < 5
    return isLt5M
  }
  return false
}

// 是否满足上传大小限制
export function isValidFileSize(file, size = 5) {
  return file.size / 1024 / 1024 < size
}

// 读取csv文件总行数
export function getCsvLinesCnt(file) {
  return new Promise(function(resolve, reject) {
    if (file) {
      const fileReader = new FileReader()
      fileReader.readAsText(file, 'utf-8')
      fileReader.onload = function(evt) {
        const csvLines = fileReader.result.toString().split(/\r\n|\n/)
        let linesNum = 0
        if (csvLines) {
          csvLines.forEach((item) => {
            if (item && item.indexOf('/*') === -1) {
              linesNum++
            }
          })
        }
        resolve(linesNum)
      }
    } else {
      resolve(0)
    }
  })
}

// 判断是否是csv文件
export function isFileType(file, fileTypes) {
  let result = false
  if (file && file.raw && fileTypes) {
    if (file.raw.name) {
      const index = file.raw.name.lastIndexOf('.')
      const name = file.raw.name.substring(index + 1)
      if (name) {
        const lowerName = name.toLowerCase()
        fileTypes.forEach((item) => {
          if (lowerName === item) {
            result = true
          }
        })
      }
    }
  }
  return result
}

export function saveFile(response, defaultFileName) {
  const data = (response || {}).data
  if (!data) {
    return false
  }
  let fileName = defaultFileName
  if (response.headers['content-disposition']) {
    const arr = response.headers['content-disposition'].split('=')
    if (arr.length > 1 && arr[1]) {
      fileName = arr[1]
    }
  }
  const contentType = response.headers['content-type']
  console.log('fileName=' + fileName + ' contentType=' + contentType)
  let blob
  if (data instanceof Blob) {
    blob = data
  } else {
    blob = new Blob([data], {
      type: contentType
    })
  }
  if (window.navigator.msSaveBlob) {
    // for ie 10 and later
    try {
      window.navigator.msSaveOrOpenBlob(blob, fileName)
    } catch (e) {
      console.log(e)
    }
  } else {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}
