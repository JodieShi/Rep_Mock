import isKey from './isKey.js'
import stringToPath from './stringToPath.js'

function castPath(value, object) {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(value)
}

export default castPath
