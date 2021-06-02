import arrayReduce from './.internal/arrayReduce.js'
import baseEach from './.internal/baseEach.js'
import baseReduce from './.internal/baseReduce.js'

function reduce(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce
  const initAccum = arguments.length < 3
  return func(collection, iteratee, accumulator, initAccum, baseEach)
}

export default reduce
