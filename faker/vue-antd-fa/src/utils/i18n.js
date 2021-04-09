import Vue from 'vue'
import VueI18n from 'vue-i18n'
import routesI18n from '@/router/i18n'
import './Objects'
import { getI18nKey } from '@/utils/routerUtil'

function initI18n(locale, fallback) {
  Vue.use(VueI18n)
  let i18nOptions = {
    locale,
    fallbackLocale: fallback,
    silentFallbackWarn: false
  }
  return new VueI18n(i18nOptions)
}

function generateI18n(lang, routes, valueKey) {
  routes.forEach(route => {
    let keys = getI18nKey(route.fullPath).split('.')
    let value = valueKey === 'path'
                ? route[valueKey]
                  .split('/')
                  .filter(item => !item.startsWith(':') && item != '')
                  .join('.')
                : route[valueKey]
    lang.assignProps(keys, value)
    if (route.children) {
      generateI18n(lang, route.children, valueKey)
    }
  })
  return lang
}

function formatFullPath(routes, parentPath = '') {
  routes.forEach(route => {
    let isFullPath = route.path.substring(0, 1) === '/'
    route.fullPath = isFullPath
                     ? route.path
                     : (parentPath === '/') ? parentPath + route.path : parentPath + '/' + route.path
    if (route.children) {
      formatFullPath(route.children, route.fullPath)
    }
  })
}

function mergeI18nFormRoutes(i18n, routes) {
  formatFullPath(routes)
  const CN = generateI18n(new Object(), routes, 'name')
  const US = generateI18n(new Object(), routes, 'path')
  i18n.mergeLocaleMessage('CN', CN)
  i18n.mergeLocaleMessage('US', US)
  const messages = routesI18n.message
  Object.keys(messages).forEach(lang => {
    i18n.mergeLocalMessage(lang, messages[lang])
  })
}

export {
  initI18n,
  mergeI18nFormRoutes,
  formatFullPath
}
