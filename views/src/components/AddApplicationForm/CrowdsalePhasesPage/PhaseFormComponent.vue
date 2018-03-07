<template>
  <div>
    <v-card flat color='grey lighten-4'>
    <!-- Phase name and status -->
    <v-layout row wrap class='mt-3'>
      <v-flex xs8 sm5>
        <v-text-field
          label="Phase name*"
          name='phase_name'
          v-validate.initial="'required'"
          v-model="form.phase_name"
        ></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs8 sm5>
      <v-select
        v-bind:items='statuses'
        v-model="form.phase_status"
        name='phase_status'
        v-validate.initial="'required'"
        label="Phase status*"
        max-height='auto'></v-select>
      </v-flex>
    </v-layout>
      <div class="title mt-2 mb-3">Application for tokensale participation</div>
      <!-- Registration Dates -->
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application opens'
            suffix='UTC'
            v-model='form.registration.start_date'
            type='date'></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application closes'
            suffix='UTC'
            v-model='form.registration.end_date'
            type='date'></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application terms'
            hint='Link to the web page with the conditions of registration'
            persistent-hint
            v-model='form.registration.terms'>
          </v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Application website'
            v-model='form.registration.website'>
          </v-text-field>
        </v-flex>
      </v-layout>
      <div class="title mt-3 mb-3">Tokensale terms</div>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Tokensale start date*'
            name='ico_start_datr'
            v-validate.initial="'required'"
            suffix='UTC'
            v-model='form.dates.start_date'
            type='date'></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Tokensale end date*'
            name='ico_end_date'
            v-validate.initial="'required'"
            suffix='UTC'
            v-model='form.dates.end_date'
            type='date'></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm5>
          <v-text-field
            label='Issued tokens'
            hint='Amount of tokens released at this phase'
            persistent-hint
            v-model='form.terms.issued_tokens'>
          </v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs8 sm5>
          <v-text-field
            label='Sold tokens'
            hint='Amount of tokens sold at this phase'
            persistent-hint
            v-model='form.terms.sold_tokens'>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6>
        <!-- Token distribution Dates -->
          
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 sm6>
          <v-text-field
            label='Cap limit'
            hint='Goal of raising funds, to achieve which the sale of tokens is completed'
            persistent-hint
            v-model='form.terms.cap_limit[0].amount'>
          </v-text-field>
        </v-flex>
        <v-flex xs2>
        <v-select
          v-bind:items="currency"
          v-model="form.terms.cap_limit[0].currency" 
          max-height='auto'></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8>
          <v-text-field
            label='Raised funds'
            hint="Fill this field only if your tokensale already started"
            suffix='USD'
            v-model='form.raised_funds[0].amount'>
          </v-text-field>
        </v-flex>
      </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          label='Raised funds'
          hint="Fill this field only if your tokensale already started"
          suffix='ETH'
          v-model='form.raised_funds[1].amount'>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          label='Raised funds'
          hint="Fill this field only if your tokensale already started"
          suffix='BTC'
          v-model='form.raised_funds[2].amount'>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 sm6>
        <v-text-field
          label='Token final price'
          hint='Token price at the end of the sale'
          persistent-hint
          v-model='form.prices.token_final_price[0].price'>
        </v-text-field>
      </v-flex>
      <v-flex xs2>
      <v-select
        v-bind:items="currency"
        v-model="form.prices.token_final_price[0].currency"
        max-height='auto'></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 sm5>
        <v-text-field
          label='Token distribution date'
          suffix='UTC'
          hint='Date of distribution of tokens among participants in their sale'
          persistent-hint
          v-model='form.terms.token_distribution_date'
          type='date'></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
    <v-flex xs12>
    <MultipleValuesContainer
      @interface='addBonuses'
      :firstField='firstField1'
      :secondField='secondField1'
      :color='color'
      :head='head2'
      :buttonText='buttonText1'
      :headers='headers1'
      :items='form.prices.bonuses'>
    </MultipleValuesContainer>
    </v-flex>
    </v-layout>
    <v-layout row wrap>
    <MultipleValuesContainer
      @interface='addAddresses'
      :firstField='firstField'
      :secondField='secondField'
      :color='color'
      :head='head'
      :buttonText='buttonText'
      :headers='headers'
      :items='form.terms.crowdsale_addresses'>
    </MultipleValuesContainer>
    </v-layout>
    <v-layout row wrap>
    <MultipleValuesContainer
      @interface='addContracts'
      :firstField='firstFieldContracts'
      :secondField='secondFieldContracts'
      :color='color'
      v-if='isErc20'
      :head='head1'
      :buttonText='buttonTextContracts'
      :headers='headers2'
      :items='form.contract'>
    </MultipleValuesContainer>
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
    </v-layout>
  </v-flex>
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
  <v-dialog v-model="question" max-width="290">
      <v-card>
        <v-card-title class="headline">Describe another phase?</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="move">No</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="stay">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-card>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import MultipleValuesContainer from '../MultipleValuesContainer'
