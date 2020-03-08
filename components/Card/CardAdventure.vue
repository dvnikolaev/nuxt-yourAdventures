<template>
  <v-card>
    <FullInfoAdventure :item="item" />
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <p>{{ modifiedDescription }}</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-comment</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FullInfoAdventure from "./FullInfoAdventure";

export default {
  props: ["item"],
  computed: {
    modifiedDescription() {
      return this.item.description.length > 100
        ? this.item.description.substr(0, 99) + "..."
        : this.item.description;
    }
  },
  components: {
    FullInfoAdventure
  }
};
</script>
