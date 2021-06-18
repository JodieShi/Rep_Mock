import eq from './eq.js'

const objectProto = Object.prototype

const hasOwnProperty = objectProto.hasOwnProperty

function defaults(object, ...sources) {
  object = Object(object)
  sources.forEach((source) => {
    if (source !== null) {
      source = Object(source)
      for (const key in source) {
        const value = object[key]
        if (value === undefined ||
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
          object[key] = source[key]
        }
      }
    }
  })
  return object
}

export default defaults
