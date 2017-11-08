import App from '../App'

/**
 * 产品模块
 */
const index = r => require.ensure([], () => r(require('../pages/index')), 'index'); //首页
const test = r => require.ensure([], () => r(require('../pages/test')), 'test'); //首页

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: '/',
      redirect: '/index'
    },{
      path: '/index',
      component: index
    }
  ]
}]
