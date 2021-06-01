import arrayLikeKeys from './.internal/arrayLikeKeys.js'
import isArrayLike from './isArrayLike.js'

function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
}

export default keys
