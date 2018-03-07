<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top-tokens' class="first display-1">Token</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <v-tabs
                v-model="active"
                color="grey lighten-2"
                slider-color="black">
                <v-tab
                  v-for="(token, i) in tokens" 
                  :key="i"
                  >
                  <span v-if='token.name.length === 0'>Token {{ i + 1 }}</span>
                  <span v-if='token.name.length > 0'>{{token.name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(token, i) in tokens" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <TokenForm
                      :num='i'
                      @interface='moveOrStay'></TokenForm>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import TokenForm from './forms/TokenForm'
import WarnComponent from './WarnComponent'

@Component({
  components: {
    TokenForm,
    WarnComponent
  }
})
export default class TokensFormContainer extends Vue {
  get tokens () {
    return this.$store.getters.getAllTokens
  }
  n = 0
  active = 0
  notEnough = false
  errorMessage = ''
  moveOrStay (data) {
    console.log(this.$store.getters.getAllTokens)
    if (data.nextPage === true) {
      this.$emit('interface', {form: 'tokens'})
    } else if (data.prev === true) {
      this.$emit('interface', {action: 'previous'})
    } else {
      this.$nextTick(() => {
        setTimeout(() => {
          this.active = (parseInt(this.active) + 1).toString()
          const container = document.querySelector('#anchor-top-tokens')
          container.scrollIntoView(false)
        }, 100)
      })
    }
  }
  // This method adds object with app description in front of this.form.tokens array and scrolls page view on top 
  addToken (data) {
    this.form.tokens.splice(this.form.tokens.length - 1, 0, data)
    this.$nextTick(() => {
      setTimeout(() => {
        this.active = (parseInt(this.active) + 1).toString()
        const container = document.querySelector('#anchor-top1')
        container.scrollIntoView(false)
      }, 100)
    })
  }
}
</script>
