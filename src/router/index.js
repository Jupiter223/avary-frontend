import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/avary',
    component: Layout,
    redirect: '/avary/avaryInfo',
    name: 'avary',
    meta: { title: '成鸟管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/avary/avaryInfo',
        name: 'avaryInfo',
        component: () => import('@/views/avary/info'),
        meta: { title: '鸟列表', icon: 'table' }
      },
      {
        path: '/avary/add',
        name: 'add',
        component: () => import('@/views/avary/add'),
        meta: { title: '添加鸟', icon: 'form' }
      },
      {
        path: '/avary/edit/:id',
        name: 'edit',
        component: () => import('@/views/avary/add'),
        meta: { title: '编辑鸟', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/couple',
    component: Layout,
    // redirect: '/couple/info',
    name: 'card',
    meta: { title: '种对管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/couple/info',
        name: 'Info',
        component: () => import('@/views/couple/info'),
        meta: { title: '对鸟列表', icon: 'table' }
      },
      {
        path: '/couple/info/:id',
        name: 'coupleInfo',
        component: () => import('@/views/couple/coupleInfo'),
        meta: { title: '种鸟详情', icon: 'form' }
      },
      {
        path: '/couple/add',
        name: 'add',
        component: () => import('@/views/couple/add'),
        meta: { title: '添加对鸟', icon: 'form' }
      },
      {
        path: '/couple/edit/:id',
        name: 'edit',
        component: () => import('@/views/couple/add'),
        meta: { title: '编辑对鸟', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/breeder',
    component: Layout,
    // redirect: '/breeder/table',
    name: 'card',
    meta: { title: '繁殖管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/egg/info',
        name: 'eggInfo',
        component: () => import('@/views/breeder/egginfo'),
        meta: { title: '蛋列表', icon: 'table' }
      },
      {
        path: '/egg/add',
        name: 'add',
        component: () => import('@/views/breeder/eggadd'),
        meta: { title: '添加蛋', icon: 'form' }
      },
      {
        path: '/egg/edit/:id',
        name: 'edit',
        component: () => import('@/views/breeder/eggadd'),
        meta: { title: '编辑蛋', noCache: true },
        // hidden: true
      },
      {
        path: '/nestling/info',
        name: 'nestlingInfo',
        component: () => import('@/views/breeder/hatchinfo'),
        meta: { title: '雏鸟列表', icon: 'table' }
      },
      {
        path: '/nestling/add',
        name: 'add',
        component: () => import('@/views/breeder/hatchadd'),
        meta: { title: '添加雏鸟', icon: 'form' }
      },
      {
        path: '/nestling/edit/:id',
        name: 'edit',
        component: () => import('@/views/breeder/hatchadd'),
        meta: { title: '编辑雏鸟', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    redirect: '/card/info',
    name: 'card',
    meta: { title: '卡片管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/card/info',
        name: 'cardInfo',
        component: () => import('@/views/card/info'),
        meta: { title: '卡片列表', icon: 'table' }
      },
      {
        path: '/card/add',
        name: 'add',
        component: () => import('@/views/card/add'),
        meta: { title: '添加卡片', icon: 'form' }
      },
      {
        path: '/card/edit/:id',
        name: 'edit',
        component: () => import('@/views/card/add'),
        meta: { title: '编辑卡片', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
