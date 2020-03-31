export const state = () => ({
  user: {
    username: "",
    adventures: [],
    favoriteAdventures: []
  },
  dialogAuth: false,
  errorLoginSignup: "",
  adventures: []
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_ADVENTURES(state, payload) {
    state.adventures = payload;
  },
  SET_ERROR_LOGIN_SIGNUP(state, error) {
    state.errorLoginSignup = error;
  },
  CLOSE_DIALOG_AUTH(state) {
    state.dialogAuth = false;
    state.errorLoginSignup = "";
  },
  CHANGE_DIALOG_SUCCESSFUL_REGISTRATION(state) {
    console.log("CHANGE_DIALOG_SUCCESSFUL_REGISTRATION");
  },
  SOCKET_newAdventure(state, newAdventure) {
    state.adventures.push(newAdventure);
  },
  SOCKET_newComment(state, payload) {
    let index = state.adventures.findIndex(item => item._id === payload.id);
    state.adventures[index].comments.push(payload.comment);
  },
  SOCKET_likeAdventure(state, payload) {
    let index = state.adventures.findIndex(item => item._id === payload);
    state.adventures[index].countLike++;
    state.user.favoriteAdventures.push(payload);
  },
  SOCKET_dislikeAdventure(state, payload) {
    let index = state.adventures.findIndex(item => item._id === payload);
    let indexUser = state.user.favoriteAdventures.findIndex(
      item => item === payload
    );
    state.adventures[index].countLike--;
    state.user.favoriteAdventures.splice(indexUser, 1);
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.user) {
      let user = {
        id: req.user._id,
        username: req.user.username,
        adventures: req.user.adventures,
        favoriteAdventures: req.user.favoriteAdventures
      };
      commit("SET_USER", user);
    }
  },
  // Получаем записи
  async getAdventures({ commit }) {
    let adventures = await this.$axios.$get("/getadventures");
    commit("SET_ADVENTURES", adventures);
  },
  // Регистрация пользователя
  async registration({ commit }, data) {
    try {
      await this.$axios.$post("/registration", {
        username: data.username,
        password: data.password
      });
    } catch (err) {
      err.request.status == 401
        ? commit("SET_ERROR_LOGIN_SIGNUP", "Такой пользователь уже существует")
        : commit("SET_ERROR_LOGIN_SIGNUP","Не удалось зарегистрироваться, попробуйте позже!");
    }
  },
  // Вход в систему
  async login({ commit }, data) {
    try {
      let response = await this.$axios.$post("/login", {
        username: data.username,
        password: data.password
      });
      commit("SET_USER", response.user);
      commit("SET_ERROR_LOGIN_SIGNUP", "");
    } catch (err) {
      err.request.status == 401
        ? commit("SET_ERROR_LOGIN_SIGNUP", "Неверный пользователь или пароль")
        : commit(
            "SET_ERROR_LOGIN_SIGNUP",
            "Неудалось войти в систему, попробуйте позже"
          );
    }
  },
  // Выход из системы
  async logout({ commit }) {
    let response = await this.$axios.$post("/logout");
    commit("SET_USER", response.user);
  },
  // Добавление записи
  async addAdventure({ commit }, data) {
    this.$axios.$post("/adventure", {
      title: data.title,
      description: data.description,
      image: data.image
    });
  },
  // Добавление коментария
  addComment({ commit }, data) {
    this.$axios.$post("/comment", {
      message: data.message,
      id: data.id
    });
  },
  // Лайк / Дизлайк записи
  likeAdventure({ commit }, data) {
    this.$axios.$post("/likeAdventure", {
      adventureID: data.adventureID
    });
  }
};

export const getters = {
  adventureIsFavorite: state => id => {
    return state.user.favoriteAdventures.find(item => item === id)
      ? true
      : false;
  },
  countComments: state => id => {
    return state.adventures.find(item => item._id === id).comments.length;
  },
  myAdventures: state => {
    return state.adventures.filter(item => {
      return item.author.id == state.user.id;
    });
  },
  myFavoriteAdventures: state => {
    return state.adventures.filter(adventure => {
      return state.user.favoriteAdventures.find(item => adventure._id === item);
    });
  }
};
