import Router from 'vue-router';
import Vue from '../libs/vue';
import config from '../../project.config';
import routes from './routes';

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: config.path,
  routes,
});
