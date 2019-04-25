import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 如果上百个页面逐个import太jb多了, 封装个批量设置loadComponent方法加载所有页面组件, 此方式实现路由懒加载
function loadComponent(component) {
  // '@' is aliased to src
  return (resolve) => {
    import(`@/${component}.vue`).then((module) => {
      resolve(module)
    })
  }
}

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // 登录，通用
  {
    path: '/login',
    component: loadComponent('views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: loadComponent('views/404'),
    hidden: true
  },
  // 首页，通用
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    // name: '工作台',
    meta: { title: '首页', icon: 'iconfont iconicon_4' },
    // hidden: true,
    children: [{
      path: '/home',
      name: '首页',
      meta: { title: '首页', icon: 'iconfont iconicon_4' },
      component: loadComponent('views/home/index')
    }]
  },
  // 个人中心，通用（菜单内不可见）
  {
    path: '/userCenter',
    component: Layout,
    redirect: '/userCenter/index',
    hidden: true,
    name: '个人中心',
    meta: { title: '个人中心', icon: 'iconfont icon-icon_18' },
    children: [{
      path: 'index',
      name: '修改密码',
      meta: { title: '修改密码', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/userCenter/index')
    }]
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement/index',
    name: '用户管理',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'iconfont iconicon_18' },
    children: [{
      path: 'index',
      name: '用户列表',
      meta: { title: '用户列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/userManagement/index')
    }]
  },
  {
    path: '/blogManagement',
    component: Layout,
    redirect: '/blogManagement/index',
    name: '文章管理',
    alwaysShow: true,
    meta: { title: '文章管理', icon: 'iconfont iconicon_12' },
    children: [{
      path: 'index',
      name: '文章列表',
      meta: { title: '文章列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/blogManagement/index')
    }]
  },
  {
    path: '/categoryManagement',
    component: Layout,
    redirect: '/categoryManagement/index',
    name: '分类管理',
    alwaysShow: true,
    meta: { title: '分类管理', icon: 'iconfont iconicon_9' },
    children: [{
      path: 'index',
      name: '分类列表',
      meta: { title: '分类列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/categoryManagement/index')
    }]
  },
  {
    path: '/tagManagement',
    component: Layout,
    redirect: '/tagManagement/index',
    name: '标签管理',
    alwaysShow: true,
    meta: { title: '标签管理', icon: 'iconfont iconicon_10' },
    children: [{
      path: 'index',
      name: '标签列表',
      meta: { title: '标签列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/tagManagement/index')
    }]
  },
  {
    path: '/friendLink',
    component: Layout,
    redirect: '/friendLink/index',
    name: '友情链接',
    alwaysShow: true,
    meta: { title: '友情链接', icon: 'iconfont iconicon_8' },
    children: [{
      path: 'index',
      name: '链接列表',
      meta: { title: '链接列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/friendLink/index')
    }]
  },
  {
    path: '/commentManagement',
    component: Layout,
    redirect: '/commentManagement/index',
    name: '留言管理',
    alwaysShow: true,
    meta: { title: '留言管理', icon: 'iconfont iconicon_5' },
    children: [{
      path: 'index',
      name: '留言列表',
      meta: { title: '留言列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/commentManagement/index')
    }]
  },
  {
    path: '/timeLine',
    component: Layout,
    redirect: '/timeLine/index',
    name: '时间轴',
    alwaysShow: true,
    meta: { title: '时间轴', icon: 'iconfont iconsupersearch' },
    children: [{
      path: 'index',
      name: '时间轴列表',
      meta: { title: '时间轴列表', icon: 'iconfont iconicon_21' },
      component: loadComponent('views/timeLine/index')
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hiddren: true
  }
  // 跳转第三方网站
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'http://sls.saleslead.cn/',
  //       meta: { title: '跳转', icon: 'link' }
  //     }
  //   ]
  // },

  // 内嵌第三方网站
  // {
  //   path: '/myiframe',
  //   component: Layout,
  //   redirect: '/myiframe',
  //   children: [{
  //     path: ':routerPath',
  //     name: 'myiframe',
  //     component: loadComponent('components/iframe/index'),
  //     meta: { title: 'thirdPartyWebsite', icon: 'link' }
  //   }]
  // },

]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
