<template>
  <div class="single-view">
    <comic v-if="comicLoaded" :comic="comic"></comic>
    <character v-if="characterLoaded" :character="character"></character>
  </div>
</template>

<script>
// COMPONENTS
import Comic from '@/components/Comic';
import Character from '@/components/Character';

// LIBRARIES OR UTILITIES
import _ from 'lodash';
import API from '../services/apiMapper';
import CONST from '../config/CONST';

export default {
  name: 'SingleView',
  components: {
    Comic,
    Character,
  },
  data() {
    // We define 2 variables that we would fill once we have the data either from the store or the API request
    return {
      comic: {},
      character: {},
    };
  },
  computed: {
    // This 2 followings properties make sure to display the right component once the data is loaded
    comicLoaded() {
      return !_.isEmpty(this.comic);
    },
    characterLoaded() {
      return !_.isEmpty(this.character);
    },
  },
  mounted() {
    // On load we check the url to now which view is required, comic or character
    if (this.$route.path.indexOf(`${CONST.SEARCH_SINGLE}/${CONST.TYPE_COMIC}`) !== -1) {
      this.loadComic();
    } else {
      this.loadCharacter();
    }
  },
  methods: {
    loadComic() {
      const id = this.$route.params.key;
      // we first try to see if the Comic was part of the last search, if yes we don't need a API request
      this.comic = _.find(this.$store.state.search.collectionMarvelComics, { id });
      // If not found we fetch the comic from the API, in case the page is access by URL for instance
      if (this.comic === undefined) this.fetchComic(id);
    },
    loadCharacter() {
      const id = this.$route.params.key;
      // we first try to see if the Character was part of the last search, if yes we don't need a API request
      this.character = _.find(this.$store.state.search.collectionMarvelCharacters, { id });
      // If not found we fetch the Character from the API, in case the page is access by URL for instance
      if (this.character === undefined) this.fetchCharacter(id);
    },
    fetchComic(id) {
      // Here we activate a loading state before starting an API call
      // Clean any previous error message
      this.$store.commit('loadingOn');
      this.$store.commit('clearErrorMessage');
      API.getMarvelComicId(id)
        .then((data) => {
          // Once we receive the API answer we disable the loading state
          this.$store.commit('loadingOff');
          // If we have any matches for the request we store it in the local variable of the component
          if (data.count > 0) {
            this.comic = data.results[0];
          } else {
            // Otherwise we display an error message like no comics were found
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_COMIC);
          }
        })
        .catch(() => {
          // Otherwise we display an error message, no distinction of HTTP error has been done
          // we disable the loading state to show the error
          this.$store.commit('setErrorMessage', CONST.ERROR_NETWORK);
          this.$store.commit('loadingOff');
        });
    },
    fetchCharacter(id) {
      // Here we activate a loading state before starting an API call
      // Clean any previous error message
      this.$store.commit('loadingOn');
      this.$store.commit('clearErrorMessage');
      API.getMarvelCharacterId(id)
        .then((data) => {
          // Once we receive the API answer we disable the loading state
          this.$store.commit('loadingOff');
          // If we have any matches for the request we store it in the local variable of the component
          if (data.count > 0) {
            this.character = data.results[0];
          } else {
            // Otherwise we display an error message like no characters were found
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_CHARACTER);
          }
        })
        .catch(() => {
          // Otherwise we display an error message, no distinction of HTTP error has been done
          // we disable the loading state to show the error
          this.$store.commit('setErrorMessage', CONST.ERROR_NETWORK);
          this.$store.commit('loadingOff');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.single-view {
  display: flex;
  justify-content: center;
}
</style>
