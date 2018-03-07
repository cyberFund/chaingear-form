<template>
  <v-card-media
    height='100px'
    v-bind:src="bgImageSrc">
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <div class="headline">{{cardHeadline}}</div>
          <div class="caption mt-3 ml-2">* - required</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-media>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class FormPageHeader extends Vue {
  @Prop({default: ''})
  bgImageSrc
  @Prop({default: ''})
  cardHeadline
}
</script>
