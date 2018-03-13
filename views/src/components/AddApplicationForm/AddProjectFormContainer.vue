<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex xs12 md8>
          <v-stepper v-model="page">
            <v-stepper-content step="1">
              <BlockchainForm  @interface='nextPane'></BlockchainForm>
            </v-stepper-content>
            <v-stepper-content step="2">
              <PhasesFormContainer @interface='nextPane'></PhasesFormContainer>
            </v-stepper-content>
            <v-stepper-content step="3">
              <IcoForm @interface='nextPane'></IcoForm>
            </v-stepper-content>
            <v-stepper-content step="4">
              <TokenFormContainer @interface='nextPane'></TokenFormContainer>
            </v-stepper-content>
            <v-stepper-content step="5">
              <AppFormContainer @interface='nextPane'></AppFormContainer>
            </v-stepper-content>
            <v-stepper-content step="6">
              <RoadmapFormContainer @interface='nextPane'></RoadmapFormContainer>
            </v-stepper-content>
            <v-stepper-content step="7">
              <LinksForm @interface='nextPane'></LinksForm>
            </v-stepper-content>
            <v-stepper-content step="8">
              <SubmitForm @interface='nextPane'></SubmitForm>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
// List of compoenets that holds parts of the form
import BlockchainForm from './forms/BlockchainForm'
import IcoForm from './forms/IcoForm'
import PhasesFormContainer from './CrowdsalePhasesPage/PhasesFormContainer'
import TokenFormContainer from './TokenFormContainer'
import AppFormContainer from './AppFormContainer'
import LinksForm from './forms/LinksForm'
import SubmitForm from './forms/SubmitForm'
import FundsFormContainer from './FundsFormContainer'
import RoadmapFormContainer from './RoadmapFormContainer'

@Component({
  components: {
    BlockchainForm,
    IcoForm,
    PhasesFormContainer,
    TokenFormContainer,
    AppFormContainer,
    RoadmapFormContainer,
    LinksForm,
    SubmitForm
  }
})
export default class AddProjectFormContainer extends Vue {
  page = 1
  get isIco () {
    return this.$store.getters.getIsIco
  }
  // This method changes page property which determines what form page is displayed
  nextPane (e) {
    // This branch activates after clickcing on previous button
    if (e.action === 'previous') {
      // Checks if there's a need to render form pages that is related to crowdsale (IcoForm, PhasesFormContainer)
      if (this.page === 4 && this.isIco === false) {
        this.page = 1
      } else {
        this.page -= 1
      }
    } else {
      // Checks if there's a need to render form pages that is related to crowdsale (IcoForm, PhasesFormContainer)
      if (e.form === 'blockchain' && this.isIco === false) {
        this.page = 4
      } else {
        this.page += 1
      }
    }
  }
}
</script>