import * as phaseTemplate from '../../../helpers/phase-template'

@Component({
  components: {
    MultipleValuesContainer
  }
})
export default class PhaseFormComponent extends Vue {
  @Prop({default: 0})
  num
  // Computed prop that relies on state isErc20 prop. If true, components renders additional form for smart contract addresses
  get isErc20 () {
    return this.$store.getters.getIsErc20
  }
  // Computed prop that fetches a crowdsale phase description from state
  get form () {
    return this.$store.getters.getPhase(this.num)
  }
  // Lists for select inputs
  currency = ['USD', 'ETH', 'BTC']
  statuses = ['Planned', 'Active', 'Finished']
  // Properties for multiple values forms initialization. Each form needs 4 props: firstField, secondField, buttonText and heading
  firstField1 = {
    key: 'amount',
    hint: 'Number or %',
    type: 'str',
    label: 'Amount'
  }
  secondField1 = {
    key: 'condition',
    hint: '',
    type: 'str',
    label: 'Condition'
  }
  buttonText1 = 'Add bonus'
  head2 = 'Bonuses'
  color = 'grey lighten-3'
  headers1 = [
    {
      text: 'Amount',
      value: 'amount'
    },
    {
      text: 'Condition',
      value: 'condition'
    }
  ]
  head = 'Crowdsale wallets'
  head1 = 'Crowdsale contracts'
  firstField = {
    key: 'address',
    hint: '',
    type: 'address',
    label: 'Address'
  }
  secondField = {
    key: 'currency',
    hint: 'For example, ETH, BTC, LTC',
    type: 'str',
    label: 'Currency'
  }
  buttonText = 'Add address'
  color = 'cyan lighten-4'
  firstFieldContracts = {
    key: 'address',
    hint: `Filled if dependency = ERC20. Address a smart contract 
for the sale of tokens in the network of the Etherium`,
    type: 'contract',
    label: 'Contract address'
  }
  secondFieldContracts = {
    key: 'type',
    hint: `Type of smart contract for the sale of tokens in the network of the Ethereum. You can find it in https://etherscan.io on the page of the corresponding contract in the section Contract Overview (NameTag). If there is no contract type, the field will not need to be filled.`,
    type: 'str',
    label: 'Contract type'
  }
  buttonTextContracts = 'Add contract'
  headers = [
    {
      text: 'Address',
      value: 'address'
    },
    {
      text: 'currency',
      value: 'currency'
    }
  ]
  headers2 = [
    {
      text: 'Address',
      value: 'address'
    },
    {
      text: 'Type',
      value: 'type'
    }
  ]
  // Props for alert dialog
  notEnough = false
  errorMessage = ''
  question = false
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
      this.$store.commit('addEmptyPhase')
    } else if (valid === true && this.form.commited === true) {
      this.$emit('interface', {nextPage: true})
    } else {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    }
  }
  // Method that invoked when user decides to add another phase description
  move () {
    this.question = false
    this.$emit('interface', {nextPage: true})
  }
  // Method that invoked when user don't want to add another phase description
  stay () {
    this.question = false
    this.$emit('interface', {nextPage: false})
  }
  // Methods to push data form MultipleValuesContainer to form object
  addAddresses (data) {
    this.form.terms.crowdsale_addresses.push(data)
  }
  addContracts (data) {
    this.form.contract.push(data)
  }
  addBonuses (data) {
    this.form.prices.bonuses.push(data)
  }
}
</script>
