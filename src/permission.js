import router from './router';
import store from './store';
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie

router.beforeEach(async(to, from, next) => {
  document.title = to.meta.title
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // const { roles } = await store.dispatch('user/getInfo')
          // const accessRoutes = await store.dispatch('generateRoutes', roles)
          // router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {}
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
