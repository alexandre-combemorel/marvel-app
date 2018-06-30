import Vue from 'vue';
import Vuex from 'vuex';
import CONST from '../config/CONST';

// declare store usage
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    errorHandling: {
      errorMessage: null,
      errorActive: false,
    },
    collectionMarvelComics: [],
    collectionMarvelCharacters: [],
  },
  mutations: {
    loadingOn(state) {
      state.isLoading = true;
    },
    loadingOff(state) {
      state.isLoading = false;
    },
    saveLastSearch(state, data) {
      if (data.type === CONST.TYPE_COMIC) {
        state.collectionMarvelComics = data.data;
      } else {
        state.collectionMarvelCharacters = data.data;
      }
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
