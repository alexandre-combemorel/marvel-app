<template>
  <div class="tile" @click="displayTile(tile.format, tile.id)">
    <div class="tile__img"><img :src="image"/></div>
    <div class="tile__text">
      <div class="tile__text__title">{{ tile.title }}</div>
      <div class="tile__text__description">{{ tile.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: ['tile'],
  computed: {
    image() {
      return `${this.tile.thumbnail.path}/portrait_small.${this.tile.thumbnail.extension}`;
    },
  },
  methods: {
    displayTile(type, id) {
      const typeLowerCase = type.toLowerCase();
      this.$router.push(`/searchId/${typeLowerCase}/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';

.tile {
  display: flex;
  flex: 0 0 20%;
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
    }
    &__description {
      color: $secondary;
    }
  }
}
</style>

