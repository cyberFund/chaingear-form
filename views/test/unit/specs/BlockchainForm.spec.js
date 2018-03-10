import { shallow, mount } from '@vue/test-utils'
import BlockchainForm from '../../../src/components/AddApplicationForm/forms/BlockchainForm'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
// import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VeeValidate)

describe('BlockchainForm', () => {
  let store
  beforeEach(() => {   
    store = new Vuex.Store({
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
            dependency: 'Ethereum',
            consensus_name: '',
            milestone: [],
            links: []
          }
        }
      },
      getters: {
        getIsIco: (state, getters) => state.isIco,
        getIsErc20: (state, getters) => state.isErc20,
        getBlockchain: state => state.project_info.blockchain
      },
      mutations: {
        toggleIsIco: (state, payload) => {
          state.isIco = payload
        },
        toggleIsErc20: (state, payload) => {
          state.isErc20 = payload
        }
      }
    })
  })
  it('it should set appropriate consensus_name', () => {
    const wrapper = shallow(BlockchainForm, {store})
    wrapper.find('.submit-button').trigger('click')
    expect(wrapper.vm.form.consensus_name).to.equal('Proof-of-Work')
  })
  it('it should set isErc20 value from state to true', () => {
    const wrapper = shallow(BlockchainForm, {store})
    wrapper.find('.submit-button').trigger('click')
    expect(wrapper.vm.$store.getters.getIsIco).to.equal(true)
  })
  /* it('it should show warn message if notEnough == true', () => {
    const wrapper = shallow(BlockchainForm, {store})
    wrapper.setData({ errors: { items: [1,2,3] } })
    wrapper.find('.submit-button').trigger('click')
    wrapper.setData({notEnough: true})
    wrapper.setData({errorMessage: 'Please, fill all required fields'})
    expect(wrapper.find('.error-alert-span').text()).to.equal('Please, fill all required fields')
  }) */
})