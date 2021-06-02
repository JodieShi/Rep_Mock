import baseClone from './.internal/baseClone.js'

const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeepWith(value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer)
}

export default cloneDeepWith
