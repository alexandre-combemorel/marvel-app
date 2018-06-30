<template>
  <div class="single-view">
    <comic v-if="comicLoaded" :comic="comic"></comic>
  </div>
</template>

<script>
import Comic from '@/components/Comic';

import _ from 'lodash';
import API from '../services/apiMapper';

export default {
  name: 'SingleView',
  components: {
    Comic,
  },
  data() {
    return {
      comic: {},
    };
  },
  computed: {
    comicLoaded() {
      return !_.isEmpty(this.comic);
    },
  },
  mounted() {
    this.loadComic();
  },
  methods: {
    loadComic() {
      const id = this.$route.params.key;
      // we first try to see if the Comic was part of the last search, if yes we don't need a API request
      this.comic = _.find(this.$store.state.collectionMarvelComics, { id });
      // If not found we fetch the comics from the API, in case the page is access by URL for instance
      if (this.comic === undefined) this.fetchComic(id);
    },
    fetchComic(id) {
      this.$store.commit('loadingOn');
      this.$store.commit('clearErrorMessage');
      API.getMarvelComicId(id)
        .then((data) => {
          this.$store.commit('loadingOff');
          if (data.count > 0) {
            this.comic = data.results[0];
          } else {
            this.$store.commit('setErrorMessage', 'No marvel comic found');
          }
        })
        .catch(() => {
          this.$store.commit('setErrorMessage', 'Comic can\'t be found');
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
