<template>
  <v-container fluid class="">
    <v-row>
      <v-col v-for="(item, i) in adventures" :key="i" cols="12" lg="3" md="4" sm="6" xs="12">
        <CardAdventure
          :title="item.title"
          :description="item.description"
          :image="item.image"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardAdventure from "@/components/Card/CardAdventure";

export default {
  computed: {
    adventures() {
      return this.$store.state.adventures;
    }
  },
  components: {
    CardAdventure
  }
};
</script>