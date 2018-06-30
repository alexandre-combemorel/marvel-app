<template>
  <div class="listing">
    <tile v-for="tile in listingToDisplay" :key="tile.id" :tile="tile"></tile>
  </div>
</template>

<script>
import Tile from '@/components/widgets/Tile';
import API from '../services/apiMapper';
import CONST from '../config/CONST';

export default {
  name: 'Listing',
  components: {
    Tile,
  },
  watch: {
    $route() {
      this.search();
    },
  },
  mounted() {
    this.search();
  },
  computed: {
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
      const { search } = this.$route.params;
      const { type } = this.$route.params;
      const { key } = this.$route.params;

      if (search === CONST.SEARCH_LISTING) {
        this.$store.commit('loadingOn');
        this.$store.commit('clearErrorMessage');
        if (type === CONST.TYPE_COMIC) {
          this.getComics(key);
        } else {
          this.getCharacters(key);
        }
      }
    },
    getComics(key) {
      API.getMarvelComics(key)
        .then((data) => {
          this.$store.commit('loadingOff');
          if (data.count > 0) {
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_COMIC, data: data.results });
          } else {
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_COMIC, data: [] });
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_COMICS);
          }
        })
        .catch(() => {
          this.$store.commit('loadingOff');
          this.$store.commit('setErrorMessage', CONST.ERROR_NETWORK);
        });
    },
    getCharacters(key) {
      API.getMarvelCharacters(key)
        .then((data) => {
          this.$store.commit('loadingOff');
          if (data.count > 0) {
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_CHARACTER, data: data.results });
          } else {
            this.$store.commit('saveLastSearch', { type: CONST.TYPE_CHARACTER, data: [] });
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_CHARACTERS);
          }
        })
        .catch(() => {
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
