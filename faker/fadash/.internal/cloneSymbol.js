const symbolValueOf = Symbol.prototype.valueOf

function cloneSymbol(symbol) {
  return Object(symbolValueOf.call(symbol))
}

export default cloneSymbol
