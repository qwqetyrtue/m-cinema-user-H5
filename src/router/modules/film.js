import Layout from "@/layout/index.vue";

const FilmRoutes = [
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
        path: '/film/collect/want',
        name: 'FilmWant',
        component: () => import('@/views/film/collect/index.vue'),
        meta: {title: '想看', icon: 'film-want',type: 'want'}
    },
    {
        path: '/film/collect/already',
        name: 'FilmAlready',
        component: () => import('@/views/film/collect/index.vue'),
        meta: {title: '看过', icon: 'film-already', type: 'already'}
    }
]

export default FilmRoutes
