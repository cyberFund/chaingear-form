<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm8>
              <v-text-field
                name='app_name'
                v-validate.initial="'required'"
                label='Application name*'
                v-model='form.name'>
              </v-text-field>
              <v-select
                name='Same_blockchain'
                v-validate.initial="'required'"
                v-bind:items="same"
                v-model="form.same_blockchain"
                label="Same blockchain?*"
                hint='Does the project use the same blocking system for the functioning<br> of its product where the tokens were sold or not?'
                persistent-hint
                item-text="label"
                item-value="value">
              </v-select>
              <v-select
                name='sources'
                v-validate.initial="'required'"
                v-bind:items="available"
                v-model="form.sources_availability"
                label="Sources availability*"
                hint='Is the source code available for the product or not?'
                persistent-hint
                item-text="label"
                item-value="value">
              </v-select>
              <v-select
                name='status'
                v-validate.initial="'required'"
                v-bind:items="status"
                v-model="form.app_status"
                label="Application status*"
                item-text="label"
                item-value="value">
              </v-select>
              <v-text-field
                name='type'
                v-validate.initial="'required'"
                label='Application type*'
                hint='Type of your app: Wallet, Marketplace etc'
                persistent-hint
                v-model='form.app_type'>
              </v-text-field>
              <v-text-field
                name='url'
                label='Link to application'
                v-model='form.app_url'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn
              @click='ask'
              color='primary'
              >
              Continue
            </v-btn>
          </v-layout>
          <v-dialog v-model="question" max-width="290">
            <v-card>
              <v-card-title class="headline">Describe another app?</v-card-title>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="move">No</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="stay">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="notEnough" max-width="390">
            <v-card dark>
              <v-card-title class="headline">Error</v-card-title>
              <v-card-text>
                <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                  {{errorMessage}}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat="flat" @click.native='notEnough = false'>Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { required, url } from 'vuelidate/lib/validators'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class AppForm extends Vue {
  // Prop that defines which app description this component should fetch from state.apps array
  @Prop({default: 0})
  num
  // This method fetches object with phase description from state.apps array
  get form () {
    return this.$store.getters.getApp(this.num)
  }
  // This properties are usedin select inputs
  available = [{label: 'Available', value: 'true'}, {label: 'Not available', value: 'false'}]
  same = [{label: 'No', value: 'false'}, {label: 'Yes', value: 'true'}]
  status = [
    {
      label: 'Not working product',
      value: '1'
    },
    {
      label: 'Working prototype (alpha, beta)',
      value: '2'
    },
    {
      label: 'Working product in operation',
      value: '3'
    }
  ]
  question = false
  // This properties is used in alert dialog
  notEnough = false
  errorMessage = ''
  // This method calls parent nextPane method to switch current pahe to previous
  prev () {
    this.$emit('interface', {prev: true})
  }
  // This method validates data entered in form and if true, adds empty object in state phases array and switch tab or page to next
  ask () {
    const valid = (this.errors.items.length === 0)
    if (valid === true && this.form.commited === false) {
      this.question = true
      this.form.commited = true
      this.$store.commit('addEmptyApp')
    } else if (valid === true && this.form.commited === true) {
      this.$emit('interface', {nextPage: true})
    } else {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    }
  }
  // Method that invoked when user don't want to add another phase description
  move () {
    this.question = false
    this.$emit('interface', {nextPage: true})
  }
  // Method that invoked when user decides to add another phase description
  stay () {
    this.question = false
    this.$emit('interface', {nextPage: false})
  }
}
</script>
