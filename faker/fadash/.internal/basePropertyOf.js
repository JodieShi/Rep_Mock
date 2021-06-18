function basePropertyOf(object) {
  return (key) => object == null ? undefined : object[key]
}

export default basePropertyOf
