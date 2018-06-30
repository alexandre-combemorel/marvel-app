<template>
  <div class="search">
    <div class="search__wrapper">
      <input class="search__wrapper__field" type="text" placeholder="Enter key words" v-model="query"/>
      <div class="search__wrapper__radio__wrapper">
        <input class="search__wrapper__radio" type="radio" id="comic" :value="CONST.TYPE_COMIC" v-model="type"><label class="search__wrapper__radio__label" for="comic">Comic</label>
        <input class="search__wrapper__radio" type="radio" id="character" :value="CONST.TYPE_CHARACTER" v-model="type"><label class="search__wrapper__radio__label" for="character">Character</label>
        <button class="search__wrapper__button" @click="search">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
// LIBRARIES OR UTILITIES
import CONST from '../../config/CONST';

export default {
  name: 'Search',
  data() {
    return {
      CONST,
      // we prefill the form with arguments present in the URL
      query: this.$route.params.key || '',
      type: this.$route.params.type || CONST.TYPE_COMIC,
    };
  },
  methods: {
    search() {
      // When we submit the form, we simply create the query based on the form and use the router to switch to the right state of the app
      this.$router.push(`/${CONST.SEARCH_LISTING}/${this.type}/${this.query}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';

.search {
  &__wrapper {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    &__field, &__button {
      border-radius: 5px;
      border: none;
      padding: $inset-m;
      margin: $inset-m;
      font-weight: bold;
    }
    &__field {
      width: 50%;
    }
    &__button {
      &:hover {
        background: silver;
        cursor: pointer;
      }
    }
    &__radio {
      &__label {
        font-weight: bold;
      }
    }
  }
}
</style>
