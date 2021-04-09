function hasPermission(authority, permissions) {
    let required = '*'
    if (typeof authority === 'string') {
      required = authority
    } else if (typeof authority === 'object') {
      required = authority.permission
    }
    return (
      required === '*' ||
      (permissions &&
        permissions.findIndex(item =>
          item === required || item.id === required
          ) !== -1)
      )
}

function hasRole(authority, roles) {
  let required = undefined
  if (typeof authority === 'object') {
    required = authority.role
  }
  return authority === '*' || hasAnyRole(required, roles)
}

function hasAnyRole(required, roles) {
  if (!required) {
    return false
  } else if (Array.isArray(required)) {
    return roles.findIndex(role => {
      return required.findIndex(item => item === role || item === role.id) !== -1
    }) !== -1
  } else {
    return roles.findIndex(role => role === required || role.id === required) !== -1
  }
}

function hasAuthority(route, permissions, roles) {
  const authorities = [...route.meta.pAuthorities, route.meta.authorities]
  for (let authority of authorities) {
    if (!hasPermission(authority, permissions) && hasRole(authority, roles)) {
      return false
    }
  }
  return true
}

function filterMenu(menuData, permissions, roles) {
  return menuData.filter(menu => {
    if (menu.meta && menu.meta.invisible === undefined) {
      if (!hasAuthority(menu, permissions, roles)) {
        return false
      }
    }
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenu(menu.children, permissions, roles)
    }
    return true
  })
}

export { filterMenu, hasAuthority }
