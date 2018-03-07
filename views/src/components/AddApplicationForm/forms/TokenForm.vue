<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-text-field
                label='Token Name*'
                name='name'
                v-validate.initial="'required'"
                hint='Ex. Bitcoin, Ethereum'
                persistent-hint
                v-model='form.name'>
              </v-text-field>
              <v-text-field
                label='Token Symbol*'
                name='symbol'
                v-validate.initial="'required'"
                hint='Ex. BTC, ETH, GBG'
                persistent-hint
                v-model='form.symbol'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="purpose"
                v-model="form.token_purpose"
                name='purpose'
                v-validate.initial="'required'"
                label="Token purpose*"
                max-height='auto'></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm8>
              <v-select
                v-bind:items="type"
                v-model="form.token_type"
                name='type'
                v-validate.initial="'required'"
                label="Token type*"
                hint='Core token - token uses its own blockchain. Blockchain issued token - token uses an existing blockchain (Ex. Ethereum)'
                persistent-hint
                max-height='auto'></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Inflation rate'
                  multi-line
                  hint="Description of the mechanism for increasing or decreasing the total supply of tokens"
                  persistent-hint
                  v-model='form.inflation_rate'>
                </v-text-field>
              </v-flex>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Circulation terms'
                  multi-line
                  hint='Description of the platform commissions and the fate of the tokens used to pay it (returned to the market or destroyed)'
                  persistent-hint
                  v-model='form.circulation_terms'>
                </v-text-field>
              </v-flex>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Governance rights project'
                  multi-line
                  hint='List of the rights of holders of tokens for participation in the management of further development of the project'
                  persistent-hint
                  v-model='form.governance_rights_project'>
                </v-text-field>
              </v-flex>
              <v-flex xs10 sm8>
                <v-text-field
                  label='Governance rights organization'
                  multi-line
                  hint='List of the rights of holders of tokens for participation in the operational activities of the project'
                  persistent-hint
                  v-model='form.governance_rights_org'>
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
          <v-dialog v-model="notEnough" max-width="390">
                <v-card dark>
                  <v-card-title class="headline">Error</v-card-title>
                  <v-card-text>
                    <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                      Please, fill all required fields
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="question" max-width="290">
      <v-card>
        <v-card-title class="headline">Describe another token?</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="move">No</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="stay">Yes</v-btn>
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
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class Token extends Vue {
  @Prop({default: 0})
  num
  get form () {
    return this.$store.getters.getToken(this.num)
  }
  purpose = ['Raising funds', 'Utility', 'Both']
  type = ['Core token', 'Blockchain issued token']
  notEnough = false
  question = false
  prev () {
    this.$emit('interface', {prev: true})
  }
  ask () {
    const valid = (this.errors.items.length === 0)
    if (valid === true && this.form.commited === false) {
      this.question = true
      this.form.commited = true
      this.$store.commit('addEmptyToken')
    } else if (valid === true && this.form.commited === true) {
      this.$emit('interface', {nextPage: true})
    } else {
      this.notEnough = true
      this.errorMessage = 'Please, fill all required fields'
    }
  }
  move () {
    this.question = false
    this.$emit('interface', {nextPage: true})
  }
  stay () {
    this.question = false
    this.$emit('interface', {nextPage: false})
  }
}
</script>
