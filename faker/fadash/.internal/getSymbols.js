const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

const nativeGetSymbols = Object.getOwnPropertySymbols

function getSymbols(object) {
  if (object == null) {
    return []
  }
  object = Object(object)
  return nativeGetSymbols(object).filter((symbol) => propertyIsEnumerable.call(object, symbol))
}

export default getSymbols
