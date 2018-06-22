import Vue from 'vue'
import Router from 'vue-router'
import Book from '../components/Book'
import Borrow from '../components/Borrow'
import Login from '../components/Login'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/book'
    },
    {
      path: '/book',
      name: 'Book',
      component: Book,
      props: true
    },
    {
      path: '/borrow',
      name: 'Borrow',
      component: Borrow,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
})
