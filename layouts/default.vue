<template>
  <v-app>
    <v-app-bar app dense>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="userIsAuth">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Выход</span>
      </v-tooltip>
      <div v-else>
        <v-dialog v-for="(item, i) in navIconInfo" :key="i" width="350">
          <template v-slot:activator="{ on: dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...tooltip, ...dialog }">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ item.text }}</span>
            </v-tooltip>
          </template>
          <v-card
            v-model="item.dialog"
            class="py-7 px-6 text-center d-flex flex-column"
          >
            <h2>{{ item.text }}</h2>
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
            <v-btn @click="item.method" large color="success" class="mt-3">{{
              item.textButton
            }}</v-btn>
          </v-card>
        </v-dialog>
      </div>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      navIconInfo: [
        {
          text: "Регистрация",
          textButton: "Зарегестрироваться",
          icon: "mdi-account-multiple-plus",
          method: this.registration
        },
        {
          text: "Вход",
          textButton: "Войти",
          icon: "mdi-login",
          method: this.login
        }
      ]
    };
  },
  computed: {
    userIsAuth() {
      return this.$store.state.user.username ? true : false;
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
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
