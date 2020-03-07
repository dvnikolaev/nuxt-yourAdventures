<template>
  <v-dialog width="350">
    <template v-slot:activator="{ on: dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip, ...dialog }">
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ text }}</span>
      </v-tooltip>
    </template>
    <v-card class="py-7 px-6 text-center d-flex flex-column">
      <h2>{{ text }}</h2>
      <v-text-field
        outlined
        hide-details
        label="Логин"
        v-model="username"
        class="mt-2"
      ></v-text-field>
      <v-text-field
        outlined
        hide-details
        label="Пароль"
        type="password"
        v-model="password"
        class="mt-2"
      ></v-text-field>
      <v-btn @click="localMethod" large color="success" class="mt-3">{{
        textButton
      }}</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["text", "textButton", "icon", "method"],
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    localMethod() {
      return this.method === 'login' ? this.login : this.registration
    }
  },
  methods: {
    registration() {
      this.$store.dispatch("registration", {
        username: this.username,
        password: this.password
      });
    },
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
