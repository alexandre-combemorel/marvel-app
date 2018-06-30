<template>
  <div class="error">
    <div class="error__message">{{ $store.state.errorHandling.errorMessage }}</div>
  </div>
</template>

<script>
// Just a component to display errors on the page
export default {
  name: 'Error',
};
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';

.error {
  color: $primary;
  font-weight: bold;
  display: flex;
  justify-content: center;
  &__message {
    width: 90%;
    margin: $inset-m;
    padding: $inset-s;
    border: solid $primary 1px;
    border-radius: 5px;
  }
}
</style>
