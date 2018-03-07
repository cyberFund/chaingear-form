<template>
  <div>
    <v-layout row wrap justify-center align-center>
      <v-progress-circular v-show='loading' indeterminate color="green"></v-progress-circular>
    </v-layout>
    <v-layout row wrap v-show='!loading'>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="pageContent"
          hide-actions
          :total-items='pageContent.length'
          :pagination.sync="pagination"
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
            <td>{{ props.item.application_status }}</td>
            <td>{{ props.item.project_name }}</td>
            <td>{{ props.item.readableDate }}</td>
            <td>
              <a class="buttoned" v-bind:href='props.item.website'>
                  Site
              </a>
            </td>
            <td>
              <a class="buttoned" v-bind:href='props.item.paper'>
                  Paper
                
              </a>
            </td>
            <td>
              <a class="buttoned" v-bind:href='props.item.git'>Github</a>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center">
          <v-pagination @click='handleCurrentChange' v-if='total > 1' :length="total" v-model="page" circle></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import dateformat from 'dateformat'

@Component({})
export default class AllApplications extends Vue {
  applications = []
  pageContent = []
  page = 1
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
    { text: 'Submited', value: 'readableDate'},
    { text: 'Website', value: 'website', align: 'left'},
    { text: 'Whitepaper', value: 'whitepaper'},
    { text: 'Github', value: 'github'}
  ]
  pagination = {
    sortBy: 'timestamp'
  }
  // Make an call to the Chaingear API, sort received data, splits it into into subarrays of 10 elements and assigns first subarray to the pageContent property
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
        const sorted = result.body.applications.sort((a, b) => new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()).filter(project => project.project_info !== undefined).map(project => {
          if (project.timestamp !== undefined) {
            project.readableDate = dateformat(project.timestamp, 'mmmm dS, yyyy, h:MM:ss TT')
          }
          project.timestamp = new Date(project.timestamp).valueOf()
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
        this.applications = chunk(sorted, 10)
        this.pageContent = this.applications[0]
        this.total = this.applications.length
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }
  @Watch('page')
  onPageChanged(val, oldVal) {
    this.pageContent = this.applications[val - 1]
    console.log('hi')
  }
  handleCurrentChange (e) {
    this.pageContent = this.applications[e-1]
    this.page = e-1
  }
}
</script>
<style>
.buttoned {
  text-decoration: none;
}
td {
  background-color: white;
}
</style>