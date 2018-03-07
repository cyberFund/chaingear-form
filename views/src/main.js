// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import LogRocket from 'logrocket'
import createPlugin from 'logrocket-vuex'
import router from './router'
import App from './App'
import * as phaseTemplate from './helpers/phase-template'
import * as appTemplate from './helpers/app-template'
import * as tokenTemplate from './helpers/token-template'
import * as _ from 'lodash'

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.config.productionTip = false

// Intialize LogRocket plugin to collect data about users expirience
LogRocket.init('56hmla/chaingear-frontend')
LogRocket.identify(localStorage.getItem('user_email'))
const logrocketPlugin = createPlugin(LogRocket)

// Initialize VuexPersist plugin to hold unsaved data in browser localStorage
const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true) , vuexLocalStorage.plugin
})
const store = new Vuex.Store({
  plugins: [logrocketPlugin],
  state: {
    isIco: true,
    isApp: false,
    isErc20: false,
    project_info: {
      blockchain: {
        project_name: '',
        headline: '',
        short_description: '',
        state: 0,
        asset_type: '',
        dependency: '',
        consensus_name: '',
        milestone: [],
        links: []
      },
      ico: {
        common_info: {
          is_ico: true,
          current_ico_phase: 0,
          terms: {
            sales_argeement: '',
            sales_url: ''
          },
          token_distribution: {
            total_supply: '',
            shares: []
          },
          use_of_proceeds: []
        },
        phases: [
          _.cloneDeep(phaseTemplate)
        ]
      },
      token: [
        _.cloneDeep(tokenTemplate)
      ],
      app: [
        _.cloneDeep(appTemplate)
      ]
    }
  },
  getters: {
    getIsIco: (state, getters) => state.isIco,
    getIsErc20: (state, getters) => state.isErc20,
    getBlockchain: state => state.project_info.blockchain,
    getAllPhases: state => state.project_info.ico.phases,
    getPhase: state => num => state.project_info.ico.phases[num],
    getCommonInfo: state => state.project_info.ico.common_info,
    getProceeds: state => state.project_info.ico.common_info.use_of_proceeds,
    getTokenDistribution: state => state.project_info.ico.common_info.token_distribution.shares,
    getToken: state => num => state.project_info.token[num],
    getAllTokens: state => state.project_info.token,
    getApp: state => num => state.project_info.app[num],
    getAllApps: state => state.project_info.app,
    getProjectInfo: state => state.project_info
  },
  mutations: {
    toggleIsIco: (state, payload) => {
      state.isIco = payload
    },
    toggleIsErc20: (state, payload) => {
      state.isErc20 = payload
    },
    updateBlockchain: (state, payload) => {
      state.project_info.blockchain[payload.key] = payload.value
    },
    addEmptyPhase: (state, payload) => {
      state.project_info.ico.phases.push(_.cloneDeep(phaseTemplate))
    },
    addEmptyToken: state => {
      state.project_info.token.push(_.cloneDeep(tokenTemplate))
    },
    addEmptyApp: state => {
      state.project_info.app.push(_.cloneDeep(appTemplate))
    },
    addLinks: (state, payload) => {
      state.project_info.blockchain.links = payload
    },
    addMilestones: (state, payload) => {
      state.project_info.blockchain.milestone = payload
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  validations: {},
  store: store
})
