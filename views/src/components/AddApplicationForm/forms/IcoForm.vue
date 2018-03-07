<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <FormPageHeader
        bgImageSrc='/dist/static/doc-images/cards/docks3.png'
        cardHeadline='Tokensale'>
      </FormPageHeader>
      <!-- Main content -->
      <v-card-text>
        <v-container fluid>
          <!-- Common info -->
          <v-layout row wrap>
            <v-flex xs12 md12>
              <span class="title">Common info</span>
              <v-flex xs12 sm8>
              <v-text-field
                label='Sales agreement*'
                hint='Link to the tokensale terms'
                persistent-hint
                v-model='form.terms.sales_agreement'>
              </v-text-field>
              <v-text-field
                label='Sales website*'
                hint='Link to the web page for selling tokens'
                persistent-hint
                v-model='form.terms.sales_url'>
              </v-text-field>
              <v-text-field
                label='Total token supply'
                v-model='form.token_distribution.total_supply'>
              </v-text-field>
              </v-flex>
            </v-flex>
          </v-layout>
          <!-- Funds -->
          <v-layout row wrap>
            <FundsFormContainer @interface='addMultiple'></FundsFormContainer>
          </v-layout>
          <v-layout row wrap class="mt-2">
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn color="primary" @click="next">Continue</v-btn>
          </v-layout>
          <!-- Alert -->
          <WarnComponent
            @interface='okClick'
            :notEnough='notEnough'
            :errorMessage='errorMessage'>
          </WarnComponent>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import { required, numeric, url } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'
import FormPageHeader from '../FormPageHeader'
import FundsFormContainer from '../FundsFormContainer'
import WarnComponent from '../WarnComponent'

@Component({
  components: {
    FormPageHeader,
    FundsFormContainer,
    WarnComponent
  }
})
export default class IcoForm extends Vue {
  // This properties is used in alert dialog which tell users that some of entered values is invalid
  notEnough = false
  errorMessage = ''
  // Properties that defines validation rules
  rules = {
    required: (value) => !!value || 'Required'
  }
  isNum (value) {
    return !isNaN(value - parseFloat(value))
  }
  // Computed prop that fetches ICO common info description object from state
  get form () {
    return this.$store.getters.getCommonInfo
  }
  // This properies are probably unnessesary and should be deleted
  distr = []
  proceeds = []
  addMultiple (data) {
    if (data.key === 'proceeds') {
      this.proceeds.push(data.value)
    } else if (data.key === 'distr') {
      this.distr.push(data.value)
    } else {
      return
    }
  }
  // This method closes alert dialog
  okClick (data) {
    this.notEnough = false
  }
  // This method calls parent nextPane method to switch current pahe to previous
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method validates entered data and if true calls parent nextPane method to switch current pahe to next
  next () {
    this.$emit('interface', {form: 'ico', data: this.form})
  }
}
</script>
