import LocalStorage from 'lowdb/adapters/LocalStorage'

const low = require('lowdb')
const localStorage = new LocalStorage('db')
const db = low(localStorage)
const DEFAULT_USER_DB_NAME = 'user'
const DEFAULT_SYS_DB_NAME = 'sys'

/**
 * sys: 存储用户无关数据
 * user: 存储用户相关数据
 */
db.defaults({
  sys: {},
  user: {}
}).write()

db.pathInit = function({
  dbName = '',
  path = '',
  user = false,
  validator = () => true,
  defaultValue = undefined
}) {
  let userName
  if (user) {
    userName = db.getItem('UserName')
  }

  let currentPath
  if (user && userName) {
    // 分用户存储
    if (!dbName) {
      dbName = DEFAULT_USER_DB_NAME
    }
    currentPath = `${dbName}.${userName}`
  } else {
    if (!dbName) {
      dbName = DEFAULT_SYS_DB_NAME
    }
    currentPath = `${dbName}`
  }
  currentPath = `${currentPath}${path ? `.${path}` : ''}`
  const value = db.get(currentPath).value()
  if (!(value !== undefined && validator(value))) {
    db.set(currentPath, defaultValue).write()
  }
  return currentPath
}

/**
 * 写数据， 仿照localStorage接口实现
 * @param {*} key
 * @param {*} val
 * @param {*} user 是否是分用户存储
 */
db.setItem = function(key, val, user) {
  db.set(db.pathInit({ path: key, user: user }), val).write()
}

// get
db.getItem = function(key, user) {
  return db.get(db.pathInit({ path: key, user: user })).value()
}

// remove
db.removeItem = function(key, user) {
  db.set(db.pathInit({ path: key, user: user }), undefined).write()
}

export default db
