<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on }">
      <span v-if="countComments">{{ countComments }}</span>
      <v-btn icon v-on="on">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
    </template>
    <FullCard :item="item" :focusComment="true" />
  </v-dialog>
</template>

<script>
import FullCard from "./FullCard";

export default {
  props: {
    item: Object
  },
  computed: {
    countComments() {
      return this.$store.getters.countComments(this.item._id);
    }
  },
  components: {
    FullCard
  }
};
</script>
