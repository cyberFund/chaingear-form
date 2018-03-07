<template>
  <div>
    <v-layout row wrap justify-center align-center>
      <v-progress-circular v-show='loading' indeterminate color="green"></v-progress-circular>
    </v-layout>
    <v-layout row wrap v-show='!loading'>
      <v-flex xs12>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class='indigo lighten-5'>
              <span class="headline">{{ editedItem.project_name }}</span>
            </v-card-title>
            <v-card-text class='grey lighten-4'>
              <div class="indigo" width='100%' height='1px'></div>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-bind:items="asset_types"
                      label="Asset type"
                      v-model='editedItem.project_info.blockchain.asset_type'
                      max-height='auto'
                      item-text="label"
                      item-value="value"></v-select>
                  </v-flex>
                  <EditApplicationPage 
                    :project='editedItem'
                    @interface='updateEdited'>
                  </EditApplicationPage>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions class='grey lighten-4'>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-data-table
      :headers="headers"
      :items="pageContent"
      hide-actions
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
      <tr>
        <th
          v-for="header in props.headers"
          :key="header.text"
          class="text-xs-left"
        >
          {{ header.text }}
        </th>
      </tr>
    </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.project_name }}</td>
        <td>
          <a class="buttoned" v-bind:href='props.item.website'>
            
              Site
          </a>
        </td>
        <td>
          <a class="buttoned" v-bind:href='props.item.paper'>
            <!--<v-btn class='ml-0 pl-0' :disabled='props.item.paper === false' flat>
              <v-icon left>fa-file</v-icon>-->
              Paper
            
          </a>
        </td>
        <td>
          <a class="buttoned" v-bind:href='props.item.git'>Github</a></td>
        <td class="justify-center layout px-0">
          <v-btn flat @click="editItem(props.item)"><v-icon color='green lighten-1'>fa-edit</v-icon></v-btn>
        </td>
        <td>
          <div>
              <v-tooltip right>
                <v-btn flat icon @click='moveToApproved(props.item)' slot='activator'><v-icon color="success" medium>fa-check-circle</v-icon></v-btn>
                <span>Submit</span>
              </v-tooltip>
              <v-tooltip right>
                <v-btn flat icon @click='moveToRejected(props.item)' slot='activator'><v-icon color='error' medium>fa-ban</v-icon></v-btn>
                <span>Reject</span>
              </v-tooltip>
        </div>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
        <div class="text-xs-center">
          <v-pagination v-if='total > 1' :length="total" v-model="page" circle></v-pagination>
        </div>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="timeout"
      :top="'top'"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import EditApplicationPage from './EditApplicationPage'

@Component({
  components: {
    EditApplicationPage
  }
})
export default class AllApplications extends Vue {
  applications = []
  pageContent = []
  page = 0
  total = 0
  loading = true
  dialog = false
  asset_types = [
    {label: 'Blockchain app', value: 'blockchain app'},
    {label: 'Blockchain protocol', value: 'blockchain protocol'}
  ]
  formTitle = 'All applications'
  headers = [
    { text: 'Status', align: 'left', sortable: false, value: 'name' },
    { text: 'Project name', value: 'project_name'},
    { text: 'Website', value: 'website', align: 'left'},
    { text: 'Whitepaper', value: 'whitepaper'},
    { text: 'Github', value: 'github'},
    { text: 'Edit', value: 'project_name'},
    { text: 'Actions', value: 'actions'}
  ]
  colors = ['green lighten-4', 'lime lighten-4', 'amber lighten-4', 'blue-grey lighten-4', 'deep-purple lighten-4',
    'pink lighten-4', 'purple lighten-3']
  editedIndex = -1
  editedItem = {
    project_info: {
      blockchain: {
        asset_type: ''
      },
      app: {},
      ico: {},
      token: {}
    }
  }
  defaultItem = {
    project_info: {
      blockchain: {
        asset_type: ''
      },
      app: {},
      ico: {},
      token: {}
    }
  }
  snackbar = false
  snackbarText = ''
  timeout = 10000
  moveToRejected (data) {
    try {
      const i = this.pageContent.indexOf(data)
      this.pageContent.splice(i, 1)
    } catch (e) {
      console.log(e)
    }
    delete data.git
    delete data.paper
    delete data.website
    this.$http.post('http://ninja-analytics.ru:8000/reject-application', JSON.stringify(data))
      .then(res => {
        this.snackbar = true
        this.snackbarText = 'Application successfully rejected'
      })
  }
  moveToApproved (data) {
    try {
      const i = this.pageContent.indexOf(data)
      this.pageContent.splice(i, 1)
    } catch (e) {
      console.log(e)
    }
    delete data.git
    delete data.paper
    delete data.website
    this.$http.post('http://ninja-analytics.ru:8000/approve-application', JSON.stringify(data))
      .then(res => {
        this.snackbar = true
        this.snackbarText = 'Application successfully approved'
      })
  }
  editItem (item) {
    this.editedIndex = this.pageContent.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }
  updateEdited (data) {
    this.save(data)
  }
  close () {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }, 400)
  }
  save (data) {
    if (data !== undefined) {
      if (this.editedIndex > -1) {
        Object.assign(this.pageContent[this.editedIndex], data)
      } else {
        this.pageContent.push(data)
      }
      this.$http.post('http://ninja-analytics.ru:8000/update-application', JSON.stringify(data))
        .then(res => {
          this.snackbar = true
          this.snackbarText = 'Application successfully updated in db'
          return
        }).catch(error => {
          this.snackbar = true
          this.snackbarText = 'An error occured while updating application'
        })
      this.close()
    } else {
      if (this.editedIndex > -1) {
        Object.assign(this.pageContent[this.editedIndex], this.editedItem)
      } else {
        this.pageContent.push(this.editedItem)
      }
      this.close()
    }
    
  }
  mounted () {
    this.$http.get('http://ninja-analytics.ru:8000/get-all-applications')
      .then(result => {
        const chunk = (arr, len) => {
          let chunks = [],
            i = 0,
            n = arr.length
          while (i < n) {
            chunks.push(arr.slice(i, i += len))
          }
          return chunks
        }
        result = result.filter(proj => proj.project_info !== undefined)
        const sorted = result.body.applications.reverse()
        this.applications = chunk(sorted, 10)
        this.pageContent = this.applications[0]
        this.pageContent = this.pageContent.map(project => {
          const info = project.project_info
          if (info.blockchain.links !== undefined) {
            project.website = info.blockchain.links.filter(link => link.type === 'website')[0].url
            if (info.blockchain.links.filter(link => link.type === 'paper').length > 0) {
              project.paper = info.blockchain.links.filter(link => link.type === 'paper')[0].url
            } else project.paper = false
            if (info.blockchain.links.filter(link => link.type === 'github').length > 0) {
              project.git = info.blockchain.links.filter(link => link.type === 'github')[0].url
            } else project.git = false
          }
          return project
        })
        this.total = this.applications.length
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleCurrentChange (e) {
    this.projects = this.allProjects[e-1]
    this.page = e-1
  }
}
</script>
<style>
.buttoned {
  text-decoration: none;
}
</style>