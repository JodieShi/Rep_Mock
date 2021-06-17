"use strict";

var utils = require('./../utils');
var defaults = require('./../defaults');

module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};
