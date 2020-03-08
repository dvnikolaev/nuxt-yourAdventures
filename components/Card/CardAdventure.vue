<template>
  <v-card>
    <FullInfoAdventure
      :image="image"
      :title="title"
      :description="description"
      :id="id"
    />
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
import FullInfoAdventure from "./FullInfoAdventure";

export default {
  props: ["title", "description", "image", "id"],
  computed: {
    modifiedDescription() {
      return this.description.length > 100
        ? this.description.substr(0, 99) + "..."
        : this.description;
    }
  },
  components: {
    FullInfoAdventure
  }
};
</script>
