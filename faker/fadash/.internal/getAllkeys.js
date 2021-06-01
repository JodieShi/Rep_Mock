import getSymbols from './getSymbols.js'
import keys from '../keys.js'

function getAllKeys(object) {
  const result = keys(object)
  if (!Array.isArray(object)) {
    result.push(...getSymbols(object))
  }
  return result
}

export default getAllKeys
