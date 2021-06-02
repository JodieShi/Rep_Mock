import baseConformTo from './baseConformsTo.js'
import keys from '../keys.js'

function baseConform(source) {
  const props = keys(source)
  return (object) => baseConform(object, source, props)
}

export default baseConform
