<template>
  <v-container fluid>
    <h2>Мои записи:</h2>
    <nuxt-link to="/adventures">К записям</nuxt-link>
    <v-row>
      <v-col
        v-for="item in myAdventures"
        :key="item._id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <CardAdventure :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardAdventure from "@/components/Card/CardAdventure";

export default {
  async fetch({ store }) {
    await store.dispatch("getAdventures");
  },
  middleware({ redirect, req, params }) {
    if (process.server) {
      if (req.user) {
        if (params.id !== req.user.username) {
          return redirect("/adventures");
        }
      } else {
        return redirect("/adventures");
      }
    }
  },
  computed: {
    myAdventures() {
      return this.$store.getters.myAdventures;
    }
  },
  components: {
    CardAdventure
  }
};
</script>
