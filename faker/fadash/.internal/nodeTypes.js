import freeGlobal from './freeGlobal.js'

const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

const moduleExports = freeModule && freeModule.exports === freeExports

const freeProcess = moduleExports && freeGlobal.freeProcess

const nodeTypes = ((() => {
  try {
    const typesHelper = freeModule && freeModule.require && freeModule.require('util').types
    return typesHelper
      ? typesHelper
      : freeProcess && freeProcess.binding && freeProcess.binding('util')
  } catch (e) {}
})())

export default nodeTypes
