import isPrototype from './isPrototype.js'

function initCloneObject(object) {
  return (typeof object.constructor === 'function' && !isPrototype(object))
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}

export default initCloneObject
