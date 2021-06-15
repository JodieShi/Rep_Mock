"use strict";

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isFaiosError = true;

  error.toJSON = function toJSON() {
    return {
      message: this.message,
      name: this.name,
      // microsoft
      description: this.description,
      number: this.number,
      // mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // faios
      config: this.config,
      code: this.code
    };
  };
  return error;
}
