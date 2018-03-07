<template>
  <div>
    <v-card color="grey lighten-4" flat>
      <v-card-media
        height='50px'
        src="/dist/static/doc-images/cards/docks2.png">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Roadmap</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-text>
        <v-container fluid>
          <RoadmapValuesContainer
            @interface='addMilestone'
            :firstField='firstField'
            :secondField='secondField'
            :thirdField='thirdField'
            :fourthField='fourthField'
            :fifthField='fifthField'
            :color='color'
            :head='head'
            :buttonText='buttonText'
            :headers='headers'
            :items='milestones'>
          </RoadmapValuesContainer>
        </v-container>
        <v-layout row wrap>
          <v-btn color="default" @click="prev">Previous</v-btn>
          <v-btn color="primary" @click="next">Continue</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import RoadmapValuesContainer from './RoadmapValuesContainer'

@Component({
  components: {
    RoadmapValuesContainer
  }
})
export default class RoadmapFormContainer extends Vue {
  firstField = {
    key: 'number',
    hint: '',
    type: 'str',
    label: 'Milestone number'
  }
  secondField = {
    key: 'name',
    hint: '',
    type: 'str',
    label: 'Milestone'
  }
  thirdField = {
    key: 'start_date',
    hint: 'Date format: 2017-11-22T00:00:00 or "2018 Q4"',
    type: 'str',
    label: 'Start date'
  }
  fourthField = {
    key: 'end_date',
    hint: 'Date format: 2017-11-22T00:00:00 or "2018 Q4"',
    type: 'str',
    label: 'End date'
  }
  fifthField = {
    key: 'current_status',
    hint: 'Planned, In work, Completed',
    type: 'str',
    label: 'Current status'
  }
  buttonText = 'Add milestone'
  color = 'grey lighten-3'
  headers = [
    {
      text: 'Name',
      value: 'name'
    },
    {
      text: 'Start date',
      value: 'start_date'
    },
    {
      text: 'End date',
      value: 'end_date'
    },
    {
      text: 'Status',
      value: 'current_status'
    }
  ]
  head = ''
  disabled = true
  milestones = []
  i = 0
  // Checks if passed value has numeric type
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  // Pushes data from RoadmapValuesContainer to the milestones array
  addMilestone (data) {
    if (this.milestones.length === 0) {
      data.number = 1
    } 
    else data.number = this.milestones.length + 1
    this.milestones.push(data)
    this.disabled = false
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  next () {
    this.$store.commit('addMilestones', this.milestones)
    this.$emit('interface', {form: 'roadmap'})
  }
}
</script>
<style>
tr {
  background-color: #E0E0E0;
}
</style>