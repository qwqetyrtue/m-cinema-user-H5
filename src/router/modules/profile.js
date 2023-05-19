import Layout from "@/layout/index.vue";

const ProfileRoutes = [
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
            },
        ]
    },
    {
        path: '/profile/edit',
        name: 'ProfileEdit',
        component: () => import('@/views/profile/edit/index.vue'),
        meta: {title: '编辑资料', icon: 'profile-edit'}
    },
    {
        path: '/profile/edit/name',
        name: 'ProfileEditName',
        component: () => import('@/views/profile/edit/name.vue'),
        meta: {title: '修改昵称', icon: 'profile-edit-name'}

    },
    {
        path: '/profile/edit/sign',
        name: 'ProfileEditSign',
        component: () => import('@/views/profile/edit/sign.vue'),
        meta: {title: '修改个性签名', icon: 'profile-edit-sign'}

    },
    {
        path: '/profile/edit/school',
        name: 'ProfileEditSchool',
        component: () => import('@/views/profile/edit/school.vue'),
        meta: {title: '修改学校', icon: 'profile-edit-school'}

    },
    {
        path: '/profile/edit/phone',
        name: 'ProfileEditPhone',
        component: () => import('@/views/profile/edit/phone.vue'),
        meta: {title: '修改手机号', icon: 'profile-edit-phone'}

    },
    {
        path: '/profile/edit/email',
        name: 'ProfileEditEmail',
        component: () => import('@/views/profile/edit/email.vue'),
        meta: {title: '修改邮箱', icon: 'profile-edit-email'}

    },
]

export default ProfileRoutes
