import getTag from './.internal/getTag.js'

function isSymbol(value) {
  const type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) === '[object Symbol')
}

export default isSymbol
