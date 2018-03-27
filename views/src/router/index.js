import Vue from 'vue'
import Router from 'vue-router'
import StartInfoPage from '../components/StartInfoPage'
import AddProjectFormContainer from '../components/AddApplicationForm/AddProjectFormContainer'
import AllApplications from '../components/Applications/AllApplications'
import ReviewMainContainer from '../components/Review/AllApplications'
import SecretLoginPage from '../components/SecretLoginPage'
Vue.use(Router)

export default new Router({
  routes: [
    // Main page route
    {
      path: '/',
      name: 'Info start page',
      component: StartInfoPage
    },
    // Form route
    {
      path: '/add_info',
      name: 'Add info',
      component: AddProjectFormContainer
    },
    // All applications list route
    {
      path: '/applications',
      name: 'All applications',
      component: AllApplications
    },
    {
      path: '/review',
      name: 'Review applications',
      component: ReviewMainContainer
    },
    {
      path: '/secret-login-page',
      name: 'Login',
      component: SecretLoginPage
    }
  ]
})
