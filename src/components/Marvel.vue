<template>
  <div class="marvel-app">
    <div class="marvel-app__content__wrapper">
      <div class="marvel-app__logo__wrapper" @click="backHome"><img src="../assets/marvel-logo.png" alt="Marvel logo"/></div>

      <div class="marvel-app__content__wrapper">

        <div v-if="$store.state.errorHandling.errorActive" class="marvel-app__error"><error></error></div>
        <div v-if="$store.state.isLoading" class="marvel-app__loader"><loader></loader></div>

        <div v-if="displayListing" class="marvel-app__content__wrapper__listing">
          <search></search>
          <listing></listing>
        </div>
        <div v-if="displaySingleView" class="marvel-app__content__wrapper__single">
          <div class="marvel-app__content__wrapper__single__back" @click="backHistory">BACK</div>
          <single-view></single-view>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// COMPONENTS
import Search from '@/components/widgets/Search';
import Loader from '@/components/widgets/Loader';
import Error from '@/components/widgets/Error';
import Listing from '@/components/Listing';
import SingleView from '@/components/SingleView';

// LIBRARIES OR UTILITIES
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
    displayListing() {
      // this computed property make sure the Listing is display only with a root path or when the searchListing is Active
      return this.$route.path.indexOf(CONST.SEARCH_LISTING) !== -1 || this.$route.path === '/';
    },
    displaySingleView() {
      // this computed property make sure the single view is display when we want to display a comic or a character
      return this.$route.path.indexOf(CONST.SEARCH_SINGLE) !== -1;
    },
  },
  methods: {
    // This 2 function needs to be improve to properly manage when a user come straight away with url parameters or not
    backHome() {
      this.$router.push('/');
    },
    backHistory() {
      window.history.back();
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
    cursor: pointer;
    text-align: center;
    margin: $stack-xl 0;
    img {
      width: 30%;
    }
  }
  &__content__wrapper, &__loader, &__error {
    transition: all 1s linear;
  }
  &__content__wrapper__single__back {
    font-size: 2em;
    margin: $inset-l;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
  }
}
</style>
