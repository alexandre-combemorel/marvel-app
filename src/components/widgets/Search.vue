<template>
  <div class="search">
    <div class="search__wrapper">
      <input class="search__wrapper__field" type="text" placeholder="Enter key words" v-model="query"/>
      <div class="search__wrapper__radio__wrapper">
        <input class="search__wrapper__radio" type="radio" id="comic" value="comics" v-model="type"><label class="search__wrapper__radio__label" for="comic">Comic</label>
        <input class="search__wrapper__radio" type="radio" id="character" value="characters" v-model="type"><label class="search__wrapper__radio__label" for="character">Character</label>
        <button class="search__wrapper__button" @click="search">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      query: '',
      type: 'comics',
    };
  },
  methods: {
    search() {
      this.$router.push(`/search/${this.type}/${this.query}`);
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
