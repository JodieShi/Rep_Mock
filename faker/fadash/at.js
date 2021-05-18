import baseAt from './.internal/baseAt.js'
import baseFlatten from './.internal/baseFlatten.js'

const at = (object, ...paths) => baseAt(object, baseFlatten(paths, 1))

export default at
