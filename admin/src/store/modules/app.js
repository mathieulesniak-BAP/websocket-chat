const state = {
  loading: false,
  loaded: false,
  snackbar: {
    show: false,
    content: "",
    icon: null,
    type: null
  },
  alert: {
    show: false,
    title: "",
    content: ""
  }
};

const getters = {};

const mutations = {
  SET_APP_LOADING(state, status) {
    state.loading = status;
    if (status === false) {
      state.loaded = true;
    }
  },
  SET_APP_SNACKBAR(state, payload) {
    if (payload === undefined || payload.message === "") {
      state.snackbar = {
        ...state.snackbar,
        show: false,
        content: "",
        icon: null,
        type: null
      };
    } else {
      state.snackbar = {
        ...state.snackbar,
        show: true,
        content: payload.message,
        icon: payload.icon,
        type: payload.type
      };
    }
  },
  SET_APP_ALERT(state, payload) {
    if (payload === undefined || payload.title === "") {
      state.alert = {
        ...state.alert,
        show: false,
        title: "",
        content: ""
      };
    } else {
      state.alert = {
        ...state.alert,
        show: true,
        content: payload.content,
        title: payload.title
      };
    }
  }
};

const actions = {
  setAppLoading({ commit }, status) {
    commit("SET_APP_LOADING", status);
  },
  setSnackbar({ commit }, payload) {
    commit("SET_APP_SNACKBAR", payload);
  },
  setSnackBarError({ commit }, message) {
    commit("SET_APP_SNACKBAR", { type: "error", icon: "thumb_down", message });
  },
  setAlert({ commit }, payload) {
    commit("SET_APP_ALERT", payload);
  },
  closeAlert({ commit }) {
    commit("SET_APP_ALERT");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
