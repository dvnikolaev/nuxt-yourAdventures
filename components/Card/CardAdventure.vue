<template>
  <v-card>
    <DetailButton :item="item" />
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <p>{{ modifiedDescription }}</p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="likeAdventure(item._id)">
        <v-icon :color="adventureIsFavorite ? 'red' : '#757575'">mdi-heart</v-icon>
      </v-btn>
      <span v-if="item.countLike">{{ item.countLike }}</span>
      <CommentButton :item="item"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import DetailButton from "./DetailButton";
import CommentButton from "./CommentButton";

export default {
  props: ["item"],
  computed: {
    modifiedDescription() {
      return this.item.description.length > 100
        ? this.item.description.substr(0, 99) + "..."
        : this.item.description;
    },
    adventureIsFavorite() {
      return this.$store.getters.adventureIsFavorite(this.item._id);
    }
  },
  methods: {
    likeAdventure(adventureID) {
      this.$store.dispatch("likeAdventure", { adventureID });
    }
  },
  components: {
    DetailButton,
    CommentButton
  }
};
</script>
