import btnPermissions from './btnPermissions'

const install = function(Vue) {
  Vue.directive('has', btnPermissions)
}

btnPermissions.install = install
export default btnPermissions
