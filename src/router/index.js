import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/App-home.vue')
  },
  {
    path: '/auth',
    name: 'Authentification',
    component: () => import('../components/App-switcher.vue'),
    meta: {
      public: true,
    }
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('../components/App-404.vue'),
    meta: {
      public: true,
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLogged = !!localStorage.getItem("isUserLogged");//потом это потянем из стора

    if (!isPublicRoute) {
      if (isUserLogged) {
        try {
          next();
        }
        catch (error) {
          router.replace('/404')
        }
      }
      else {
        if (router.currentRoute.path !== '/auth') router.replace('/auth');
        //тут будет токен
      }
    }
    else {
      next();
    }
  }
)

export default router
