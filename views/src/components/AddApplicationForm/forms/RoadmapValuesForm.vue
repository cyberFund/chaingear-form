<template>
  <div>
    <v-card :color='color' class='mb-1 pt-0'>
      <v-container fluid>
      <v-layout row wrap>
      <v-flex xs10>
        <v-layout row wrap>
          <v-flex xs12 sm6>
          <v-text-field
              :label='secondField.label'
              :hint='secondField.hint'
              v-model='form[secondField.key]'>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
          <v-select
              v-bind:items="status"
              :label='fifthField.label'
              v-model='form[fifthField.key]'>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-text-field
              :label='thirdField.label'
              :hint='thirdField.hint'
              v-model='form[thirdField.key]'>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
          </v-flex>
        </v-layout>
        </v-flex>
        <v-flex xs1>
        
          <v-btn 
            flat 
            color='success' 
            @click="send"> <v-icon center color="green darken-2">fa-plus-circle</v-icon>
          </v-btn>
        
        </v-flex>
        </v-layout>
      </v-container>
    </v-card> 
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
  </div>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class RoadmapValuesForm extends Vue {
  @Prop({default: ''})
  color
  @Prop({default: {}})
  firstField
  @Prop({default: {}})
  secondField
  @Prop({default: {}})
  thirdField
  @Prop({default: () => {}})
  fourthField
  @Prop({default: {}})
  fifthField
  @Prop({default: ''})
  buttonText
  form = {}
  // This property is used in select input
  status = ['Planned', 'In work', 'Completed']
  // This properties is used in alert dialog which tell users that some of entered values is invalid
  notEnough = false
  errorMessage = ''
  // This properties define validation rules
  rules = {
    required: (value) => !!value || 'Required',
    isNum: (value) => {
      if (value == null) return true
      return !isNaN(value - parseFloat(value)) || 'Should be a number!'
    }
  }
  // This method checks is entered data valid and if true, calls parent method to save data
  send () {
    if (this.form[this.secondField.key] === undefined || this.form[this.fifthField.key] === undefined || this.form[this.thirdField.key] === undefined) {
      this.notEnough = true
      this.errorMessage = 'Please, fill all fields'
    } else {
      this.$emit('interface', {formData: this.form})
      this.form = {}
    }
  }
}
</script>