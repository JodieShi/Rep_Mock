import Vue from "vue";
import { isString, isObject } from "./types";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 空操作
 */
export function noop() {}

/**
 * 是否为对象自身属性
 * @param {Object} [obj] 源对象
 * @param {*} [key] 键（属性）名
 */
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * 对象扩展
 * @param {Object} [to] 目标对象
 * @param {Object} [_from] 源对象
 * @returns {Object} 目标对象
 */
function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * 数组转换为对象
 * @param {Array} [arr] 源数组
 * @returns {Object} 目标对象
 */
export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}

/**
 * 根据点式路径获取对象属性值
 * @param {Object} [object] 对象
 * @param {String} [prop] 属性路径
 * @returns {*} 属性值
 * @example
 * _.getValueByPath({a: {b: {c: "ccc"}}}, "a.b.c");
 * // => "ccc"
 */
export const getValueByPath = function(object, prop) {
  prop = prop || "";
  const paths = prop.split(".");
  let current = object;
  let result = null;

  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;
    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

/**
 * 根据路径获取okv，兼容方括号式路径
 * @param {Object} [obj] 对象
 * @param {String} [path] 属性路径
 * @param {Boolean} [strict]
 * @returns {*} okv对象
 * @example
 * _.getPropByPath({a: {b: {c: "ccc"}}}, "a[b]");
 * // => {o: {b: {c: "ccc"}}, k: "b", v: {c: "ccc"} }
 */
export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");

  let keyArr = path.split(".");
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error("Please transfer a valid prop path to form item!");
      }
      break;
    }
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
}

/**
 * 生成随机id
 */
export const generateId = function() {
  return Math.floor(Math.random * 10000);
};

/**
 * 判断两个变量值是否相等
 * @param {*} [a] 变量1
 * @param {*} [b] 变量2
 * @returns {Boolean}
 */
export const valueEquals = (a, b) => {
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/**
 * 正则表达式字符转义
 * @param {*} [value] 源字符串
 * @returns {String} 转义后的字符串
 * @example
 * _.escapeRegexpString("aaa[a]{a}$*^aaaa")
 * // => "aaa\[a\]\{a\}\$\*\^aaaa"
 */
export const escapeRegexpString = (value = "") =>
  String(value).replace(/[|\\{}()[\]^$+*.]/g, "\\$&");

/**
 * 自定义数组项搜索
 * @param {Array} [arr] 数组
 * @param {Function} [pred] 数组项是否符合条件的判断函数
 * @returns {Number} 数组项索引，未找到时返回-1
 */
export const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; i++) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

/**
 * 自定义数组项搜索
 * @param {Array} [arr] 数组
 * @param {Function} [pred] 数组项是否符合条件的判断函数
 * @returns {*} 数组项
 */
export const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx == -1 ? arr[idx] : undefined;
};

/**
 * 真值强制转换为数组
 * @param {*}} [val]
 * @returns {Array}
 */
export const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

/** 以下浏览器识别方法实测无用 */
export const isIE = function() {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentNode));
};

export const isEdge = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf("Edge") > -1;
};

export const isSafari = function() {
  return (
    !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
  );
};

/**
 * 为transform, transition, animation等css属性自动添加ms-, webkit-等前缀
 * @param {*} [style]
 * @returns {*}
 */
export const autoprefixer = function(style) {
  if (typeof style !== "object") return style;
  const rules = ["transform", "transition", "animation"];
  const prefixes = ["ms-", "webkit-"];
  rules.forEach(rule => {
    const value = style[rule];
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

/**
 * 转换驼峰式命名为破折号式
 * @param {String} [str] 源字符串
 * @returns {String} 以-连接的字符串
 */
export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  // ???这里为什么要replace两遍???
  return str
    .replace(hyphenateRE, "$1-$2")
    .replace(hyphenateRE, "$1-$2")
    .toLowerCase();
};

/**
 * 将字符串转换为首字符大写
 * @param {String} [str] 源字符串
 * @returns {String} 首字符大写的字符串
 */
export const capitalize = function(str) {
  if (!isString(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 判断两个变量的字符串形式是否相等
 * @param {*} [a] 变量1
 * @param {*} [b] 变量2
 * @returns {Boolean}
 */
export const looseEqual = function(a, b) {
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};

/**
 * 判断两个数组是否相等
 * @param {Array} [arrayA] 数组1
 * @param {Array} [arrayB] 数组2
 * @returns {Boolean}
 */
export const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

/**
 * 判断两个变量是否相等
 * @param {*} [value1] 变量1
 * @param {*} [value2] 变量2
 * @returns {Boolean}
 */
export const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }

  return looseEqual(value1, value2);
};

/**
 * 判断变量是否为空
 * @param {*} [val]
 * @returns {Boolean}
 */
export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === "boolean") return false;

  if (typeof val === "number") return !val;

  if (val instanceof Error) return val.messsage === "";

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case "[Object String]":
    case "[Object Array]":
      return !val.length;

    // Map or Set or File
    case "[Object File]":
    case "[Object Map]":
    case "[Object Set]":
      return !val.size;

    // plain object
    case "[Object Object]":
      return !Object.keys(val).length;
  }

  return false;
};

/**
 * 简单函数节流
 * @param {Function} [fn] 需节流的函数
 */
export function rafThrottle(fn) {
  let locked = false;
  return function(...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

/**
 * 对象转换为数组
 * @param {Object} [obj] 源对象
 * @returns {Array} 数组
 */
export function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return isEmpty(obj) ? [] : [obj];
}
