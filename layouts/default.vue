<template>
  <v-app>
    <v-app-bar app dense style="z-index: 10">
      <DialogAddAdventure />
      <v-spacer></v-spacer>
      <div v-if="userIsAuth">
        <a href="/">{{getUser}}</a>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="logout">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Выход</span>
        </v-tooltip>
      </div>
      <div v-else>
        <DialogAuth
          v-for="(item, i) in navIconInfo"
          :key="i"
          :text="item.text"
          :icon="item.icon"
          :textButton="item.textButton"
          :method="item.method"
        />
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
import DialogAddAdventure from "@/components/Dialogs/DialogAddAdventure";
import DialogAuth from "@/components/Dialogs/DialogAuth";

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
          method: "registration"
        },
        {
          text: "Вход",
          textButton: "Войти",
          icon: "mdi-login",
          method: "login"
        }
      ]
    };
  },
  computed: {
    userIsAuth() {
      return this.$store.state.user.username ? true : false;
    },
    getUser() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  components: {
    DialogAddAdventure,
    DialogAuth
  }
};
</script>
