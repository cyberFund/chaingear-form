<template>
  <div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs7 sm7>
            <v-text-field
              :label='firstField.label'
              v-model='form[firstField.key]'>
            </v-text-field>
            </v-flex>
            <v-flex xs1 class='mt-3'>
            <v-tooltip right v-if='firstField.label === "Contract address"'>
                <v-icon color="default" slot="activator">info</v-icon>
                <span><pre>{{firstField.hint}}</pre></span>
              </v-tooltip>
            </v-flex>
            <v-flex xs7>
            <v-text-field
              :label='secondField.label'
              v-model='form[secondField.key]'>
            </v-text-field>
          </v-flex>
          <v-flex xs1 class='mt-3'>
            <v-tooltip right v-if='firstField.label === "Contract address"'>
                <v-icon color="default" slot="activator">info</v-icon>
                <span><pre>{{secondField.hint}}</pre></span>
              </v-tooltip>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-btn
            flat
            class="hidden-sm-and-down"
            color='success'
            @click="send">{{buttonText}}
          </v-btn>
          <v-btn
            flat
            class="hidden-md-and-up"
            color='success'
            @click="send">{{buttonText}}
          </v-btn>
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
                  <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-layout>
      </v-container>
    
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import WAValidator from 'wallet-address-validator'

@Component({})
export default class MultipleValuesForm extends Vue {
  // This props holds info that is used in form inputs
  @Prop({default: ''})
  color
  @Prop({default: {}})
  firstField
  @Prop({default: {}})
  secondField
  @Prop({default: ''})
  buttonText
  form = {}
  errorMessage = ''
  // This properties define validation rules
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  notEnough = false
  // This method checks if passed string is valid Ethereum address
  checkEthAddress (addr) {
    const ox = addr.slice(0, 2)
    if (addr.length !== 42) {
      return false
    } else if (ox !== '0x') {
      return false
    } else if (addr.match(/^[a-z0-9]+$/i) === null) {
      return false
    } else {
      return true
    }
  }
  // This method validates entered values. If values is valid, sends it to a parent component, otherwise shows alert 
  send () {
    if (this.firstField.type === 'contract' && this.form[this.firstField.key].length > 0) {
      this.$emit('interface', {formData: this.form})
      this.form = {}
    } else if (!this.form[this.firstField.key] || !this.form[this.secondField.key]) {
      this.notEnough = true
      this.errorMessage = 'Please, fill both fields'
    } else {
      if (this.secondField.type === 'address' && secondValue === 'eth') {
        if (checkEthAddress(this.form[this.firstField.key]) === false) {
          this.notEnough = true
          this.errorMessage = 'Please, enter a valid Ethereum address (starts with 0x, only alphanumerical characters, 42 characters long)'
        } else {
          this.$emit('interface', {formData: this.form})
          this.form = {}
        }
      } else if (this.secondField.type === 'address' && secondValue === 'btc') {
        if (WAValidator.validate(this.form[this.firstField.key], 'BTC') === false) {
          this.notEnough = true
          this.errorMessage = 'Please, enter a valid Bitcoin address (starts with 1, 3 or bc1, only alphanumerical characters except O, 0, I and l, 26-34 characters long)'
        } else {
          this.$emit('interface', {formData: this.form})
          this.form = {}
        }
      } else if (this.secondField.type === 'address' && secondValue === 'ltc') {
        if (WAValidator.validate(this.form[this.firstField.key], 'LTC') === false) {
          this.notEnough = true
          this.errorMessage = 'Please, enter a valid Litecoin address'
        } else {
          this.$emit('interface', {formData: this.form})
          this.form = {}
        }
      } else if (this.firstField.type === 'num') {
        const isNum = !isNaN(this.form[this.firstField.key] - parseFloat(this.form[this.firstField.key]))
        if (isNum === false) {
          this.notEnough = true
          this.errorMessage = 'Percent must be a number'
        } else {
          this.$emit('interface', {formData: this.form})
          this.form = {}
        }
      } else {
        this.$emit('interface', {formData: this.form})
        this.form = {}
      }
    }
  }
}
</script>
