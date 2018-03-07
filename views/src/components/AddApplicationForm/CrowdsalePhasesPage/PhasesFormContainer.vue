<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='130px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top-phases' class="first display-1">Tokensale</div>
              <div class="title mt-3 ml-1">Phase description</div>
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
                  v-for="(phase, i) in phases" 
                  :key="i"
                  >
                  <span v-if='phase.phase_name.length === 0'>Phase {{ i + 1 }}</span>
                  <span v-if='phase !== null'>{{phase.phase_name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(phase, i) in phases" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <PhaseFormComponent
                      :num='i'
                      @interface='moveOrStay'></PhaseFormComponent>
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
import {Component, Prop} from 'vue-property-decorator'
import PhaseFormComponent from './PhaseFormComponent'
import WarnComponent from '../WarnComponent'

@Component({
  components: {
    PhaseFormComponent,
    WarnComponent
  }
})
export default class PhasesFormContainer extends Vue {
  // Number of currently displayed phase; changed when moveOrStay method is invoked with data.nextPage = false
  active = 0
  // Props for alert dialog
  notEnough = false
  errorMessage = ''
  // Computed prop that fetches list of crowdsale phases from state
  get phases () {
    return this.$store.getters.getAllPhases
  }
  // Method that invokes parent nextPane method to switch cuurent page or scrolls page view on top and switch to a next tab
  moveOrStay (data) {
    if (data.nextPage === true) {
      this.$emit('interface', {form: 'apps'})
    } else if (data.prev === true) {
      this.$emit('interface', {action: 'previous'})
    } else {
      this.$nextTick(() => {
        setTimeout(() => {
          this.active = (parseInt(this.active) + 1).toString()
          const container = document.querySelector('#anchor-top-phases')
          container.scrollIntoView(false)
        }, 100)
      })
    }
  }
}
</script>
