<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
    </template>
    <FullCard :item="item" :focusComment="true"/>
  </v-dialog>
</template>

<script>
import FullCard from "./FullCard"

export default {
  props: {
    item: Object
  },
  components: {
    FullCard
  }
}
</script>