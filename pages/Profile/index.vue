<template>
  <v-container fluid>
    <h2>Мои записи:</h2>
    <nuxt-link to="/adventures">К записям</nuxt-link>
    <p v-if="!myAdventures.length">У вас пока нет добавленных записей</p>
    <v-row v-else>
      <v-col
        v-for="(item,i) in myAdventures"
        :key="i"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <CardAdventure :item="item" />
      </v-col>
    </v-row>
    <h2>Понравившиеся записи:</h2>
    <v-row>
      <v-col
        v-for="(item,i) in myFavoriteAdventures"
        :key="i"
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
  middleware({ redirect, req, store}) {
    if (process.server) {
      if (req.user) {
        if (store.state.user.id !== req.user._id) {
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
    },
    myFavoriteAdventures() {
      return this.$store.getters.myFavoriteAdventures;
    }
  },
  components: {
    CardAdventure
  }
};
</script>
