import baseConformsTo from './.internal/baseConformsTo.js'
import keys from './keys.js'

function conformsTo(object, source) {
  return source == null || baseConformsTo(object, source, keys(source))
}

export default conformsTo
