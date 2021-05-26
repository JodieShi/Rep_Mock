import slice from '../slice.js'

function castSlice(array, start, end) {
  const { length } = array
  end = end === undefined ? length : end
  return (!start && end >= length) ? array : slice(array, start, end)
}

export default castSlice
