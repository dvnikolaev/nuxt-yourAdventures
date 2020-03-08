<template>
  <v-dialog width="500">
    <template v-slot:activator="{ on }">
      <v-btn rounded v-on="on" color="success">
        Добавить своё место
        <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card class="py-7 px-5 text-center d-flex flex-column">
      <h2>Добавить своё приключение</h2>
      <v-text-field
        outlined
        hide-details
        label="Заголовок"
        v-model="title"
        class="mt-2"
      ></v-text-field>
      <v-text-field
        outlined
        hide-details
        label="Описание"
        v-model="description"
        class="mt-2"
      ></v-text-field>
      <v-text-field
        outlined
        hide-details
        label="Ссылка на фотографию"
        v-model="image"
        class="mt-2"
      ></v-text-field>
      <v-btn :disabled="buttonIsActive" color="success" class="mt-2" @click="addAdventure">Добавить</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      image: ""
    };
  },
  computed: {
    buttonIsActive() {
      return this.title && this.description && this.image ? false : true;
    }
  },
  methods: {
    addAdventure() {
      this.$store.dispatch("addAdventure", {
        title: this.title,
        description: this.description,
        image: this.image
      });
    }
  }
};
</script>
