import router from './router'
import store from './store'
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { Message } from 'element-ui'

router.beforeEach(async(to, from, next) => {
  document.title = to.meta.title
  // const hasToken = getToken()
  const hasToken = '79faf82271944fe38c4f1d99be71bc9c'
  console.log('hasToken:', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next()
      return true
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
        return true
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          router.addRoutes(accessRoutes)
          next({ path: to.path, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          // Message.error(error)
          console.log(error)
          // next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
  }
})
// 在路由跳转之后执行
router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
