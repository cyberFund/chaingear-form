<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <div class="headline">Links</div>
              <div class="caption mt-3 ml-2">* - required</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm8>
              <v-text-field
                label='Website*'
                :rules="[
                  rules.required,
                  () => $v.form.website.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.website'>
              </v-text-field>
              <v-text-field
                label='Whitepaper'
                :rules="[
                  () => $v.form.paper.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.paper'>
              </v-text-field>
              <v-text-field
                label='Github'
                :rules="[
                  () => $v.form.github.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.github'>
              </v-text-field>
              <v-text-field
                label='Blog'
                :rules="[
                  () => $v.form.blog.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.blog'>
              </v-text-field>
              <v-text-field
                label='Bitcointalk'
                :rules="[
                  () => $v.form.bitcointalk.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.bitcointalk'>
              </v-text-field>
              <v-text-field
                label='Twitter'
                :rules="[
                  () => $v.form.twitter.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.twitter'>
              </v-text-field>
              <v-text-field
                label='Telegram'
                :rules="[
                  () => $v.form.telegram.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.telegram'>
              </v-text-field>
              <v-text-field
                label='Reddit'
                :rules="[
                  () => $v.form.reddit.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.reddit'>
              </v-text-field>
              <v-text-field
                label='Slack'
                :rules="[
                  () => $v.form.slack.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.slack'>
              </v-text-field>
              <v-text-field
                label='Rocket'
                :rules="[
                  () => $v.form.rocket.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.rocket'>
              </v-text-field>
              <v-text-field
                label='Facebook'
                :rules="[
                  () => $v.form.facebook.url !== false || 'Should be a valid url (for example: https://example.com)'
                ]"
                v-model='form.facebook'>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn color="default" @click="prev">Previous</v-btn>
            <v-btn color="primary" @click="next">Continue</v-btn>
          </v-layout>
          <v-dialog v-model="notEnough" max-width="390">
                <v-card dark>
                  <v-card-title class="headline">Error</v-card-title>
                  <v-card-text>
                    <v-alert color="error" icon="warning" v-show="notEnough" value="true">
                      {{errorMessage}}
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat="flat" @click.native="notEnough = false">Ok</v-btn>
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
import { required, url } from 'vuelidate/lib/validators'
import {Component} from 'vue-property-decorator'

@Component({
  validations: {
    form: {
      website: {
        required,
        url
      },
      paper: {url},
      github: {url},
      blog: {url},
      twitter: {url},
      bitcointalk: {url},
      telegram: {url},
      reddit: {url},
      slack: {url},
      rocket: {url},
      facebook: {url}
    }
  }
})
export default class LinksForm extends Vue {
  form = {}
  rules = {
    required: (value) => !!value || 'Required'
  }
  requiredFields = ['website']
  // This properties is used in alert dialog which tell users that some of entered values is invalid
  notEnough = false
  errorMessage = ''
  // This method calls parent nextPane method to switch current pahe to previous
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method checks if all entered data is enough and valid and if so calls parent nextPane method to change current page to the next
  next () {
    if (this.$v.$invalid !== true) {
      const tmp = Object.keys(this.form).map(key => {
        const link = {
          type: key,
          name: key.charAt(0).toUpperCase() + key.slice(1),
          url: this.form[key],
          tags: ['News']
        }
        switch (key) {
          case 'website':
            link.tags = ['Main']
            break
          case 'paper':
            link.tags = ['Main', 'Science']
            break
          case 'github':
            link.tags = ['Main', 'Code']
            break
          case 'blog':
            link.tags = ['Main', 'News']
        }
        return link
      })
      this.$store.commit('addLinks', tmp)
      this.$emit('interface', {form: 'links'})
    } else if (this.$v.form.website.required === false) {
      this.notEnough = true
      this.errorMessage = 'Please, enter a link to website'
    } else {
      this.notEnough = true
      this.errorMessage = 'Please, enter valid URLs'
    }
  }
}
</script>
