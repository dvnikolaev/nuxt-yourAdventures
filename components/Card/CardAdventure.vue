<template>
  <v-card>
    <v-img height="250" :src="image"></v-img>
    <v-card-title>{{ title }}</v-card-title>
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
export default {
  props: ["title", "description", "image"],
  computed: {
    modifiedDescription() {
      return this.description.length > 100
        ? this.description.substr(0, 99) + "..."
        : this.description;
    }
  }
};
</script>
