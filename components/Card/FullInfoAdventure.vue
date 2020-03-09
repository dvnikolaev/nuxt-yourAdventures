<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on: dialog }">
      <v-hover>
        <template v-slot:default="{ hover }">
          <div style="position: relative">
            <v-img height="250" :src="item.image"></v-img>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <v-btn v-on="{ ...dialog }">Подробнее</v-btn>
              </v-overlay>
            </v-fade-transition>
          </div>
        </template>
      </v-hover>
    </template>
    <v-card max-width="600">
      <v-img :src="item.image"></v-img>
      <v-card-title class="pl-4">{{ item.title }}</v-card-title>
      <v-card-text class="pl-4">{{ item.description }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text v-for="(comment, i) in item.comments" :key="i" class="pb-0">
        <span class="title text--black">{{ comment.author.username }}</span>
        <p>{{ comment.text }}</p>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          outlined
          dense
          hide-details
          append-icon="mdi-send"
          v-model.trim="comment"
          @click:append="addComment"
          @keyup.enter="addComment"
          placeholder="Написать..."
        ></v-text-field>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", {
        message: this.comment,
        id: this.item._id
      });
      this.comment = '';
    }
  }
};
</script>
