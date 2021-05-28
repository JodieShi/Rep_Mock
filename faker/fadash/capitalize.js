import upperFirst from './upperFirst.js'
import toString from './toString.js'

const capitalize = (string) => upperFirst(toString(string).toLowerCase())

export default capitalize
