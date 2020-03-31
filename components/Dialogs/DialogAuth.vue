<template>
  <v-dialog width="350" v-model="dialogAuth">
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
      <p v-if="errText" class="mb-0 mt-1 text-left red--text">{{errText}}</p>
      <v-btn
        @click="localMethod"
        :disabled="fieldsIsEmpty"
        large
        color="success"
        class="mt-3"
        >{{ textButton }}</v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["text", "textButton", "icon", "method"],
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    localMethod() {
      return this.method === "login" ? this.login : this.registration;
    },
    fieldsIsEmpty() {
      return this.username && this.password ? false : true;
    },
    errText() {
      return this.$store.state.errorLoginSignup;
    },
    dialogAuth: {
      get() {
        return this.$store.state.dialogAuth;
      },
      set() {
        this.$store.commit('CLOSE_DIALOG_AUTH');
      }
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
