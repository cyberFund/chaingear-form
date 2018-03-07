import { shallow, createLocalVue, mount } from '@vue/test-utils'

import BlockchainForm from '../../../src/components/AddApplicationForm/forms/BlockchainForm'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import * as _ from 'lodash'

import * as phaseTemplate from '../../../src/helpers/phase-template'
import * as appTemplate from '../../../src/helpers/app-template'
import * as tokenTemplate from '../../../src/helpers/token-template'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(VueResource)
localVue.use(Vuex)

describe('BlockchainForm.vue', () => {
  it('it should automatically set corresponding consensus_name', () => {
    console.log('hi')
    
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
    const wrapper = mount(BlockchainForm, { store, localVue })
    const button = wrapper.find('.submit-button')
    button.trigger('click')
    expect(BlockchainFormComponent.form.consensus_name).to.be.equal('unknown')
    /*
    const Constructor = Vue.extend(BlockchainForm)
    const BlockchainFormComponent = new Constructor().$mount()
    BlockchainFormComponent.form = {
        project_name: 'mock project',
        headline: 'healine',
        short_description: 'description',
        state: 'Project',
        dependency: 'Ethereum',
        consensus_name: ''
    }
    const button = BlockchainFormComponent.$el.querySelector('.submit-button')

    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    BlockchainFormComponent._watcher.run()

    expect(BlockchainFormComponent.form.consensus_name).to.be.equal('Proof-of-Work')*/
  })
  /*it('it displays an error message', () => {
    const Constructor = Vue.extend(BlockchainForm)
    const BlockchainFormComponent = new Constructor().$mount()
    BlockchainFormComponent.form = {
        project_name: 'mock project',
        short_description: 'description',
        state: 'Project',
        dependency: 'Ethereum',
        consensus_name: ''
    }
    const button = BlockchainFormComponent.$el.querySelector('.submit-button')

    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    BlockchainFormComponent._watcher.run()

    expect(BlockchainFormComponent.$el.querySelector('.error-alert-span').textContent).to.be.equal('Please, fill all required fields')
    expect(BlockchainFormComponent.form.consensus_name).to.be.equal('Proof-of-Work')
  })*/
})