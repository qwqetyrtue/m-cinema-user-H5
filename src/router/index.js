import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/layout/index.vue";
import FilmRoutes from "@/router/modules/film";
import ProfileRoutes from "@/router/modules/profile";

Vue.use(Router)

const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import( '@/views/login')
    },
    {
        path: '/',
        redirect: 'index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import('@/views/index'),
                meta: {title: '首页', icon: 'index'}
            }
        ]
    },
    ...FilmRoutes,
    ...ProfileRoutes,
    {
        path: '/community',
        redirect: 'index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Community',
                component: () => import('@/views/community'),
                meta: {title: '社区', icon: 'community'}
            }
        ]
    },
    {
        path: '/ticket',
        redirect: 'index',
    },
    {
        path: '/ticket/index',
        name: 'Ticket',
        component: () => import('@/views/ticket/list'),
        meta: {title: '观影票', icon: 'tickets'}
    },
    {
        path: '/ticket/coupon',
        name: 'Coupon',
        component: () => import('@/views/ticket/coupon/index.vue'),
        meta: {title: '优惠劵', icon: 'coupon'}
    },
    {
        path: '/order/:filmId',
        name: 'Order',
        component: () => import('@/views/order/index.vue'),
        meta: {title: '订票', icon: 'order'}
    },
    {
        path: '/pick/:sceneId',
        name: 'SeatPick',
        component: () => import('@/views/order/seat-pick.vue'),
        meta: {title: '选择我', icon: 'seat-pick'}
    },
    {
        path: '/comment/add',
        name: 'CommentAdd',
        component: () => import('@/views/comment/add.vue'),
        meta: {title: '写短评', icon: 'comment-add'}
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
    routes: constantRoutes
})

const router = createRouter()

export default router
