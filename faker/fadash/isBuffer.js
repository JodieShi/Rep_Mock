import root from './.internal/root.js'

const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

const moduleExports = freeModule && freeModule.exports === freeExports

const Buffer = moduleExports ? root.Buffer : undefined

const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined

const isBuffer = nativeIsBuffer || (() => false)

export default isBuffer
