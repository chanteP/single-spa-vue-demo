import singleSpaVue from 'single-spa-vue';
import Vue from './libs/vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from './libs/element-ui';

Vue.config.devtools = true;
Vue.use(ElementUI, { size: 'small' });

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#app',
    router,
    store,
    render(h) {
      return h(App);
    },
  },
});

export const bootstrap = [vueLifecycles.bootstrap];

export const mount = [vueLifecycles.mount];

export const unmount = [vueLifecycles.unmount];
