if (window.__POWERED_BY_QIANKUN__) {
  // 当使用qiankun微前端框架改造为子应用时，如果加载在父应用上，会有window.__POWERED_BY_QIANKUN__属性，
  // 也有window.__INJECTED_PUBLICK_PATH_BY_QIANKUN__属性，代表资源的publickPath.
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLICK_PATH_BY_QIANKUN__
}
