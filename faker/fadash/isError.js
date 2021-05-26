import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'
import isPlainObject from './isPlainObject.js'

function isError(value) {
  if (!isObjectLike(value)) {
    return false
  }
  const tag = getTag(value)
  return tag == '[object Error]' || tag == '[object DOMException]' ||
    (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value))
}

export default isError
