<template>
  <div class="listing">
    <tile v-for="tile in $store.state.collectionMarvel" :key="tile.id" :tile="tile"></tile>
  </div>
</template>

<script>
import Tile from '@/components/widgets/Tile';
import API from '../services/apiMapper';

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
  methods: {
    search() {
      const { search } = this.$route.params;
      const { type } = this.$route.params;
      const { key } = this.$route.params;

      if (search === 'search') {
        if (type === 'comics') {
          this.$store.commit('loading');
          API.getMarvelComics(key)
            .then((data) => {
              this.$store.commit('loading');
              if (data.count > 0) {
                this.$store.commit('saveLastSearch', data.results);
              } else {
                this.$store.commit('setErrorMessage', 'No marvel comics found');
              }
            })
            .catch(() => {
              this.$store.commit('loading');
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
}
</style>
