<template>
  <div class="mt-2">
    <v-layout row wrap>
      <div class="title ma-3">{{head}}</div>
    </v-layout>
    <v-layout row wrap>
      <div class='subheading  ml-3'>{{subhead}}</div>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <MultipleValuesForm
          @interface='changeValue'
          :firstField='firstField'
          :secondField='secondField'
          :color='color'
          :buttonText='buttonText'>
        </MultipleValuesForm>
      </v-flex>
      <v-flex xs12 sm8>
        <table class="mt-3">
          <tr>
            <th>
              <v-flex xs6 class='ml-2 mt-2 mb-1'>
                {{firstField.label}}
              </v-flex>
            </th>
            <th>
              <v-flex xs6 class='ml-2 mt-2 mb-1 mr-2'>
                {{secondField.label}}
              </v-flex>
            </th>
          </tr>
          <tr v-for='item in items' v-if='items.length > 0'>
            <td class="custom-table-cell">
            <v-flex xs6 class='ma-2'>
              <input
                v-if='!item.value'
                label=''
                type='text'
                value='item[firstField.key]'
                v-model='item[firstField.key]'>
              </v-flex>
            </td>
            <td class="custom-table-cell">
              <v-flex xs6 class='ma-2'>
              <input
                v-if='!item.value'
                label=''
                value='item[secondField.key]'
                v-model='item[secondField.key]'>
              </v-flex>
            </td>
          </tr>
          <tr v-if='items.length === 0'>
          <td class="custom-table-cell">
          <v-flex xs6 class='ma-2'>
            <input type="text" value="" disabled>
            </v-flex>
          </td>
          <td class="custom-table-cell">
          <v-flex xs6 class='ma-2'>
            <input type="text" value="" disabled>
            </v-flex>
          </td>
          </tr>
        </table>
        <div><i>Click on row to change data inside it</i></div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import MultipleValuesForm from './forms/MultipleValuesForm'

@Component({
  components: {
    MultipleValuesForm
  }
})
export default class AddressesFormContainer extends Vue {
  @Prop({default: () => {}})
  firstField
  @Prop({default: () => {}})
  secondField
  @Prop({default: ''})
  buttonText
  @Prop({default: ''})
  color
  @Prop({default: () => {}})
  headers
  @Prop({default: () => []})
  items
  @Prop({default: ''})
  head
  @Prop({default: ''})
  subhead
  selected = []
  expanded = false
  i = 0
  mounted () {
    console.log('items', this.items)
  }
  // This method sends data from MultipleValuesForm component to a parent component (for example, FundsFormContainer)
  changeValue (data) {
    const tmp = {}
    tmp[this.firstField.key] = data.formData[this.firstField.key]
    tmp[this.secondField.key] = data.formData[this.secondField.key]
    this.$emit('interface', tmp)
  }
}
</script>
<style>
.custom-table-cell {
  text-align: left;
  background-color: white;
  border-bottom: 1px solid #ddd;
}
tr:hover {background-color:#f5f5f5;}
th {
  background-color: white;
}
.invisible {
  color: white;
}
</style>