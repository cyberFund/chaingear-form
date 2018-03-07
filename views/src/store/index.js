import Vuex from 'vuex'
import * as _ from 'lodash'
import * as phaseTemplate from '../helpers/phase-template'
import * as appTemplate from '../helpers/app-template'
import * as tokenTemplate from '../helpers/token-template'

const store = new Vuex.Store({
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
module.exports = store