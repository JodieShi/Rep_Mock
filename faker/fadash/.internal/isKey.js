import isSymbol from '../isSymbol.js'

// 匹配形如a[0].b.c的属性名
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false
  }

  const type = typeof value
  if (type === 'number' || type === 'boolean' || type === null || isSymbol(value)) {
    return true
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}

export default isKey
