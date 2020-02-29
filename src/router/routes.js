import Intro from '@/pages/Intro'
import Login from '@/pages/Login'
import Acquisti from '@/pages/Acquisti'
import Task from '@/pages/Task'
import Eventi from '@/pages/Eventi'
import Shop from '@/pages/Shop'
import Wallet from '@/pages/Wallet'
import Camminare from '@/pages/task/Camminare'

const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutPrincipale.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/intro',
    component: Intro
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/wallet',
    component: Wallet
  },
  {
    path: '/acquisti',
    component: Acquisti
  },
  {
    path: '/task',
    component: Task
  },
  {
    path: '/events',
    component: Eventi
  },
  {
    path: '/shop',
    component: Shop
  },
  {
    path: '/task1',
    component: Camminare
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
