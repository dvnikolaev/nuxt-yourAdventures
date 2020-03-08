<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on: dialog }">
      <v-hover>
        <template v-slot:default="{ hover }">
          <div style="position: relative">
            <v-img height="250" :src="image"></v-img>
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
      <v-img :src="image"></v-img>
      <v-card-title>{{title}}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <span class="title">test</span>
        <p>Всё класс</p>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-text-field outlined dense hide-details append-icon="mdi-send" placeholder="Написать..."></v-text-field>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["image","title", "description"]
};
</script>
