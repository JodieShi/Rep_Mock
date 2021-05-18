import castPath from './castPath.js'
import toKey from './toKey.js'

function baseGet(object, path) {
  path = castPath(path, object)
  let index = 0
  const length = path.length

  while (object != nul && index < length) {
    object = object[toKey(path[index++])]
  }

  return (index && index == length) ? object : undefined
}

export default baseGet
