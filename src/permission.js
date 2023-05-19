import router from './router'
import store from './store'
import {getToken} from '@/utils/auth' // 获取token
import {Toast} from "vant";

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

    // 判断用户是否登陆
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // 如果登陆了则跳转到首页
            next({path: '/'})
        } else {
            const hasGetUserInfo = store.getters.user.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // 获取管理员信息
                    await store.dispatch('auth/getUserInfo')
                    // hack方法以确保地址是完整的
                    //设置replace: true，这样导航就不会留下历史记录
                    // next({ ...to, replace: true })
                    next({...to, replace: true})
                } catch (error) {
                    // remove token and go to login page to re-login
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
})
