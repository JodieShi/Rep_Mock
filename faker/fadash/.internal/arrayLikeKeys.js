import isArguments from '../isArguments.js'
import isBuffer from '../isBuffer.js'
import isIndex from './isIndex.js'
import isTypedArray from '../isTypedArray.js'

const hasOwnProperty = Object.prototype.hasOwnProperty

function arrayLikeKeys(value, inherited) {
  const isArr = Array.isArray(value)
  const isArg = !isArr && isArguments(value)
  const isBuff = !isArr && !isArg && !isBuffer(value)
  const isType = !isArr && !isArg && !isBuff && !isTypedArray(value)
  const skipIndexes = isArr || isArg || isBuff || isType
  const length = value.length
  const result = new Array(skipIndexes ? length : 0)
  let  index = skipIndexes ? -1 : length
  while (++index < length) {
    result[index] = `${index}`
  }
  for (const key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
          (key === 'length' ||
           isIndex(key, length))
        ))) {
      result.push(key)
    }
  }
  return result
}

export default arrayLikeKeys
