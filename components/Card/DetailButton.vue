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
    <FullCard :item="item" />
  </v-dialog>
</template>

<script>
import FullCard from "./FullCard";

export default {
  props: ["item"],
  components: {
    FullCard
  }
};
</script>
