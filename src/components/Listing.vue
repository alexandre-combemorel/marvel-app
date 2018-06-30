<template>
  <div class="listing">
    <tile v-for="tile in listingToDisplay" :key="tile.id" :tile="tile"></tile>
  </div>
</template>

<script>
// COMPONENTS
import Tile from '@/components/widgets/Tile';

// LIBRARIES OR UTILITIES
import API from '../services/apiMapper';
import CONST from '../config/CONST';

export default {
  name: 'Listing',
  components: {
    Tile,
  },
  watch: {
    // here we make sure to refresh the listing if the user change the path (when a new search is performed)
    $route() {
      this.search();
    },
  },
  mounted() {
    // if we load a url with arguments already present we can execute a search base on the arguments provided on load
    this.search();
  },
  computed: {
    // This property ensure that we use the right Collection according to the path
    // it could be refactore in one, but if we want to improve the app with some off line mode,
    // we can keep result of the last search and look in it before fetching from the API again
    listingToDisplay() {
      const { path } = this.$route;
      if (path.indexOf(`/${CONST.SEARCH_LISTING}/${CONST.TYPE_COMIC}`) !== -1) {
        return this.$store.state.search.collectionMarvelComics;
      }
      return this.$store.state.search.collectionMarvelCharacters;
    },
  },
  methods: {
    search() {
      // We extract from the URL the different arguments
      const { type } = this.$route.params;
      const { key } = this.$route.params;

      // Here we activate a loading state before starting an API call
      // Clean any previous error message
      this.$store.commit('loadingOn');
      this.$store.commit('clearErrorMessage');
      // According to the form we fetch the right data, comic or characters
      if (type === CONST.TYPE_COMIC) {
        this.getComics(key);
      } else {
        this.getCharacters(key);
      }
    },
    getComics(key) {
      API.getMarvelComics(key)
        .then((data) => {
          // Once we receive the API answer we disable the loading state
          this.$store.commit('loadingOff');
          // If we have any matches for the request we save in the store the last search
          if (data.count > 0) {
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_COMIC, data: data.results });
          } else {
            // Otherwise we display an error message and clean up the last search
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_COMIC, data: [] });
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_COMICS);
          }
        })
        .catch(() => {
          // if a network problem happen, I didn't manage all the use case of different error, like 404, etc
          // we disable the loading state to show the error
          this.$store.commit('loadingOff');
          this.$store.commit('setErrorMessage', CONST.ERROR_NETWORK);
        });
    },
    getCharacters(key) {
      API.getMarvelCharacters(key)
        .then((data) => {
          // Once we receive the API answer we disable the loading state
          this.$store.commit('loadingOff');
          // If we have any matches for the request we save in the store the last search
          if (data.count > 0) {
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_CHARACTER, data: data.results });
          } else {
            // Otherwise we display an error message and clean up the last search
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_CHARACTER, data: [] });
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_CHARACTERS);
          }
        })
        .catch(() => {
          // if a network problem happen, I didn't manage all the use case of different error, like 404, etc
          // we disable the loading state to show the error
          this.$store.commit('loadingOff');
          this.$store.commit('setErrorMessage', CONST.ERROR_NETWORK);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.listing {
  margin: $inset-l;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (min-width: $break-mobile) {
  }
}
</style>
