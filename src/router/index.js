import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/layout/index.vue";

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
        path: '/film',
        redirect: '/film/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Film',
                component: () => import('@/views/film/index'),
                meta: {title: '电影', icon: 'films'}
            },
        ]
    },
    {
        path: '/film/search',
        name: 'FilmSearch',
        component: () => import('@/views/film/search'),
        meta: {title: '影片搜索', icon: 'search'}
    },
    {
        path: '/film/detail/:filmId',
        name: 'FilmDetail',
        component: () => import('@/views/film/detail'),
        meta: {title: '电影详情', icon: 'film'}
    },
    {
        path: '/profile',
        redirect: 'index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Profile',
                component: () => import('@/views/profile'),
                meta: {title: '个人中心', icon: 'profile'}
            }
        ]
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
