<template>
  <v-card max-width="600">
    <v-img :src="item.image"></v-img>
    <v-card-title class="pl-4">{{ item.title }}</v-card-title>
    <v-card-text class="pl-4">{{ item.description }}</v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn icon @click="likeAdventure(item._id)">
        <v-icon :color="adventureIsFavorite ? 'red' : 'grey'">mdi-heart</v-icon>
      </v-btn>
      <span v-if="item.countLike">{{ item.countLike }}</span>
    </v-card-actions>
    <v-divider></v-divider>
    <v-list two-liner>
      <v-list-item v-for="(comment, i) in item.comments" :key="i">
        <v-list-item-avatar>
          <v-icon large>mdi-account-tie</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-text="comment.author.username"
          ></v-list-item-title>
          <v-list-item-subtitle v-text="comment.text"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-text-field
        outlined
        dense
        hide-details
        :autofocus="focusComment"
        append-icon="mdi-send"
        v-model.trim="comment"
        @click:append="addComment"
        @keyup.enter="addComment"
        placeholder="Написать..."
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
    focusComment: Boolean
  },
  data() {
    return {
      comment: "",
      focus: true
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", {
        message: this.comment,
        id: this.item._id
      });
      this.comment = "";
    },
    likeAdventure(adventureID) {
      this.$store.dispatch("likeAdventure", { adventureID });
    }
  },
  computed: {
    adventureIsFavorite() {
      return this.$store.getters.adventureIsFavorite(this.item._id);
    }
  }
};
</script>
