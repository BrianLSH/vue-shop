import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'home',
    component: () => import('../components/home')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  // debugger
  console.log(5)
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  console.log(6)
  console.log(userInfo)
  if (!userInfo) {
    return next('/login')
  }
  console.log(7)
  next()
})
export default router
