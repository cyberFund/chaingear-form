import Vue from 'vue'
import Router from 'vue-router'
import StartInfoPage from '../components/StartInfoPage'
import AddProjectFormContainer from '../components/AddApplicationForm/AddProjectFormContainer'
// import ReviewMainContainer from '../components/Review/ReviewMainContainer'
// import ApplicationsMainContainer from '../components/Applications/ApplicationsMainContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Info start page',
      component: StartInfoPage
    },
    {
      path: '/add_info',
      name: 'Add info',
      component: AddProjectFormContainer
    },
    /* {
      path: '/review',
      name: 'Review applications',
      component: ReviewMainContainer
    },
    {
      path: '/applications',
      name: 'All applications',
      component: ApplicationsMainContainer
    } */
  ]
})
