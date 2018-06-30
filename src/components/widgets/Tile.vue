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
import CONST from '../../config/CONST';

export default {
  name: 'Tile',
  props: ['tile'],
  computed: {
    image() {
      return `${this.tile.thumbnail.path}/portrait_small.${this.tile.thumbnail.extension}`;
    },
    title() {
      return this.tile.title !== undefined ? this.tile.title : this.tile.name;
    },
    description() {
      return this.tile.description.length > 300 ? `${this.tile.description.substr(0, 200)}...` : '';
    },
  },
  methods: {
    displayTile(id) {
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

