"use strict";

module.exports = function isAbsoluteURL(url) {
  // 形如 <scheme>://
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
