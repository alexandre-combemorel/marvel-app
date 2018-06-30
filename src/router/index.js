import Vue from 'vue';
import Router from 'vue-router';
import Marvel from '@/components/Marvel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Marvel',
      component: Marvel,
    },
  ],
});
