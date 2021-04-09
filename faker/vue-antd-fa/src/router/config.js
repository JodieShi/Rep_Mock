import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404')
    },
    {
      path: '*',
      name: '403',
      component: () => import('@/pages/exception/403')
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace')
            },
            {
              path: 'analysis',
              name: '分析页',
              component: () => import('@/pages/dashboard/workplace')
            },
            {
              path: 'exception',
              name: '异常页',
              meta: {
                icon: 'warning'
              },
              component: BlankView,
              children: [
                {
                  path: '404',
                  name: 'Exp404',
                  component: () => import('@/pages/exception/404')
                },
                {
                  path: '403',
                  name: 'Exp403',
                  component: () => import('@/pages/exception/403')
                },
                {
                  path: '500',
                  name: 'Exp500',
                  component: () => import('@/pages/exception/500')
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default options
