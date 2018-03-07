<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="black" outline slot="activator">Edit other fields</v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click="close" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit project description</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class='ma-0 pa-0'>
          <v-layout row wrap>
          <v-flex xs4>
          <v-navigation-drawer permanent floating class="grey lighten-3 ma-0 pa-0">
            <v-list>
              <v-list-tile v-for="(key, i) in mainKeys" :key="i" @click="currentPage = key.title">
                <v-list-tile-action>
                  <v-icon>{{ key.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ key.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
          </v-flex xs8>
          <v-flex class='ml-3'>
          <v-card class='mt-2' flat v-if='currentPage === "Blockchain"'>
            <v-card-text>
              <div class="display-2 mt-3 mb-4">Blockchain</div>
              <v-flex xs12 sm8>
                <v-text-field
                  label='Project Name*'
                  v-model='project.project_info.blockchain.project_name'>
                </v-text-field>
                <v-text-field
                  label='Headline*'
                  v-model='project.project_info.blockchain.headline'>
                </v-text-field>
                <v-text-field
                  label='Short project description*'
                  multi-line
                  v-model='project.project_info.blockchain.short_description'>
                </v-text-field>
                <v-text-field
                  v-model="project.project_info.blockchain.state"
                  label="Project State*">
                </v-text-field>
                <v-text-field
                  v-model="project.project_info.blockchain.dependency"
                  label="Dependency*">
                </v-text-field>
                <v-text-field
                  v-model="project.project_info.blockchain.consensus_name"
                  label="Consensus">
                </v-text-field>
              </v-flex>
            </v-card-text>
          </v-card>
          <v-card flat class='mt-2' v-if='currentPage === "ICO Common info"'>
            <v-flex xs12 sm8 class='ma-4' v-if='project.project_info.ico.common_info === undefined'>
              <v-alert outline type="warning" color='black' light :value="true">
                This project hasn't crowdsale description
              </v-alert>
            </v-flex>
            <v-card-text v-if='project.project_info.ico.common_info !== undefined'>
              <div class="display-2 mt-3 mb-4">ICO Common info</div>
              <v-layout row wrap>
              <v-flex xs12 sm5>
                <v-text-field
                  label='Current ICO Phase'
                  v-model='project.project_info.ico.common_info.current_ico_phase'>
                </v-text-field>
                <v-text-field
                  label='Total supply*'
                  v-model='project.project_info.ico.common_info.token_distribution.total_supply'>
                </v-text-field>
              </v-flex>
              </v-layout>
              <v-layout row wrap>
              <v-flex xs12 sm7>
                <div class="display-1 mb-2 mt-2">Token distribution</div>
                <v-data-table
                  :headers="headers"
                  :items="project.project_info.ico.common_info.token_distribution.shares"
                >
                  <template slot="items" slot-scope="props">
                    <td>
                      <v-edit-dialog
                        :return-value.sync="props.item.percent"
                        lazy
                        large
                        persistent
                      > {{ props.item.percent }}
                        <v-text-field
                          slot="input"
                          label="Edit"
                          v-model="props.item.percent"
                          single-line
                        ></v-text-field>
                      </v-edit-dialog>
                    </td>
                    <td>
                      <v-edit-dialog
                        :return-value.sync="props.item.description"
                        lazy
                        large
                        persistent
                      > {{ props.item.description }}
                        <v-text-field
                          slot="input"
                          label="Edit"
                          v-model="props.item.description"
                          single-line
                        ></v-text-field>
                      </v-edit-dialog>
                    </td>
                  </template>
                </v-data-table>
                <div class="display-1 mb-2 mt-2">Use of proceeds</div>
                <v-data-table
                  :headers="headers"
                  :items="project.project_info.ico.common_info.use_of_proceeds"
                >
                  <template slot="items" slot-scope="props">
                    <td>
                      <v-edit-dialog
                        :return-value.sync="props.item.percent"
                        lazy
                        large
                        persistent
                      > {{ props.item.percent }}
                        <v-text-field
                          slot="input"
                          label="Edit"
                          v-model="props.item.percent"
                          single-line
                        ></v-text-field>
                      </v-edit-dialog>
                    </td>
                    <td>
                      <v-edit-dialog
                        :return-value.sync="props.item.description"
                        lazy
                        large
                        persistent
                      > {{ props.item.description }}
                        <v-text-field
                          slot="input"
                          label="Edit"
                          v-model="props.item.description"
                          single-line
                        ></v-text-field>
                      </v-edit-dialog>
                    </td>
                  </template>
                </v-data-table>
              </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card flat class='mt-2' v-if='currentPage === "ICO Phases"'>
            <v-flex xs12 sm8 class='ma-4' v-if='project.project_info.ico.common_info === undefined'>
              <v-alert outline type="warning" color='black' light :value="true">
                This project hasn't crowdsale description
              </v-alert>
            </v-flex>
            <v-card-text v-if='project.project_info.ico.common_info !== undefined'>
            <v-flex xs12 sm8>
            <v-tabs
              v-model="active"
              color="grey lighten-2"
              slider-color="black">
                <v-tab
                  v-for="(phase, i) in project.project_info.ico.phases" 
                  :key="i"
                  >
                  <span v-if='phase === null'>Phase {{ i + 1 }}</span>
                  <span v-if='phase.phase_name !== undefined'>{{phase.phase_name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(phase, i) in project.project_info.ico.phases" 
                  class='mt-4 ml-3'
                  :key="i">
                  <v-flex xs12 sm8>
                    <v-text-field
                      label='Phase number'
                      v-model='phase.phase_num'>
                    </v-text-field>
                    <v-text-field
                      label='Phase name'
                      v-model='phase.phase_name'>
                    </v-text-field>
                    <v-text-field
                      label='Phase status'
                      multi-line
                      v-model='phase.phase_status'>
                    </v-text-field>
                    <div class="display-1 mt-3 mb-4">Registration</div>
                    <v-text-field
                      v-model="phase.registration.start_date"
                      label="Registration start date">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.registration.end_date"
                      label="Registration end date">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.registration.website"
                      label="Registration website">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.registration.terms"
                      label="Registration terms">
                    </v-text-field>
                    <div class="display-1 mt-3 mb-4">Crowdsale terms</div>
                    <v-text-field
                      v-model="phase.terms.sales_agreement"
                      label="Sales agreement">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.terms.sales_url"
                      label="Sales website">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.terms.issued_tokens"
                      label="Issued tokens">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.terms.sold_tokens"
                      label="Sold tokens">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.terms.share_of_sold"
                      label="Share of sold">
                    </v-text-field>
                    <v-text-field
                      v-model="phase.terms.token_distribution_date"
                      label="Token distribution date">
                    </v-text-field>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
              </v-flex>
            </v-card-text>
          </v-card>
          <v-card flat class='mt-2' v-if='currentPage === "Token"'>
            <v-card-text>
            <v-flex xs12 sm8>
            <v-tabs
              v-model="activeToken"
              color="grey lighten-2"
              slider-color="black">
                <v-tab
                  v-for="(token, i) in project.project_info.token" 
                  :key="i"
                  >
                  <span>{{token.name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(token, i) in project.project_info.token" 
                  class='mt-4 ml-3'
                  :key="i">
                  <v-flex xs12 sm8>
                    <v-text-field
                      label='Token name'
                      v-model='token.name'>
                    </v-text-field>
                    <v-text-field
                      label='Token symbol'
                      v-model='token.symbol'>
                    </v-text-field>
                    <v-text-field
                      label='Token purpose'
                      multi-line
                      v-model='token.token_purpose'>
                    </v-text-field>
                    <v-text-field
                      v-model="token.token_type"
                      label="Token type">
                    </v-text-field>
                    <v-text-field
                      v-model="token.inflation_rate"
                      label="Inflation rate">
                    </v-text-field>
                    <v-text-field
                      v-model="token.circulation_terms"
                      label="Circulation terms">
                    </v-text-field>
                    <v-text-field
                      v-model="token.governance_rights_project"
                      label="Goevernance rights project">
                    </v-text-field>
                    <v-text-field
                      v-model="token.governance_rights_org"
                      label="Governance rights organisation">
                    </v-text-field>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
              </v-flex>
            </v-card-text>
          </v-card>
          <v-card flat class='mt-2' v-if='currentPage === "App"'>
            <v-flex xs12 sm8 class='ma-4' v-if='project.project_info.app !== undefined'>
              <div></div>
              <v-alert outline type="warning" color='black' light :value="true">
                This project hasn't app description
              </v-alert>
            </v-flex>
            <v-flex xs12 sm8 v-if='project.project_info.app.length > 0'>
            <v-card-text>
            <v-tabs
              v-model="activeApp"
              color="grey lighten-2"
              slider-color="black">
                <v-tab
                  v-for="(app, i) in project.project_info.app" 
                  :key="i"
                  >
                  <span>{{app.name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(app, i) in project.project_info.app" 
                  class='mt-4 ml-3'
                  :key="i">
                  <v-flex xs12 sm8>
                    <v-text-field
                      label='App name'
                      v-model='app.name'>
                    </v-text-field>
                    <v-text-field
                      label='Same blockchain'
                      v-model='app.same_blockchain'>
                    </v-text-field>
                    <v-text-field
                      label='Sources availability'
                      multi-line
                      v-model='app.sources_availability'>
                    </v-text-field>
                    <v-text-field
                      v-model="app.app_status"
                      label="App status">
                    </v-text-field>
                    <v-text-field
                      v-model="app.app_type"
                      label="App type">
                    </v-text-field>
                    <v-text-field
                      v-model="app.app_url"
                      label="App URL">
                    </v-text-field>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
              </v-card-text>
              </v-flex>
          </v-card>
          </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class EditApplicationPage extends Vue {
  @Prop({default: () => {}})
  project
  dialog = false
  currentPage = 'Blockchain'
  /* mainKeys = [
    {title: 'Blockchain', icon: 'fa-cogs'},
    {title: 'ICO Common info', icon: 'fa-diamond'},
    {title: 'ICO Phases', icon: 'fa-gem'},
    {title: 'Token', icon: 'mdi-coin'},
    {title: 'App', icon: 'fa-play-circle'}
  ] */
  mainKeys = [
    {title: 'Blockchain', icon: ''},
    {title: 'ICO Common info', icon: ''},
    {title: 'ICO Phases', icon: ''},
    {title: 'Token', icon: ''},
    {title: 'App', icon: ''}
  ]
  active = 0
  activeToken = 0
  activeApp = 0
  headers = [{text: 'Percent'}, {text: 'Description'}]
  mounted () {
    console.log('common_info', this.project.project_info.ico.common_info === undefined)
  }
  close () {
    this.dialog = false
    this.currentPage = 'Blockchain'
    this.active = 0
    this.activeToken = 0
  }
  save () {
    this.dialog = false
    this.currentPage = 'Blockchain'
    this.active = 0
    this.activeToken = 0
    this.project.project_name = this.project.project_info.blockchain.project_name
    this.$emit('interface', this.project)
  }
}
</script>