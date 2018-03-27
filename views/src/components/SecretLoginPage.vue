<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 sm2>
          <v-text-field
            name='username'
            label='Username'
            v-model='username'>
          </v-text-field>
          <v-text-field
            name='password'
            label='Password'
            v-model='password'>
          </v-text-field>
          <v-btn @click='login'>Login</v-btn>
        </v-flex>
        <v-snackbar
          :timeout="timeout"
          color='green darken-1'
          :top="y === 'top'"
          :bottom="y === 'bottom'"
          :right="x === 'right'"
          :left="x === 'left'"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
        >
          {{snackbarText}}
          <v-btn flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import * as config from '../config.js'

@Component({})
export default class SecretLoginPage extends Vue {
  username = ''
  password = ''
  snackbar = false
  y = 'top'
  x = null
  mode = ''
  timeout = 10000
  snackbarText = ''
  login () {
    this.$http.post(config.chaingearApiUrl + '/login', JSON.stringify({username: this.username, password: this.password}))
      .then(result => {
        this.$cookie.set('jwt', result.body.token, 1)
        this.snackbar = true
        this.snackbarText = 'Successfully logged in'
        this.username = ''
        this.password = ''
      })
  }
  // this.$cookie.set('test', 'Hello world!', 1);

}
</script>