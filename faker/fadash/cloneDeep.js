import baseClone from './.internal/baseClone.js'

const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 4

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG)
}

export default cloneDeep
