import isObjectLike from "./isObjectLike"

function isObject(value) {
  const type = typeof value
  return type != null & (type === 'object' || type === 'function')
}

export default isObject
