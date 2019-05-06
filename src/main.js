import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import VModal from 'vue-js-modal';
import jQuery from 'jquery';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle',
  },
});

Vue.use(BootstrapVue);
Vue.use(VModal, { dialog: true });

Vue.config.productionTip = false;
export default new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});
