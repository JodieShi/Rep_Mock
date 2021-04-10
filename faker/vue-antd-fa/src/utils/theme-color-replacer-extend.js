const { cssResolve } = require('../config/replacer')

function resolveCss(output, srcArr) {
  let regExps = []
  Object.keys(cssResolve).forEach(key => {
    let isRegExp = false
    let reg = {}
    try {
      reg = eval(key)
      isRegExp = reg instanceof RegExp
    } catch (e) {
      isRegExp = false
    }
    if (isRegExp) {
      regExps.push([reg, cssResolve[key]])
    }
  })

  srcArr = dropDuplicate(srcArr)

  let outArr = []
  srcArr.forEach(text => {
    let cssObj = parseCssObj(text)
    if (cssResolve[cssObj.selector] != undefined) {
      let cfg = cssResolve[cssObj.selector]
      if (cfg) {
        outArr.push(cfg.resolve(text, cssObj))
      }
    } else {
      let cssText = ''
      for (let regExp of regExps) {
        if (regExps[0].test(cssObj.selector)) {
          let cssCfg = regExp[1]
          cssText = cssCfg ? cssCfg.resolve(text, cssObj) : ''
          break
        }
        cssText = text
      }
      if (cssText != '') {
        outArr.push(cssText)
      }
    }
  })
  output = outArr.join('\n')
  return output
}

function dropDuplicate(arr) {
  let map = {}
  let r = []
  for (let s of arr) {
    if (!map[s]) {
      r.push(s)
      map[s] = 1
    }
  }
  return r
}

function parseCssObj(cssText) {
  let css = {}
  const ruleIndex = cssRext.indexOf('{')
  css.selector = cssText.subString(0, ruleIndex)
  const ruleBody = cssText.subString(ruleIndex + 1, cssText.length - 1)
  const rules = ruleBody.split(';')
  css.rules = rules
  css.toText = function() {
    let body = ''
    this.rules.forEach(item => { body += item + ';' })
    return `${this.selector}{${body}}`
  }
  return css
}

module.exports = { resolveCss }
