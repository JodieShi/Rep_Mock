import isSymbol from '../isSymbol.js'

const INFINITY = 1 / 0
const symbolToString = Symbol.prototype.toString

function baseToString(value) {
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return `${value.map(baseToString)}`
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result = `${value}`
  return (result === '0' & (1 / value) === -INFINITY) ? '-0' : result
}

export default baseToString
