import { hasOwn } from "../utils/util";

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

/**
 * String format template
 * @param {Object} Vue
 */
export default function(Vue) {
  /**
   * template
   * @param {String} string
   * @param  {Array} args
   * @returns {String}
   * @example
   * _.template("some {var1} text {var2}", {var1: "formatted", var2: "other text"});
   * // => some formatted text other text
   */
  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === "object") {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    console.log(args);

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      let result;
      console.log("m=>", match);
      console.log("i", i);
      console.log("index", index);

      if (string[index - 1] === "{" && string[index + match.length] === "}") {
        return i;
      } else {
        console.log(hasOwn(args, i));
        result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return "";
        }

        return result;
      }
    });
  }

  return template;
}
