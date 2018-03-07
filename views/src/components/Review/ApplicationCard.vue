<template>
  <div>
    <v-card color="grey lighten-4" class='ma-2'>
      <v-card-media
        v-bind:class='[color]'
        height='70px'
        >
        <v-container fluid>
          <v-layout justify-space-between>
            <v-flex xs4 class='mt-2'>
              <span class="headline">{{project.project_name}}</span>
            </v-flex>
            <v-flex xs3>
            <div class='rounded grey lighten-4'>
              <v-tooltip right>
                <v-btn flat icon slot='activator'><v-icon color="success" medium>fa-check-circle</v-icon></v-btn>
                <span>Submit</span>
              </v-tooltip>
              <v-tooltip right>
                <v-btn flat icon slot='activator'><v-icon color='error' medium>fa-ban</v-icon></v-btn>
                <span>Reject</span>
              </v-tooltip>
            </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap justify-center align-center>
            <v-flex xs3>
              <a class="buttoned" v-bind:href='website.url'><v-btn flat><v-icon medium left>fa-link</v-icon>Site</v-btn></a>
            </v-flex>
            <v-flex xs3>
              <a class="buttoned" v-bind:href='paper'><v-btn :disabled='!paper' flat><v-icon medium left>fa-file</v-icon>Paper</v-btn></a>
            </v-flex>
            <v-flex xs3>
              <a class="buttoned" v-bind:href='git'><v-btn :disabled='!git' flat><v-icon medium left>fa-github-square</v-icon>Github</v-btn></a>
            </v-flex>
            <v-flex xs3>
              <v-btn flat><v-icon medium color='green lighten-1'>fa-edit</v-icon></v-btn>
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

@Component({})
export default class ApplicationCard extends Vue {
  @Prop({default: () => []})
  project
  @Prop({default: ''})
  color
  website = {
    name: '',
    url: ''
  }
  paper = ''
  git = ''
  blog = ''
  mounted () {
    const info = this.project.project_info
    this.website.name = info.app.info[0].links.filter(link => link.type === 'website')[0].name
    this.website.url = info.app.info[0].links.filter(link => link.type === 'website')[0].url
    if (info.app.info[0].links.filter(link => link.type === 'paper').length > 0) {
      this.paper = info.app.info[0].links.filter(link => link.type === 'paper')[0].url
    } else this.paper = false
    if (info.app.info[0].links.filter(link => link.type === 'github').length > 0) {
      this.git = info.app.info[0].links.filter(link => link.type === 'github')[0].url
    } else this.git = false
  }
}
</script>
<style>
.rounded {
  border-radius: 10px;
}
.buttoned {
  text-decoration: none;
}
</style>