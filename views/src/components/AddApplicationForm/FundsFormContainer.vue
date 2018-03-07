<template>
  <div>
    <MultipleValuesContainer
      @interface='addDistr'
      :firstField='firstField'
      :secondField='secondField'
      :color='color'
      :head='head1'
      :subhead='subhead1'
      :buttonText='buttonText'
      :headers='headers'
      :items='distr'>
    </MultipleValuesContainer>
    <MultipleValuesContainer
      @interface='addProceeds'
      :firstField='firstField'
      :secondField='secondField'
      :color='color'
      :head='head'
      :buttonText='buttonText'
      :headers='headers'
      :items='proceeds'>
    </MultipleValuesContainer>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import MultipleValuesContainer from './MultipleValuesContainer'

@Component({
  components: {
    MultipleValuesContainer
  }
})
export default class FundsFormContainer extends Vue {
  get proceeds () {
    return this.$store.getters.getProceeds
  }
  get distr () {
    return this.$store.getters.getTokenDistribution
  }
  secondField = {
    key: 'description',
    hint: '',
    type: 'str',
    label: 'Description'
  }
  firstField = {
    key: 'percent',
    hint: '',
    type: 'num',
    label: 'Percent'
  }
  buttonText = 'Add share'
  color = 'grey lighten-3'
  headers = [
    {
      text: 'Description',
      value: 'description'
    },
    {
      text: 'Percent',
      value: 'percent'
    }
  ]
  head = 'Use of proceeds'
  head1 = 'Token distribution'
  subhead1 = 'Categories of tokens holders'
  head2 = 'Bonuses'
  selected = []
  i = 0
  // Checks if passed value has numeric type
  isNumeric (value) {
    return !isNaN(value - parseFloat(value))
  }
  // Pushes data emitted from a child component to the this.proceeds array. Data from this array passed as a prop to a MultipleValuesContainer and displayed in corresponding data table
  addProceeds (data) {
    this.proceeds.push(data)
    this.$emit('interface', {key: 'proceeds', value: data})
  }
  // Pushes data emitted from a child component to the this.proceeds array. Data from this array passed as a prop to a MultipleValuesContainer and displayed in corresponding data table
  addDistr (data) {
    this.distr.push(data)
    this.$emit('interface', {key: 'distr', value: data})
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  prev () {
    this.$emit('interface', {action: 'previous'})
  }
  // This method calls nextPane method, defined in the parent component to change currently displayed page
  next () {
    this.$emit('interface', {proceeds: this.proceeds, distr: this.distr, bonuses: this.bonuses})
  }
}
</script>
<style>
