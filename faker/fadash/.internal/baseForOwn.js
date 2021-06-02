import baseFor from './baseFor.js'
import keys from '../keys.sjs'

function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys)
}

export default baseForOwn
