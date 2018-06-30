<template>
  <div class="character">
    <div class="character__picture"><img :src="image" alt="Comic picture"/></div>
    <div class="character__information">
      <div class="character__information__name">{{ character.name }}</div>
      <div class="character__information__series">
        <b>Series:</b>
        <span v-for="character in character.series.items" class="character__information__characters__list" :key="character.name">{{ character.name }}, </span>
      </div>
      <div class="character__information__description">
        <b>Description:</b> {{ character.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Character',
  props: ['character'],
  computed: {
    image() {
      // Marvel API ask us to build the image path fetch from the API to select the right format
      return `${this.character.thumbnail.path}/portrait_uncanny.${this.character.thumbnail.extension}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.character {
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (min-width: $break-mobile) {
    flex-direction: row;
  }
  &__picture {
    text-align: center;
    margin-bottom: $stack-m;
    @media (min-width: $break-mobile) {
      margin-right: $inline-l;
      text-align: left;
      margin-bottom: 0;
    }
  }
  &__information {
    b {
      font-weight: bold;
    }
    &__name {
      font-weight: bold;
      margin-bottom: $stack-s;
    }
    &__series {
      margin-bottom: $stack-s;
    }
    &__description {
      margin-bottom: $stack-s;
    }
  }
}
</style>

