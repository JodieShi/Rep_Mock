function create(prototype, properties) {
  prototype = prototype === null ? null : Object(prototype)
  const result = Object.create(prototype)
  return properties == null ? prototype : Object.assign(result, properties)
}

export default create
