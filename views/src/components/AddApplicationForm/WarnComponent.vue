<template>
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
        <v-btn color="primary" flat="flat" @click='okClick'>Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class WarnComponent extends Vue {
  @Prop({default: false})
  notEnough
  @Prop({default: ''})
  errorMessage
  // Calls parent method to hide himself. Use vuex to avoid such monkey practices
  okClick () {
    this.$emit('interface', {ok: true})
  }
}
</script>
