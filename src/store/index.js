import Vue from 'vue';
import Vuex from 'vuex';

// declare store usage
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    errorHandling: {
      errorMessage: null,
      errorActive: false,
    },
    collectionMarvel: [],
  },
  mutations: {
    loading(state) {
      state.isLoading = !state.isLoading;
    },
    saveLastSearch(state, data) {
      state.collectionMarvel = data;
    },
    setErrorMessage(state, message) {
      state.errorHandling.errorMessage = message;
      state.errorHandling.errorActive = true;
    },
    clearErrorMessage(state) {
      state.errorHandling.errorMessage = null;
      state.errorHandling.errorActive = false;
    },
  },
});

export default store;
