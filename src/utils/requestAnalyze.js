import { post } from '@/utils/simpleRequest'
import db from '@/utils/db'

const API_UPLOAD_RECORDS = '/common/notifyRespNetworkLog'

/** local db name */
const RECORD_DB_NAME = 'requestRecord'

/** upload size threshold */
const UPLOAD_SIZE_THRESHOLD = 10

/** upload time interval */
const UPLOAD_INTERVAL = 20 * 1000 // seconds * 1000

class RequestAnalyze {
  requestUrl = '';
  requestNo = null;
  frontRequestTime = null;
  serviceHandlerTime = null;
  frontReceiveTime = null;

  constructor(url, requestNo, requestTime, serviceHandlerTime, receiveTime) {
    this.requestUrl = url
    this.frontRequestTime = requestTime || _createRequestTime()
    this.requestNo = requestNo || _createRequestNo(this.frontRequestTime)
    this.serviceHandlerTime = serviceHandlerTime
    this.frontReceiveTime = receiveTime
  }

  static create(obj) {
    return new RequestAnalyze(
      obj.requestUrl,
      obj.requestNo,
      obj.frontRequestTime,
      obj.serviceHandlerTime,
      obj.frontReceiveTime
    )
  }

  static beforeRequest(config) {
    try {
      const analyzer = new RequestAnalyze(config.url)
      analyzer.beforeRequest(config)
    } catch (err) {
      console.warn('create RequestAnalyze failed:', err)
    }
  }

  static onResponse(response) {
    try {
      const analyzer = response && response.config && response.config.analyzer
      if (analyzer) {
        analyzer.onResponse(response)
      }
    } catch (err) {
      console.warn('RequestAnalyze onResponse error:', err)
    }
  }

  static upload() {
    // NOTE make sure creating a clone version
    const savedData = [...RequestAnalyze.savedRecords]
    if (!savedData || !savedData.length) return

    RequestAnalyze.lastUploadTime = Date.now()

    // NOTE make sure handling all errors, do not show error toast.
    post(
      API_UPLOAD_RECORDS,
      {
        notifyRespNetworkLogList: savedData
      },
      {
        hostType: 'NEW_COMMON',
        errCodes: '*'
      }
    )
      .then((res) => {
        _removeFromSavedAnalyzeData(savedData)
      })
      .catch((err) => {
        console.warn('upload analyze data failed:', err)
      })
  }

  static tryUpload() {
    // when saved records's size is bigger than 20 && upload interval is bigger than UPLOAD_INTERVAL, then upload
    if (
      RequestAnalyze.savedRecords.length >= UPLOAD_SIZE_THRESHOLD &&
      Date.now() - RequestAnalyze.lastUploadTime >= UPLOAD_INTERVAL
    ) {
      RequestAnalyze.upload()
    }
  }

  beforeRequest(config) {
    config.headers['requestNo'] = this.requestNo
    config.headers['frontRequestTime'] = this.frontRequestTime
    config.analyzer = this
  }

  onResponse(response) {
    this.frontReceiveTime = _createReceiveTime()
    this.serviceHandlerTime = response.data && response.data.serviceHandlerTime
    _saveAnalyzeData(this)
  }
}

/** request count in this lifecycle */
RequestAnalyze.requestCount = 0

/** request records in storage */
RequestAnalyze.savedRecords = _getSavedAnalyzeData() || []

/** record deviation between server time and local time */
RequestAnalyze.timeDeviation = null

/** last upload time */
RequestAnalyze.lastUploadTime = 0

// --- params generate ---

function _createRequestNo(time) {
  return (
    ++RequestAnalyze.requestCount +
    '@' +
    parseInt(Math.random() * 100000) +
    '' +
    time
  )
}

function _createRequestTime() {
  return Date.now()
}

function _createReceiveTime() {
  return Date.now()
}

// --- db actions ---

function _saveAnalyzeData(record) {
  if (!record) return
  RequestAnalyze.savedRecords.push(record)
  db.setItem(RECORD_DB_NAME, RequestAnalyze.savedRecords)
  RequestAnalyze.tryUpload()
}

function _getSavedAnalyzeData() {
  return (RequestAnalyze.savedRecords = db.getItem(RECORD_DB_NAME) || [])
}

function _removeFromSavedAnalyzeData(recordList) {
  if (!recordList || !recordList.length) return
  RequestAnalyze.savedRecords = RequestAnalyze.savedRecords.filter(
    (savedRecord) =>
      !recordList.some(
        (recordForRemoving) =>
          recordForRemoving.requestNo === savedRecord.requestNo
      )
  )
  db.setItem(RECORD_DB_NAME, RequestAnalyze.savedRecords)
}

export default RequestAnalyze
