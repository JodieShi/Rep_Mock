"use strict";

var utils = require('./utils');
var bind = require('./helpers/bind')
var Faios = require('./core/Faios')
var mergeConfig = require('./core/mergeConfig')
var defaults = require('./defaults')

function createInstance(defaultConfig) {
  var context = new Faios(defaultConfig);
  var instance = bind(Faios.prototype.request, context);

  utils.extend(instance, Faios.prototype, context);

  utils.extend(instance, context);

  return instance;
}

var faios = createInstance(defaults);

faios.Faios = Faios;

faios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(faios.defaults, instanceConfig));
}

faios.Cancel = require('./cancel/Cancel');
faios.CancelToken = require('./cancel/CancelToken');
faios.isCancel = require('./cancel/isCancel');

faios.all = function all(promises) {
  return Promise.all(promises);
}
faios.spread = require('./helpers/spread');

faios.isFaiosError = require('./helpers/isFaiosError');

module.exports = faios

module.exports.default = faios
