<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end>
              <div id='anchor-top-apps' class="first display-1">Application</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <div class="title">Do you have an application?</div>
              <v-switch v-bind:label="`${isApp?'Yes':'No'}`" class='mt-3' v-model="isApp"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if='isApp'>
            <v-flex xs12 md12>
              <v-tabs
                v-model="active"
                color="grey lighten-2"
                slider-color="block">
                <v-tab
                  v-for="(app, i) in apps" 
                  :key="i"
                  >
                  <span v-if='app.name.length === 0'>Application {{ i + 1 }}</span>
                  <span v-if='app !== null'>{{app.name}}</span>
                </v-tab>
                <v-tab-item
                  v-for="(app, i) in apps" 
                  :key="i">
                  <v-flex class='ma-3'>
                    <AppForm
                      :num='i'
                      @interface='moveOrStay'></AppForm>
                  </v-flex>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-if='!isApp'>
            <v-flex xs6>
              <v-btn color="default" @click="moveOrStay({prev: true})">Previous</v-btn>
              <v-btn
                @click='moveOrStay({nextPage: true})'
                color='primary'>Continue</v-btn>
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
import AppForm from './forms/AppForm'

@Component({
  components: {
    AppForm
  }
})
export default class AppsFormContainer extends Vue {
  get apps () {
    return this.$store.getters.getAllApps
  }
  isApp = false
  active = 0
  // This method calls parent nextPane() method to change current page to previous or next
  moveOrStay (data) {
    console.log(this.$store.getters.getAllApps)
    if (data.nextPage === true) {
      this.$emit('interface', {form: 'apps'})
    } else if (data.prev === true) {
      this.$emit('interface', {action: 'previous'})
    } else {
      this.$nextTick(() => {
        setTimeout(() => {
          this.active = (parseInt(this.active) + 1).toString()
          const container = document.querySelector('#anchor-top-apps')
          container.scrollIntoView(false)
        }, 100)
      })
    }
  }
}
</script>
