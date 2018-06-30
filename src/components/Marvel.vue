<template>
  <div class="marvel-app">
    <div class="marvel-app__content__wrapper">
      <div class="marvel-app__logo__wrapper"><img src="../assets/marvel-logo.png" alt="Marvel logo"/></div>
      <div class="marvel-app__content__wrapper" v-if="!$store.state.isLoading">
        <error v-if="$store.state.errorHandling.errorActive"></error>
        <search></search>
        <listing></listing>
      </div>
    </div>
    <div class="marvel-app__loader" v-if="$store.state.isLoading">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import Search from '@/components/widgets/Search';
import Loader from '@/components/widgets/Loader';
import Error from '@/components/widgets/Error';
import Listing from '@/components/Listing';

export default {
  name: 'Marvel',
  components: {
    Search,
    Error,
    Loader,
    Listing,
  },
};
</script>

<style lang="scss">
@import '../css/reset.scss';
@import '../css/general.scss';
@import '../css/variables.scss';

.marvel-app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  &__logo__wrapper {
    text-align: center;
    margin: $stack-xl 0;
    img {
      width: 30%;
    }
  }
  &__content__wrapper, &__loader {
    transition: all 1s linear;
  }
}
</style>
