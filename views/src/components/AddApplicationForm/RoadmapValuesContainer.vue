<template>
  <div>
    <v-card color="grey lighten-4" flat class='mb-3'>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12>
              <RoadmapValuesForm
                @interface='changeValue'
                :firstField='firstField'
                :secondField='secondField'
                :thirdField='thirdField'
                :fourthField='fourthField'
                :fifthField='fifthField'
                :color='color'
                :buttonText='buttonText'>
              </RoadmapValuesForm>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class='grey lighten-2'>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
                  v-bind:items="status"
                  label='Status'
                  v-model='editedItem.current_status'>
                </v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Start date" v-model="editedItem.start_date"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers1"
      :items="items"
      hide-actions
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.number }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.current_status }}</td>
        <td>{{ props.item.start_date }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" type='info'>
          Nothing to display yet
        </v-alert>
      </template>
    </v-data-table>
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
import RoadmapValuesForm from './forms/RoadmapValuesForm'

@Component({
  components: {
    RoadmapValuesForm
  }
})
export default class RoadmapValuesContainer extends Vue {
  @Prop({default: () => {}})
  firstField
  @Prop({default: () => {}})
  secondField
  @Prop({default: () => {}})
  thirdField
  @Prop({default: () => {}})
  fourthField
  @Prop({default: () => {}})
  fifthField
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
  dialog = false
  status = ['Planned', 'In work', 'Completed']
  headers1 = [
    {
      text: '#',
          align: 'left',
          sortable: true,
          value: 'number'
        },
        { text: 'Name', value: 'name' },
        { text: 'Status', value: 'current_status' },
        { text: 'Start date', value: 'start_date' },
        { text: 'Actions', value: 'milestone', sortable: false }
      ]
  editedIndex = -1
  editedItem = {
    milestone: '',
    current_status: '',
    start_date: '',
    end_date: '',
    number: 0
  }
  defaultItem = {
    milestone: '',
    current_status: '',
    start_date: '',
    end_date: '',
    number: 0
  }
  selected = []
  // This method activates form to edit exsisting value in the items array
  editItem (item) {
    this.editedIndex = this.items.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }
  // This method delete value from the items array
  deleteItem (item) {
    const index = this.items.indexOf(item)
    confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
  }
  // closes item editing form and assigns an object with empty fields to the editedItem
  close () {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }, 300)
  }
  // Updates specified object in the items array or push new one and calls close() method
  save () {
    if (this.editedIndex > -1) {
      Object.assign(this.items[this.editedIndex], this.editedItem)
    } else {
      this.items.push(this.editedItem)
    }
    this.close()
  }
  // Sends data from child component to the parent component
  changeValue (data) {
    const tmp = {}
    tmp[this.firstField.key] = data.formData[this.firstField.key]
    tmp[this.secondField.key] = data.formData[this.secondField.key]
    tmp[this.thirdField.key] = data.formData[this.thirdField.key]
    tmp[this.fourthField.key] = data.formData[this.fourthField.key]
    tmp[this.fifthField.key] = data.formData[this.fifthField.key]
    this.$emit('interface', tmp)
  }
}
</script>