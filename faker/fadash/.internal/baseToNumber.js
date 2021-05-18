import isSymbol from '../isSymbol.js'

const NAN = 0 / 0

function baseToNumber(value) {
  if (typeof value === 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }
  return +value
}

export default baseToNumber
