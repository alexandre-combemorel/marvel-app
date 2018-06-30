import Vue from 'vue';
import Router from 'vue-router';
import Marvel from '@/components/Marvel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:search?/:type?/:key?',
      name: 'Marvel',
      component: Marvel,
    },
  ],
});
