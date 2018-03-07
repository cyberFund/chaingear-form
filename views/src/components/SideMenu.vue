<template>
  <div>
  <v-navigation-drawer class="mt-2 elevation-0" clipped  color='grey' light>
    <v-list dense>
      <v-list-tile v-for="item in items" :key="item.title" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link v-bind:to='item.path'>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </router-link>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>
<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component({})
export default class IcoForm extends Vue {
  items = [{title: 'Add new project', icon: 'fa-edit', path: '/add_info'}, {title: 'Update a project', icon: 'fa-list', path: '/finished'}]
}
</script>
