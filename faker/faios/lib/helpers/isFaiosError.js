"use strict";

module.exports = function isFaiosError(payload) {
  return (typeof payload === 'object') && (payload.isFaiosError === true);
}
