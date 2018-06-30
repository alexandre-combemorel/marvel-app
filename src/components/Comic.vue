<template>
  <div class="comic">
    <div class="comic__picture"><img :src="image" alt="Comic picture"/></div>
    <div class="comic__information">
      <div class="comic__information__title">{{ comic.title }}</div>
      <div class="comic__information__price">{{ comic.prices[0].price }}$</div>
      <div class="comic__information__characters">
        <b>List of Characters:</b>
        <span v-for="character in comic.characters.items" class="comic__information__characters__list" :key="character.name">{{ character.name }}, </span>
      </div>
      <div class="comic__information__description">
        <b>Description:</b> {{ comic.description }}
      </div>
      <div class="comic__information__serie">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comic',
  props: ['comic'],
  computed: {
    image() {
      return `${this.comic.thumbnail.path}/portrait_uncanny.${this.comic.thumbnail.extension}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../css/variables.scss';

.comic {
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
    &__title {
      font-weight: bold;
    }
    &__price {
      margin-bottom: $stack-s;
    }
    &__characters {
      margin-bottom: $stack-s;
    }
  }
}
</style>
