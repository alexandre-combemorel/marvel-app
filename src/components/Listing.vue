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
  data() {
    return {
      tileCollection: null,
    };
  },
  watch: {
    $route() {
      this.search();
    },
  },
  computed: {
    listingToDisplay() {
      const { path } = this.$route;
      if (path.indexOf(`/${CONST.SEARCH_LISTING}/${CONST.TYPE_COMIC}`) > -1) {
        return this.$store.state.collectionMarvelComics;
      }
      return this.$store.state.collectionMarvelCharacters;
    },
  },
  methods: {
    search() {
      const { search } = this.$route.params;
      const { type } = this.$route.params;
      const { key } = this.$route.params;

      if (search === CONST.SEARCH_LISTING) {
        if (type === CONST.TYPE_COMIC) {
          this.$store.commit('loadingOn');
          this.$store.commit('clearErrorMessage');
          API.getMarvelComics(key)
            .then((data) => {
              this.$store.commit('loadingOff');
              if (data.count > 0) {
                this.$store.commit('saveLastSearch', { type: CONST.TYPE_COMIC, data: data.results });
              } else {
                this.$store.commit('setErrorMessage', 'No marvel comics found');
              }
            })
            .catch(() => {
              this.$store.commit('loadingOff');
              this.$store.commit('setErrorMessage', 'Server not responding');
            });
        }
      }
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
