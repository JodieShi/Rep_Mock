import copyObject from './copyObject.js'
import getSymbolsIn from './getSymbolsIn.js'

function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object)
}

export default copySymbolsIn
