import Vue from 'vue'

import Cookies from 'js-cookie'
// 微前端改造，注入新的publicPath
import './utils/public-path'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // global css

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import App from './App'
import store from './store'
import router, { resetRouter } from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

let instance = null
function render() {
  instance = new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
  })
}
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
// 必须的三个微应用钩子函数
export async function bootstrap(props) {
  console.log('vue微前端触发bootsstrap钩子', props)
}
export async function mount(props) {
  console.log('vue微前端触发mount钩子', props)
  render(props)
}
export async function unmount(props) {
  console.log('vue微前端触发unmount钩子', props)
  instance.$destroy()
  instance = null
  // 卸载路由和路由监听
  resetRouter()
  // router = null
}
