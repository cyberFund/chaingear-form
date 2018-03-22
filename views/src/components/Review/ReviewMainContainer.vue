<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md12>
          <AllApplications></AllApplications>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import AllApplications from './AllApplications'

@Component({
  components: {
    AllApplications
  }
})
export default class ReviewMainComponent extends Vue {}
</script>