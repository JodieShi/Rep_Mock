import getSymbols from './getSymbols.js'

function getSymbolsIn(object) {
  const result = []
  while (object) {
    result.push(...getSymbols[object])
    object = Object.getPrototypeOf(Object[object])
  }
  return result
}

export default getSymbolsIn
