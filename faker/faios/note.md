# 目录结构
## 项目目录结构
```
    |-- .github                 # github配置
    |-- dist                    # axios构建目标目录
    |-- examples                # axios examples
    |-- lib                     # axios实现
    |   |-- axios.js            # 入口文件，构造函数及实例化
    |   |-- defaults.js         # 默认配置
    |   |-- utils.js            # 公共工具库
    |   |-- adapters            # 请求发送适配
    |   |   |-- http.js         # node环境，http
    |   |   |-- xhr.js          # 浏览器环境，xhr
    |   |-- cancel              # 取消功能实现
    |   |-- core                # 核心功能
    |   |   |-- Axios.js        # Axios构造函数及实例化
    |   |-- helpers             # 辅助方法
    |-- sandbox                 # 运行沙盒
    |-- test                    # 自动化测试
```
## 主要实现目录/文件说明
### axios.js
入口文件。该模块输出Axios实例axios，暴露相关API。
### defaults.js
默认配置文件。该模块输出请求默认配置。
### utils.js
公共工具文件。该模块输出各工具函数。
### adapters，请求适配
请求适配处理。
```
|-- adapters
|   |-- http.js
|   |-- xhr.js
```
### cancel，请求取消
取消请求处理。
```
|-- cancel
|   |-- Cancel.js
|   |-- CancelToken.js
|   |-- isCancel.js
```
### core，核心功能
核心功能实现。
```
|-- core
|   |-- Axios.js
|   |-- buildFullPath.js
|   |-- createError.js
|   |-- dispatchRequest.js
|   |-- enhanceError.js
|   |-- InterceptorManager.js
|   |-- mergeConfig.js
|   |-- settle.js
|   |-- transformData.js
```
### help，辅助功能
辅助功能实现。
```
|-- helpers
|   |-- bind.js
|   |-- buildURL.js
|   |-- combineURLs.js
|   |-- cookies.js
|   |-- deprecatedMethod.js
|   |-- isAbsoluteURL.js
|   |-- isAxiosError.js
|   |-- isURLSameOrigin.js
|   |-- normalizeHeaderName.js
|   |-- parseHeaders.js
|   |-- spread.js
|   |-- validator.js
```

## 入口文件 - axios.js
### 模块图
### 模块依赖
```
// 工具库
var utils = require('./utils');
// 上下文绑定
var bind = require('./helpers/bind');
// Axios构造函数
var Axios = require('./core/Axios');
// 合并配置
var mergeConfig = require('./core/mergeConfig');
// 默认配置
var defaults = require('./defaults');
```
### 创建Axios实例
```
/**
 * 创建一个Axios实例
 *
 * @param {Object} defaultConfig Axios实例默认配置
 * @return {Axios} Axios实例
 */
function createInstance(defaultConfig) {
  // 创建一个新Axios对象，作为axios调用的上下文
  var context = new Axios(defaultConfig);
  // Axios.prototype.request.bind(context)，返回的函数中this指定为context，即刚创建的Axios对象，此时instance的任何函数调用实际为Axios.prototype.request函数在Axios对象绑定下的函数调用
  var instance = bind(Axios.prototype.request, context);

  // 将Axios.prototype的属性复制给实例
  utils.extend(instance, Axios.prototype, context);

  // 将Axios对象的属性复制给实例
  utils.extend(instance, context);

  // 返回该实例
  return instance;
}

// 使用默认配置创建一个Axios实例
var axios = createInstance(defaults);
```
### 暴露静态方法
```
// 暴露Axios类，允许类继承
axios.Axios = Axios;

// 暴露API：axios.create([config])，功能：使用自定义配置创建新实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// 暴露API: axios.CancelToken，功能：取消一个请求；axios.isCancel()
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// 暴露API：axios.all(promises)，功能：包装Promise.all()函数，从而支持并发多个请求，返回一个Promise对象，当所有请求完成时执行then方法
axios.all = function all(promises) {
  return Promise.all(promises);
};
// 暴露API：axios.spread(callback)，功能：返回包裹函数，返回函数入参为数组，对数组中的每项调用callback函数，常用于axios.all(promises )的then方法，以处理axios.all(promises)请求数组的结果数组
axios.spread = require('./helpers/spread');

// 暴露API：axios.isAxiosError(obj)，功能：判断是否为Axios抛出的AxiosError
axios.isAxiosError = require('./helpers/isAxiosError');
```
### 模块输出
```
// 模块输出
module.exports = axios;

// 模块输出，兼容TypeScript使用默认导入语法
module.exports.default = axios;
```

## 默认配置 - defaults.js
### 模块图
### 模块依赖
```
// 工具库
var utils = require('./utils');
// 正规化请求头名称
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
// 构造AxiosError
var enhanceError = require('./core/enhanceError');
```
### 辅助函数
```
/**
 * 设置Content-Type
 * @param {Object} headers 请求头
 * @param {any} value Content-Type值
 */
function setContentTypeIfUnset(headers, value) {
  // headers非undefined且headers['Content-Type']未定义时，设置headers['Content-Type']为value
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

/**
 * 获取默认的请求适配器
 * @return {AxiosAdapter}
 */
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // 浏览器环境使用XHR适配器
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // node环境使用HTTP适配器
    adapter = require('./adapters/http');
  }
  return adapter;
}
```
### 默认配置项
```
// 默认Content-Type：'application/x-www-form-urlencoded'
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

// 默认配置对象
var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  // 根据执行环境获取默认请求适配器
  adapter: getDefaultAdapter(),

  // 默认请求转换，修改请求数据
  transformRequest: [function transformRequest(data, headers) {
    // 正规化请求头中'Accept'和'Content-Type'字段名
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    
    /* 根据配置中data的数据类型对data进行转换 */
    // FormData, Buffer, ArrayBuffer, Stream, File, Blob等二进制类型数据直接返回
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    // ArrayBufferView类型返回data.buffer
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    // URLSearchParams类型返回data.toString()，即形如'a=b&c=d'的查询字符串表示，同时设置Content-Type
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    // 对象类型，且请求的Content-Type为'application/json'时返回data的JSON序列化字符串，同时设置Content-Type
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return JSON.stringify(data);
    }
    // 其它情况直接返回data
    return data;
  }],

  // 默认响应转化，在传递给then/catch前修改响应数据
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    // 是否强制解析JSON
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    // 是否严格解析JSON，非静默解析且responseType为'json'时为真
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    // 在以下条件时尝试返回JSON.parse(data)
    // 1. 严格解析
    // 2. 强制解析，且data为非空字符串
    // 解析失败时，在严格解析模式下若为语法错误则抛出该错误
    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    // 其它情况直接返回data
    return data;
  }],

  /**
   * 请求超时设置，单位：毫秒，为0时表示无超时限制，默认为0
   */
  timeout: 0,

  // xsrf-token值对应的cookie名称
  xsrfCookieName: 'XSRF-TOKEN',
  // 携带xsrf-token值的http请求头中对应名称
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // node环境中http响应内容的最大字节数
  maxContentLength: -1,
  // 弄得黄金中http请求内容的最大字节数
  maxBodyLength: -1,

  // 决定对于给定的HTTP状态码是resolve还是reject
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

// 设置通用默认请求头，字段'Accept'，值'application/json, text/plain, */*'
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

// 设置delete, get, head方法默认请求头
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

// 设置post, put, patch方法默认请求头，字段'Content-Type'，值'application/x-www-form-urlencoded'
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
```
