import throttle from './throttle'

/**
 * 使用方式
 * <button class="base-style click-component" :class="buttonStyle" :disabled="disabled"  v-throttle="{ click: clickHandler, throttle: 2000 } ">
 * <button class="base-style click-component" :class="buttonStyle" :disabled="disabled"  v-throttle="clickHandler ">
 */
throttle.install = function(Vue) {
  Vue.directive('throttle', throttle)
}

export default throttle
