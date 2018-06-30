<template>
  <div class="single-view">
    <comic v-if="comicLoaded" :comic="comic"></comic>
    <character v-if="characterLoaded" :character="character"></character>
  </div>
</template>

<script>
import Comic from '@/components/Comic';
import Character from '@/components/Character';

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
    return {
      comic: {},
      character: {},
    };
  },
  computed: {
    comicLoaded() {
      return !_.isEmpty(this.comic);
    },
    characterLoaded() {
      return !_.isEmpty(this.character);
    },
  },
  mounted() {
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
      this.$store.commit('loadingOn');
      this.$store.commit('clearErrorMessage');
      API.getMarvelComicId(id)
        .then((data) => {
          this.$store.commit('loadingOff');
          if (data.count > 0) {
            this.comic = data.results[0];
          } else {
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_COMIC);
          }
        })
        .catch(() => {
          this.$store.commit('setErrorMessage', CONST.ERROR_NETWORK);
          this.$store.commit('loadingOff');
        });
    },
    fetchCharacter(id) {
      this.$store.commit('loadingOn');
      this.$store.commit('clearErrorMessage');
      API.getMarvelCharacterId(id)
        .then((data) => {
          this.$store.commit('loadingOff');
          if (data.count > 0) {
            this.character = data.results[0];
          } else {
            this.$store.commit('setErrorMessage', CONST.ERROR_NORESULTS_CHARACTER);
          }
        })
        .catch(() => {
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
