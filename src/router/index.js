import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home';
import Intern from '../views/Intern';
import Login from '../views/Login';
import Lost from '../views/Lost';

import store from '../store';

import ChangePassword from '../views/ChangePassword';
import AddConcert from '../views/AddConcert';

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/login');
      } else {
        next();
      }
    });
};

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/home');
      } else {
        next();
      }
    });
};

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout')
    .then(() => next('/login'));
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/intern',
      component: Intern,
      beforeEnter: requireAuthenticated,
    },
    {
      path: '/add_concert',
      component: AddConcert,
      beforeEnter: requireAuthenticated,
    },
    {
      path: '/change_password',
      component: ChangePassword,
      beforeEnter: requireAuthenticated,
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: requireUnauthenticated,
    },
    {
      path: '/logout',
      beforeEnter: redirectLogout,
    },
    {
      path: '*',
      component: Lost,
    },
  ],
});
