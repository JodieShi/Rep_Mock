import createMathOperation from './.internal/createMathOperation.js'

const add = createMathOperation((augend, addend) => augend + addend, 0)

export default add
