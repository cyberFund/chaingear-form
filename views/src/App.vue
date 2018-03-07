<template>
  <div id="app">
  <v-app>
      <Header></Header>
      <v-content>
        <v-container fluid grid-list-md>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer color="grey lighten-3" class="pa-3">
        <v-spacer></v-spacer>
        <div>© 2018</div>
      </v-footer>
  </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import Header from './components/Header'
import AddProjectFormContainer from './components/AddApplicationForm/AddProjectFormContainer'
import SideMenu from './components/SideMenu'

@Component({
  components: {
    Header,
    SideMenu,
    AddProjectFormContainer
  }
})
export default class App extends Vue {}
</script>

