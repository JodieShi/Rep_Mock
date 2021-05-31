import freeGlobal from './freeGlobal.js'

const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis

const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self

const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()

export default root
