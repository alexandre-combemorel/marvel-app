<template>
  <div class="marvel-app">
    <div class="marvel-app__content__wrapper">
      <div class="marvel-app__logo__wrapper"><img src="../assets/marvel-logo.png" alt="Marvel logo"/></div>

      <div class="marvel-app__content__wrapper">

        <div class="marvel-app__error"><error v-if="$store.state.errorHandling.errorActive"></error></div>
        <div class="marvel-app__loader" v-if="$store.state.isLoading"><loader></loader></div>

        <div class="marvel-app__content__wrapper__listing">
          <search></search>
          <listing></listing>
        </div>

        <div v-if="displaySingleView" class="marvel-app__content__wrapper__single">
          <single-view></single-view>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/widgets/Search';
import Loader from '@/components/widgets/Loader';
import Error from '@/components/widgets/Error';
import Listing from '@/components/Listing';
import SingleView from '@/components/SingleView';

import CONST from '../config/CONST';

export default {
  name: 'Marvel',
  components: {
    Search,
    Error,
    Loader,
    Listing,
    SingleView,
  },
  computed: {
    displaySingleView() {
      return this.$route.path.indexOf(CONST.SEARCH_SINGLE) !== -1;
    },
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
  &__content__wrapper, &__loader, &__error {
    transition: all 1s linear;
  }
}
</style>
