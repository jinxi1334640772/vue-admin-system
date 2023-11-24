import store from '@/store'

const CHECK_TYPE = {
  OR: 'or',
  AND: 'and'
}

function hideEl(el, isHidden) {
  el.hidden = isHidden
}

function hasPermission(binding) {
  const permissions = store.getters && store.getters.permissions
  if (permissions === undefined || permissions == null) {
    return false
  }
  let hasPermission = false
  const checkType = binding.arg
  const checkPermissions = binding.value
  if (!checkType || !Array.isArray(checkPermissions)) {
    if (checkPermissions === '') {
      hasPermission = true
    } else {
      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].permitId === checkPermissions) {
          hasPermission = true
          break
        }
      }
    }
  } else if (checkPermissions.length > 0) {
    if (checkType === CHECK_TYPE.OR) {
      for (let i = 0; i < permissions.length; i++) {
        if (
          checkPermissions.some(
            (permission) => permission === permissions[i].permitId
          )
        ) {
          hasPermission = true
          break
        }
      }
    } else if (checkType === CHECK_TYPE.AND) {
      let checkSuccessCount = 0
      for (let i = 0; i < permissions.length; i++) {
        if (
          checkPermissions.some(
            (permission) => permission === permissions[i].permitId
          )
        ) {
          ++checkSuccessCount
        }
      }
      hasPermission = checkSuccessCount === checkPermissions.length
    }
  } else {
    hasPermission = true
  }

  return hasPermission
}

export default {
  inserted(el, binding) {
    hideEl(el, !hasPermission(binding))
  },
  componentUpdated(el, binding) {
    hideEl(el, !hasPermission(binding))
  }
}
