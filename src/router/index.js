import Vue from 'vue'
import Router from 'vue-router'
import Expenses from '@/views/Expenses'
import DetailExpensesList from '@/components/Expenses/DetailExpensesList'
import ExpensesAdd from '@/components/Expenses/ExpensesAdd'
import ExpensesEdit from '@/components/Expenses/ExpensesEdit'
import ExpenseCategoryAdd from '@/components/category/ExpenseCategoryAdd'
import ExpenseCategoryEdit from '@/components/category/expenseCategoryEdit'
import Login from '@/views/Login'
import store from '@/store'


Vue.use(Router)

if (sessionStorage.getItem('token')) {
  // console.log("在路由中获取到了token");
  store.commit('setToken', sessionStorage.getItem('token'))
  }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'expenses'
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses,
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: '/expenses/detailExpensesList/:date/:cate',
      name: 'detailExpensesList',
      component: DetailExpensesList
    },
    {
      path: '/expenses/expensesEidt/:date/:id',
      name: 'expensesEdit',
      component: ExpensesEdit
    },
    {
      path: '/expenses/expensesAdd',
      name: 'expensesAdd',
      component: ExpensesAdd
    },
    {
      path: '/expenses/espensesCategoryAdd',
      name: 'expensesCategoryAdd',
      component:ExpenseCategoryAdd
    },
    {
      path: '/expenses/expensesCategoryEdit/:name',
      name: 'expensesCategoryEdit',
      component: ExpenseCategoryEdit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
