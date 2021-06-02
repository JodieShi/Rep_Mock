import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'

function isArguments(value) {
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}

export default isArguments
