<template>
  <div >
    <v-toolbar app clipped-left>
    <v-toolbar-title @click='goHome'>Chaingear</v-toolbar-title>
    <!-- Buttons list that is visible on small viewports -->
    <v-menu :nudge-width="100" class="hidden-md-and-up">
        <v-toolbar-title slot="activator">
          <v-icon color='grey'>fa-bars</v-icon>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list class='grey lighten-3'>
        <v-layout row wrap>
          <v-btn flat @click="addInfoRedirect">Add info</v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-btn flat @click="crowdsalesRedirect">Applications</v-btn>
        </v-layout>
        </v-list>
      </v-menu>
    <!-- Buttons that are visible on medium and large viewports -->
    <v-toolbar-items class="ml-4 hidden-sm-and-down">
      <v-btn flat @click="addInfoRedirect">Add info</v-btn>
      <v-btn flat @click="crowdsalesRedirect">Applications</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
    <!-- Dialog component that show window with contact information -->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn flat class='mt-4' slot="activator">Having problems?</v-btn>
      <v-card color='grey lighten-4'>
        <v-card-title>
          <span class="display-1">Connect with us: </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <v-layout row wrap class="ml-2">
              <p class="subheading"><v-icon>fa-envelope</v-icon>  <a href='mailto:m.odegov@cyberfund.io'>Mail</a></p>
              </v-layout>
              <v-layout row wrap class="ml-2">
              <p class="subheading"><v-icon>fa-github</v-icon> <a href='https://github.com/cyberFund/chaingear-form/issues'>Github Issues</a></p>
              </v-layout>
              <v-layout row wrap class="ml-2">
              <p class="subheading"><v-icon>fa-book</v-icon> <a href="https://github.com/cyberFund/chaingear-form/wiki/Add-project-to-ICO-Radar">User Guide</a></p>
              </v-layout>
              <v-layout row wrap class="ml-2">
              <p class="subheading"><v-icon>fa-twitter</v-icon> <a href='https://twitter.com/cyberfundio'>Twitter</a></p>
              </v-layout>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-toolbar-items>
  </v-toolbar>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoForm extends Vue {
  // Prop used to show contacts dialog. Changed to true if user clicks 'Having problems' button and changed back to false after clicking 'Ok' inside contacts dialog
  dialog = false
  // This method redirects to the main page route
  goHome () {
    this.$router.push('/')
  }
  // This method redirects to the applications list page route
  crowdsalesRedirect () {
    this.$router.push('/applications')
  }
  // This method redirects to the form page route
  addInfoRedirect () {
    this.$router.push('/add_info')
  }
}
</script>
