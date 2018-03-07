<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn flat slot="activator">Login</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-text-field v-model='username' label="Golos username" required></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field
                  v-model='posting'
                  label="Private posting key"
                  hint='It will be used only for username verification. It will not be stored in your browser or sent to server'
                  type='password'
                  required></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-alert v-show='incorrectWif' color="error" icon="warning" value="true">
                  This posting key is incorrect. Please, check it and try again
                </v-alert>
              </v-layout>
              <v-layout row wrap>
                <v-alert v-show='successfulLogin' color="success" icon="warning" value="true">
                  Successfuly logged in!
                </v-alert>
              </v-layout>
              <v-layout row wrap>
                <v-btn
                  class='mt-2'
                  color='success'
                  :loading='loading'
                  :disabled='loading'
                  @click='checkWif'
                  >Login</v-btn>
                <v-btn @click.native='dialog = false'>Cancel</v-btn>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import golos from 'golos-js'

@Component({})
export default class IcoForm extends Vue {
  @Prop({default: () => {}})
  lstorage
  dialog = false
  locstorage
  username = ''
  posting = ''
  loading = false
  incorrectWif = false
  successfulLogin = false
  // This method creates a mock transaction, signs it with wif specified by user and verifies signature by the golos-js verifyAuthority method. If wif is correct, method saves specified username in browser local storage. If wif has incorrect format or if it does not match with username, it displays an error message 
  checkWif () {
    this.loading = true
    golos.api.getDynamicGlobalProperties((err, res) => {
      const mockTx = {
        ref_block_num: res.head_block_number & 0xFFFF,
        ref_block_prefix: new Buffer(res.head_block_id, 'hex').readUInt32LE(4),
        expiration: new Date(new Date().valueOf() + 30000),
        operations: [
          [
            'custom_json',
            {
              required_auths: [],
              required_posting_auths: [this.username],
              id: 'golos-chaingear-login',
              json: JSON.stringify({
                none: 'none'
              })
            }
          ]
        ]
      }
      try {
        const signed = golos.auth.signTransaction(mockTx, {posting: this.posting})
        golos.api.verifyAuthority(signed, (err, res) => err?console.log(err):'Fine')
        .then(res => {
          this.loading = false
          this.incorrectWif = false
          this.successfulLogin = true

          localStorage.setItem('username', this.username)
          localStorage.setItem('logged_in', true)
          this.posting = ''
          setTimeout(() => {
            this.dialog = false
          }, 3000)
        })
        .catch(error => {
          this.incorrectWif = true
          this.loading = false
          this.posting = ''
        })
      } catch (e) {
        console.log(e)
        this.incorrectWif = true
          this.loading = false
          this.posting = ''
      }
    })
  }
}
</script>
