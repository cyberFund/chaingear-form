<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs8>
      <v-card color='grey lighten-3'>
      <v-card-text>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex xs8>
              <div>
                <h3 class="display-3">Welcome to Chaingear!</h3>
                <span class="subheading">
                  <p>
                    Verified and machine readable blockchain metadata
                  </p>
                  <p> 
                    Trying to solve the problem of cryptocurrencies and cryptoassets metadata, Chaingear accumulates dependencies, specs, logos, links and other sensitive metadata.
                  </p>
                </span>
                <v-divider class="my-3"></v-divider>
                <div class="title mb-3">What benefits of adding to Chaingear?</div>
                  <ul class='ml-3'>
                  <li>
                    Make your system understandable for people. All meaningful information about system you develop should be gathered in one place in order to gain more adaption.
                  </li>
                  <li>
                    Make your system accessible for other developers. It will make significantly easier to deal with your token for any wallet, exchange, bridge and any web app which want to work with your cryptocurrency or cryptoasset.
                  </li>
                  <li>
                    Your system is listed in cyber•Fund's Radar or Rating for free. We are continuously working on attraction of investors to blockchain based projects.
                  </li>
                  </ul>
                 <v-divider class="my-3"></v-divider>
                  <div class="title mb-3">Requirements</div> 
                    <p>Before being listed on cyber.fund/radar, each application is carefully handled by our team.</p>
                    <p>We check each application against six formal criteria. They are the availability of:</p>
                    <ol class='ml-3'>
                      <li>A project name</li>
                      <li>A headline</li>
                      <li>A logo</li>
                      <li>A website</li>
                      <li>A whitepaper where we could find among other exciting stuff <b>a description of the project's technical implementation</b> OR <b>a proof-of-concept code on your project's Github</b></li>
                      <li>The intention to issue a token</li>
                    </ol>
                    <p>In order to get listed, your project should comply with each of the six criteria.</p>
                    <p>We aim to review each new application as soon as possible, but the times may differ depending on the incoming flow of applications. As soon as we take a decision, we will let you know by email, so make sure you provide a valid e-mail address later on in this form.</p>
              </div>
               <v-btn large color="success" class="mt-3" @click='addInfoRedirect'>Add project</v-btn>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
             
            </v-layout>
          </v-container>
        
        </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!--<v-card color="grey lighten-4" flat>
      <v-card-media
        height='100px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Welcome to Chaingear!</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <span class="subheading">Verified and machine readable blockchain metadata. If you are blockchain developer you can easily enrich metadata of system you are building.

            Trying to solve the problem of cryptocurrencies and cryptoassets metadata, this repository accumulate dependencies, specs, logos, links and other sensitive metadata.

            Rationale behind Chaingear you can find in a paper: cyber•Rating: Cryptoproperty Evaluation.</span>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>-->
   
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class StartInfoPage extends Vue {
  addInfoRedirect () {
    this.$router.push('/add_info')
  }
}
</script>