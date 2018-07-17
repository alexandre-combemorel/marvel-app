<template>
  <div class="tile" @click="displayTile(tile.id)">
    <div class="tile__img"><img :src="image"/></div>
    <div class="tile__text">
      <div class="tile__text__title">{{ title }}</div>
      <div class="tile__text__description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
// LIBRARIES OR UTILITIES
import CONST from '../../config/CONST';

export default {
  name: 'Tile',
  props: ['tile'],
  computed: {
    image() {
      // Marvel API ask us to build the image path fetch from the API to select the right format
      return `${this.tile.thumbnail.path}/portrait_small.${this.tile.thumbnail.extension}`;
    },
    title() {
      // In this component we want to display Comic and Character, the computed property make sure to select the right one
      return this.tile.title !== undefined ? this.tile.title : this.tile.name;
    },
    description() {
      // if the description too big we truck it
      return this.tile.description !== null && this.tile.description.length > 300 ? `${this.tile.description.substr(0, 200)}...` : '';
    },
  },
  methods: {
    displayTile(id) {
      // here we check what is the last search type which as been made to push the right type path and activate the right single view
      const { lastSearchType } = this.$store.state.search;
      this.$router.push(`/${CONST.SEARCH_SINGLE}/${lastSearchType}/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';

.tile {
  display: flex;
  flex: 0 0 50%;
  @media (min-width: $break-mobile) {
    flex: 0 0 20%;
  }
  border-radius: 5px;
  margin: $inset-s;
  padding: $inset-s;
  background: $tertiary;
  cursor: pointer;
  &__img {
    margin-right: $inline-s;
  }
  &__text {
    &__title {
      color: $secondary;
      font-weight: bold;
      margin-bottom: $stack-s;
    }
    &__description {
      color: $secondary;
    }
  }
}
</style>

