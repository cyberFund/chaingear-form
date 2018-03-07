import * as phaseTemplate from './phase-template'
import * as appTemplate from './app-template'
import * as tokenTemplate from './token-template'

export default class cleanStorage {
  constructor () {
    this.emptyState = {
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
          commont_info: {
            is_ico: true,
            current_ico_phase: 0,
            terms: {
              sales_argeement: '',
              sales_url: ''
            },
            token_distribution: {
              total_supply: '',
              shares: [
                {
                  description: '',
                  percent: 0
                }
              ]
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
    }
    this.clean = this.clean.bind(this)
  }
  clean () {
    // console.log('works')
    localStorage.setItem('vuex', this.emptyState)
  }
}
