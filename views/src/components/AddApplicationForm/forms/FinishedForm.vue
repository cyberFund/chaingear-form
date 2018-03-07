<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='70px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="display-1">{{project.description.project_name}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
              <v-flex xs3>
                <span class="headline"><a v-bind:href='website.url'>Site</a></span>
              </v-flex>
              <v-flex xs3>
                <span class="headline"><a v-bind:href='twitter.url'>Twitter</a></span>
              </v-flex>
              <v-flex xs3>
                <span class="headline"><a v-bind:href='blog.url'>Blog</a></span>
              </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label='Sold tokens'
                    v-model='form.sold_tokens'>
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label='Token Final Price'
                    v-model='form.token_final_price'>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label='USD Raised'
                    v-model='form.usd_raised'>
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label='ETH Raised'
                    v-model='form.eth_raised'>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex><v-btn flat @click="makeCommit" color="primary">Commit changes</v-btn></v-flex>
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
export default class FinishedForm extends Vue {
  @Prop({default: {}})
  project
  form = {}
  website = {
    url: '',
    name: ''
  }
  twitter = {
    url: ''
  }
  blog = {
    url: '',
    name: ''
  }
  beforeUpdate () {
    this.website.url = (this.project.links.filter(link => link.type === 'website')[0].url)?this.project.links.filter(link => link.type === 'website')[0].url:''
    this.website.name = (this.project.links.filter(link => link.type === 'website')[0].name)?this.project.links.filter(link => link.type === 'website')[0].name:''
    this.twitter.url = (this.project.links.filter(link => link.type === 'twitter')[0].url)?this.project.links.filter(link => link.type === 'twitter')[0].url:''
    this.blog.url = (this.project.links.filter(link => link.type === 'blog')[0].url)?this.project.links.filter(link => link.type === 'blog')[0].url:''
    this.blog.name = (this.project.links.filter(link => link.type === 'blog')[0].name)?this.project.links.filter(link => link.type === 'blog')[0].name:''
  }
  makeCommit () {
    this.project.ico.phases[0].phase_status = 'Finished'
    this.project.ico.phases[0].terms.sold_tokens = this.form.sold_tokens
    this.project.ico.phases[0].prices.token_final_price[0].currency = 'ETH'
    this.project.ico.phases[0].prices.token_final_price[0].amount = (this.form.final_price)?this.form.final_price:''
    this.project.ico.phases[0].raised_funds = []
    if(this.form.usd_raised!==undefined) this.project.ico.phases[0].raised_funds.push({currency: 'USD', amount: this.form.usd_raised})
    if(this.form.eth_raised!==undefined) this.project.ico.phases[0].raised_funds.push({currency: 'ETH', amount: this.form.eth_raised})
    if(this.form.btc_raised!==undefined) this.project.ico.phases[0].raised_funds.push({currency: 'BTC', amount: this.form.btc_raised})
    this.$http.post('http://ninja-analytics.ru/pullreq', JSON.stringify(this.project))
      .then(res => console.log(res.body))
  }
}
</script>
<style>
.hide-this {
  visibility: hidden;
}
</style>