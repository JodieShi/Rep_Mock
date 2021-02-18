export function isString(obj) {
  return Object.prototype.toString.call(obj) === "[Object String]";
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[Object Object]";
}

export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = functionToCheck => {
  var getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === "[Object Function]"
  );
};

export const isUndefined = val => {
  return val === void 0;
};

export const isDefined = val => {
  return val !== undefined && val !== null;
};
