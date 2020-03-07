export const state = () => ({
  user: {
    username: "",
    adventures: [],
    favoriteAdventures: []
  }
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload.user;
  },
  SET_ERROR_LOGIN(state, error) {
    console.log("SET_ERROR_LOGIN");
  },
  SET_ERROR_REGISTER(state, error) {
    console.log("SET_ERROR_REGISTER");
  },
  CHANGE_DIALOG_SUCCESSFUL_REGISTRATION(state) {
    console.log("CHANGE_DIALOG_SUCCESSFUL_REGISTRATION");
  }
};

export const actions = {
  async getInfo({commit}) {
    let response = await this.$axios.$get("/getInfo");
    commit("SET_USER", response);
  },
  // Регистрация пользователя
  async registration({ commit }, data) {
    try {
      let error = await this.$axios.$post("/registration", {
        username: data.username,
        password: data.password
      });
      error
        ? commit("SET_ERROR_REGISTER", error)
        : commit("CHANGE_DIALOG_SUCCESSFUL_REGISTRATION");
    } catch {
      commit(
        "SET_ERROR_REGISTER",
        "Не удалось зарегистрироваться, попробуйте позже!"
      );
    }
  },
  async login({ commit }, data) {
    try {
      let response = await this.$axios.$post("/login", {
        username: data.username,
        password: data.password
      });
      commit("SET_USER", response);
      commit("SET_ERROR_LOGIN", '');
    } catch {
      commit("SET_ERROR_LOGIN", 'Неверный пользователь или пароль');
    }
  },
  async logout({commit}) {
    let response = await this.$axios.$post("/logout");
    commit("SET_USER", response);
  },
  async addAdventure({commit}, data) {
    
  }
};
