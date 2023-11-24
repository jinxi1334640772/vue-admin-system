export default {
  bind: (el, binding, vnoding) => {
    let custClickFunc
    let throttleTime
    if (binding.value instanceof Function) {
      custClickFunc = binding.value
    } else if (binding.value) {
      custClickFunc = binding.value['click']
      throttleTime = binding.value['throttle']
    }
    if (!throttleTime) {
      throttleTime = 1000
    }

    el.addEventListener('click', (event) => {
      if (!el.isDisableClick) {
        if (custClickFunc) {
          el.isDisableClick = true
          custClickFunc()
          setTimeout(() => {
            el.isDisableClick = false
          }, throttleTime)
        }
      }
    })
  }
}
