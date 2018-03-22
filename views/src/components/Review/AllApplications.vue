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
            <td>
              <v-btn @click='sendApprove(props.item)'>Approve</v-btn>
            </td>
            <td>
              <v-btn @click='sendReject'>Reject</v-btn>
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
import * as config from '../../config.js'

@Component({})
export default class AllApplications extends Vue {
  // Property that holds whole list of application documents
  applications = []
  // Holds documents that will be rendered as page content
  pageContent = []
  // Number of current page. Changed by handleCurrentChange method
  page = 1
  // Total number of application documents sent by chaingear-backend API
  total = 0
  // Property that used to show/hide spinner
  loading = true
  // List of headers used in data table
  headers = [
    { text: 'Status', align: 'left', sortable: false, value: 'name' },
    { text: 'Project name', value: 'project_name'},
    { text: 'Submited', value: 'readableDate'},
    { text: 'Website', value: 'website', align: 'left'},
    { text: 'Whitepaper', value: 'whitepaper'},
    { text: 'Github', value: 'github'},
    { text: 'Approve', value: ''},
    { text: 'Reject', value: ''}
  ]
  // Sorting rule that is used to display applications
  pagination = {
    sortBy: 'timestamp'
  }
  sendApprove (item) {
    this.$http.post(config.chaingearApiUrl + '/approve-application', JSON.stringify(item))
      .then(res => console.log('approved'))
      .catch(err => console.log(err))
  }
  sendReject () {
    console.log('click')
  }
  mounted () {
    // Fetches full list of applications from chaingear-backendAPI
    this.$http.get(config.chaingearApiUrl + '/get-all-applications')
      .then(result => {
        // Function that splits array into sub-arrays of specififed length
        const chunk = (arr, len) => {
          let chunks = [],
            i = 0,
            n = arr.length
          while (i < n) {
            chunks.push(arr.slice(i, i += len))
          }
          return chunks
        }
        // Sort fetched documents array by date in ascending order, then map it to extract info that will be displayed on page
        const sorted = result.body.applications.sort((a, b) => new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf()).map(project => {
          // Checks if application document has a timestapm 
          if (project.timestamp !== undefined) {
            // Converts timestapm to the uman-readable string
            project.readableDate = dateformat(project.timestamp, 'mmmm dS, yyyy, h:MM:ss TT')
          }
          // Converts timestamp to a number of milliseconds. This will be used to sort chunks on page
          project.timestamp = new Date(project.timestamp).valueOf()
          const info = project.project_info
          // Check if application document has a links array
          if (info.blockchain.links !== undefined) {
            // Checks if application document has a  website link object
            if (info.blockchain.links.filter(link => link.type === 'website').length > 0) {
              // Extracts URL from link object
              project.website = info.blockchain.links.filter(link => link.type === 'website')[0].url
            }
            if (info.blockchain.links.filter(link => link.type === 'paper').length > 0) {
              // Extracts URL from link object
              project.paper = info.blockchain.links.filter(link => link.type === 'paper')[0].url
            } else project.paper = false // Sets link property to false to render it as disabled link
            if (info.blockchain.links.filter(link => link.type === 'github').length > 0) {
              // Extracts URL from link object
              project.git = info.blockchain.links.filter(link => link.type === 'github')[0].url
            } else project.git = false // Sets link property to false to render it as disabled link
          }
          return project
        })
        // Splits sorted array of application documents to the chunks of 10 elements
        this.applications = chunk(sorted, 10)
        // This subarray of 10 application documents will be used on initial render. Later this value can be re-assigned after clicking on next page 
        this.pageContent = this.applications[0]
        // This value will be used to compute the number of pages
        this.total = this.applications.length
        // Hides spinner after all work done
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }
  // Watched property that sets new subarray as page content
  @Watch('page')
  onPageChanged(val, oldVal) {
    this.pageContent = this.applications[val - 1]
  }
  // Method that changes number of page after clicking on page number or next page button
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