<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <div class="headline">Blockchain</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm8>
              <v-text-field
                name='project_name_name'
                label='Project Name*'
                @change='checkProjectName'
                v-validate.initial="'required'"
                v-model='form.project_name'>
              </v-text-field>
              <v-text-field
                name="input_1"
                label='Headline*'
                v-validate.initial="'required'"
                hint="It shouldn't be more than 50 symbols long"
                persistent-hint
                v-model='form.headline'>
              </v-text-field>
              <v-text-field
                label='Short project description*'
                multi-line
                name='short_descr'
                v-validate.initial="'required'"
                hint="Write short project description (2-3 paragraphs long)"
                persistent-hint
                v-model='form.short_description'>
              </v-text-field>
              <v-select
                v-bind:items="yesNo"
                v-model="isICO"
                @change='changeIsIco'
                label="Tokensale"
                autocomplete
                hint="Do you plan to run a tokensale?"
                persistent-hint
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="states"
                v-model="form.state"
                v-if='isICO'
                label="Project State"
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="dependency"
                v-model="form.dependency"
                v-validate.initial="'required'"
                label="Dependency*"
                hint="Select blockchain used to issue project tokens"
                persistent-hint
                name='dependency'
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              <v-select
                v-bind:items="consensus"
                v-show='form.dependency === "independent"'
                v-model="form.consensus_name"
                label="Consensus"
                autocomplete
                hint="Select consensus algorithm, used in project, or enter your own option"
                persistent-hint
                max-height='auto'
                item-text="label"
                item-value="value"></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-btn color="primary" class='submit-button' @click="next">Continue</v-btn>
              <v-spacer></v-spacer>
            </v-layout>
            <v-dialog v-model="notEnough" max-width="390">
              <v-card dark>
                <v-card-title class="headline">Error</v-card-title>
                <v-card-text>
                  <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                    <span class="error-alert-span">{{errorMessage}}</span>
                  </v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-card-text>
      </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import { required, maxLength } from 'vuelidate/lib/validators'
import {Component, Watch} from 'vue-property-decorator'
import * as _ from 'lodash'
import * as config from '../../../config.js'

@Component({})
export default class BlockchainForm extends Vue {
  // Computed prop that fetches blockchain description object from state
  get form () {
    return this.$store.getters.getBlockchain
  }
  // Computed prop that fetches isIco property from state
  get isICO () {
    return this.$store.getters.getIsIco
  }
  // This method changes isIco property in store based on corresponding select input value
  changeIsIco (e) {
    this.$store.commit('toggleIsIco', e)
  }
  get projectName () {
    return this.form.project_name
  }
  checkProjectName () {
    this.$http.get(`${config.chaingearApiUrl}/get-application/${this.projectName}`)
      .then(result => {
        if (result.body.message === 'successfully_finded') {
          this.invalidName = true
          this.notEnough = true
          this.errorMessage = 'Application with this project name already exists. If you want to change some info in this application, please, contact us.'
        } else return
      }).catch(err => {
        if (err.status === 404) {
          this.invalidName = false
        }
      })
   
  }
  // This properties are used in select inputs
  fieldsNames = {
    project_name: 'Project name',
    headline: 'Headline',
    text: 'Short description',
    state: 'Project State',
    dependency: 'Dependency',
    isICO: 'Is tokensale'
  }
  states = [
    {value: '0', label: 'Project (before tokensale begins)'},
    {value: '1', label: 'Pre-public (tokensale ends, but tokens ain`t tradable)'},
    {value: '2', label: 'Public Project (tokens are tradable)'}]
  dependency = [
    {value: 'Ethereum', label: 'Ethereum (ERC20/ERC223 Token)', consensus: 'Proof-of-Work'},
    {value: 'Waves', label: 'Waves platform', consensus: 'Proof-of-Stake'},
    {value: 'NEM Mosaic', label: 'NEM Mosaic', consensus: 'Proof-of-Importance'},
    {value: 'Bitcoin', label: 'Bitcoin', consensus: 'Proof-of-Work'},
    {value: 'Graphene', label: 'Bitshares/Graphene', consensus: 'Delegated Proof-of-Stake'},
    {value: 'independent', label: 'Core token of standalone blockchain'}]
  consensus = [
    {value: 'Proof-of-Work', label: 'Proof-of-Work'},
    {value: 'Proof-of-Stake', label: 'Proof-of-Stake'},
    {value: 'Delegated Proof-of-Stake', label: 'Delegated Proof-of-Stake'},
    {value: 'Proof-of-Authority', label: 'Proof-of-Authority'},
    {value: 'Proof-of-Burn', label: 'Proof-of-Burn'}]
  yesNo = [
    {value: true, label: 'Yes'},
    {value: false, label: 'No'}
  ]
  // This properties are used to show warn message if not all fields are valid
  notEnough = false
  errorMessage = ''
  // Checks if all fields are valid and if so automatically sets blockchain.dependency value and calls nextPane method defined on parent component
  next () {
    if (this.invalidName === true) {
      this.notEnough = true
      this.errorMessage = 'Application with this project name already exists. If you want to change some info in this application, please, contact us.'
      return 
    }
    const valid = (this.errors.items.length === 0)
    if (valid === true) {
      if(this.form.dependency !== 'independent') {
        this.form.consensus_name = this.dependency.filter(dependency => {
          return dependency.value === this.form.dependency
        })[0].consensus
      }
      if (this.form.dependency === 'Ethereum') {
        this.$store.commit('toggleIsErc20', true)
      }
      this.$emit('interface', {form: 'blockchain'})
    } else {
      this.notEnough = true
      this.errorMessage = `Please, fill all required fields`
    }
  }
}
</script>
