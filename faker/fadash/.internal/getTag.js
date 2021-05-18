const toString = Object.prototype.toString

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  } else {
    return toString.call(value)
  }
}

export default getTag
