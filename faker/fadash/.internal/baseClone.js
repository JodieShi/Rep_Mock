import copyObject from './copyObject.js'
import getSymbols from './getSymbols.js'

function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object)
}

export default copySymbols
