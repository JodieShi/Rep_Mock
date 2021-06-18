"use strict";

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.call(null, arr);
  }
}
