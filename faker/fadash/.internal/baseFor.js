function baseFor(object, iteratee, keysFunc) {
  const iterable = Object(object)
  const props = keysFunc(object)
  let { length } = props
  let index = -1

  while (length--) {
    const key = props[++index]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }

  return object
}

export default baseFor
