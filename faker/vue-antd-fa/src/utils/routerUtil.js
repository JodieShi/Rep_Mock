import routerMap from '@/router/async/router.map'
import { mergeI18nFromRoutes } from '@/utils/i18n'
import Router from 'vue-router'
import deepMerge from 'deepmerge'
import basicOptions from '@/router/async/config.async'

let appOptions = {
  router: undefined,
  i18n: undefined,
  store: undefined
}

function setAppOptions(options) {
  const { router, i18n, store } = options
  appOptions.router = router
  appOptions.store = store
  appOptions.i18n = i18n
}

function parseRoutes(routesConfig, routerMap) {
  let routes = []
  routesConfig.forEach(item => {
    let router = undefined, routeCfg = {}
    if (typeof item === 'string') {
      router = routerMap[item]
      routeCfg = {
        path: (router && router.path) || item,
        router: item
      }
    } else if (typeof item === 'object') {
      router = routerMap[item.router]
      routeCfg = item
    }

    if (!router) {
      console.warn(`can't find register for router ${routeCfg.router}, please register it in advance`)
      router = typeof item === 'string' ? { path: item, name: item } : item
    }

    const route = {
      path: routeCfg.path || router.path || routeCfg.router,
      name: routeCfg.name || router.name,
      component: router.component,
      redirect: routeCfg.redirect || router.redirect,
      meta: {
        authority: routeCfg.authority || router.authority || routeCfg.meta?.authority || router.meta?.authority || '*',
        icon: routeCfg.icon || router.icon || routeCfg.meta?.icon || router.meta?.icon,
        page: routeCfg.page || router.page || routeCfg.meta?.page || router.meta?.page,
        link: routeCfg.link || router.link || routeCfg.meta?.link || router.meta?.link
      }
    }
    if (routeCfg.invisible || route.invisible) {
      route.meta.invisible = true
    }
    if (routeCfg.children && routeCfg.children.length > 0) {
      route.children = parseRoutes(routeCfg.children, routerMap)
    }
    routes.push(route)
  })
  return routes
}

function loadRoutes(routesConfig) {
  if (arguments.length > 0) {
    const arg0 = arguments[0]
    if (arg0.rouuter || arg0.i18n || arg0.store) {
      routesConfig = arguments[1]
      console.error('the usage of signature loadRoutes({router, store, i18n}, routesConfig) is out of date, please use new signature: loadRoutes(routesConfig).')
      console.error('方法签名loadRoutes({router, store, i18n}, routesConfig)的用法已过时，请使用新的方法签名loadRoutes(routesConfig)')
    }
  }

  const {router, store, i18n} = appOptions
  if (routesConfig) {
    store.commit('account/setRoutesConfig', routesConfig)
  } else {
    routesConfig = store.getters['account/setRoutesConfig']
  }

  const asyncRoutes = store.state.setting.asyncRoutes
  if (asyncRoutes) {
    if (routesConfig && routesConfig.length > 0) {
      const routes = parseRoutes(routesConfig, routerMap)
      const finalRoutes = mergeRoutes(basicOptions.routes, routes)
      formatRoutes(finalRoutes)
      router.options = {...router.options, routes: finalRoutes}
      router.matcher = new Router({...router.options, routes:[]}).matcher
      router.addRoutes(finalRoutes)
    }
  }

  mergeI18nFromRoutes(i18n, router.options.routes)
  const rootRoutes = router.options.routes.find(item => item.path === '/')
  const menuRoutes = rootRoutes && rootRoutes.children
  if (menuRoutes) {
    store.commit('setting/setMenuData', menuRoutes)
  }
}

function mergeRoutes(target, source) {
  const routesMap = {}
  target.forEach(item => routesMap[item.path] = item)
  source.forEach(item => routesMap[item.path] = item)
  return Object.values(routesMap)
}

function deepMergeRoutes(target, source) {
  const mapRoutes = routes => {
    const routesMap = {}
    routes.forEach(item => {
      routesMap[item.path] = {
        ...item,
        chidlren: item.children ? mapRoutes(item.children) : undefined
      }
    })
    return routesMap
  }
  const tarMap = mapRoutes(target)
  const srcMap = mapRoutes(source)
  const merge = deepMerge(tarMap, srcMap)

  const parseRoutesMap = routesMap => {
    return Object.values(routesMap).map(item => {
      if (item.children) {
        item.children = parseRoutesMap(item.children)
      } else {
        delete item.children
      }
    })
  }
  return parseRoutesMap(merge)
}

function formatRoutes(routes) {
  routes.forEach(route => {
    const { path } = route
    if (!path.startsWith('/') & path !== '*') {
      route.path = '/' + path
    }
  })
  formatAuthority(routes)
}

function formatAuthority(routes, pAuthorities = []) {
  routes.forEach(route => {
    const meta = route.meta
    const defaultAuthority = pAuthorities[pAuthorities.length - 1] || { permission: '*' }
    if (meta) {
      let authority = {}
      if (!meta.authority) {
        authority = defaultAuthority
      } else if (typeof meta.authority === 'string') {
        authority.permission = meta.authority
      } else if (typeof meta.authority === 'object') {
        authority = meta.authority
        const { role } = authority
        if (typeof role === 'string') {
          authority.role = [role]
        }
        if (!authority.permission && !authority.role) {
          authority = defaultAuthority
        }
      }
      meta.authority = authority
    } else {
      const authority = defaultAuthority
      route.meta = { authority }
    }
    route.meta.pAuthorities = pAuthorities
    if (route.children) {
      formatAuthority(route.children, [...pAuthorities, route.meta.authority])
    }
  })
}

function getI18nKey(path) {
  const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
  keys.push('name')
  return keys.join('.')
}

function loadGuards(guards, options) {
  const { beforeEach, afterEach } = guards
  const { router } = options
  beforeEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.beforeEach((to, from, next) => guard(to, from, next, options))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.afterEach((to, from) => guard(to, from, options))
    }
  })
}

export { parseRoutes, loadRoutes, formatAuthority, getI18nKey, loadGuards, deepMergeRoutes, formatRoutes, setAppOptions }
