const LARGE_ARRAY_SIZE = 200

const root = (typeof global === 'object' && global) || this

const phantom = root.phantom,
  process = root.process,
  amd = root.define ? define.amd : undefined,
  args = toArgs([1, 2, 3]),
  argv = process ? process.argv : undefined,
  identity = function(value) { return value }

let params = argv

const add = function(x, y) { return x + y },
  doubled = function(n) { return n * 2 },
  isEven = function(n) { return n % 2 == 0 },
  square = function(n) { return n * n }

const stubZero = function() { return 0 },
  stubOne= function() { return 1 },
  stubTwo = function() { return 2 },
  stubThree = function() { return 3 },
  stubFour = function() { return 4 }

const falsey = [, null, undefined, false, 0, NaN, '']

const empties = [[], {}].concat(falsey.slice(1))

const filePath = (function() {
  let min = 2,
    result = params || []

  if (phantom) {
    min = 0
    result = params = phantom.args || require('system').args
  }
  const last = result[result.length - 1]
  result = (result.length > min && !/test(?:\.js)?$/.test(last)) ? last : '../node_modules/lodash/lodash.js'

  if (!amd) {
    try {
      result = require('fs').realpathSync(result)
    } catch (e) {}

    try {
      result = require.resolve(result)
    } catch (e) {}
  }
  return result
}())

const _ = root._ || (root._ = interopRequire(filePath))

const oldDash = root._

function toArgs(array) {
  return (function() { return arguments }.apply(undefined, array))
}

function interopRequire(id) {
  const result = require(id)
  return 'default' in result ? result['default'] : result
}

(function() {
  root._ = oldDash
}())

export {
  LARGE_ARRAY_SIZE,
  phantom,
  amd,
  args,
  argv,
  params,
  root,
  identity,
  add,
  doubled,
  isEven,
  square,
  stubZero,
  stubOne,
  stubTwo,
  stubThree,
  stubFour,
  filePath,
  falsey,
  empties,
  _,
  oldDash,
  interopRequire,
  toArgs
}
