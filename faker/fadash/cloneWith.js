import baseClone from './.internal/baseClone.js'

const CLONE_SYMBOLS_FLAG = 4

function cloneWith(value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return baseClone(value, CLONE_SYMBOLS_FLAG, customizer)
}

export default cloneWith
