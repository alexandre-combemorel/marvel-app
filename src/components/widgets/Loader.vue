<template>
  <div class="loader">
    Loading...
  </div>
</template>

<script>
// This component is active when we are waiting for an API answer
export default {
  name: 'Loader',
};
</script>

<style lang="scss" scoped>
@import '../../css/variables.scss';

.loader {
  text-align: center;
  margin: $inset-xl;
  font-weight: bold;
  font-size: 2em;
  animation: blinking 2s ease infinite;
}
@keyframes blinking {
    0% { opacity: 0;}
    50% { opacity: 1;}
    100% {opacity: 0;}
}
</style>

