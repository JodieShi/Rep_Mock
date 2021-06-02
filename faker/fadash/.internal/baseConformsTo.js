function baseConformsTo(object, source, props) {
  let length = props.length
  if (object == null) {
    return length
  }
  object = Object(object)
  while (length--) {
    const key = props[length]
    const predicate = source[key]
    const value = object[key]

    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false
    }
  }
  return true
}

export default baseConformsTo
