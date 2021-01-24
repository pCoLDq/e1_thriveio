import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/signup',
      component: () => import('./views/SignUp.vue'),
    },
    {
      path: '/signin',
      component: () => import('./views/SignIn.vue'),
    },
    {
      path: '/addtender',
      component: () => import('./views/AddTender.vue'),
    },
  ],
});
