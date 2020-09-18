import breadcrumb from './components/breadcrumb/breadcrumb.vue';
import login from './components/login/login.vue';
import category from './components/news/category.vue';
import content from './components/news/content.vue';

export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('hk-breadcrumb', breadcrumb);
  Vue.component('hk-login', login);
  Vue.component('hk-category', category);
  Vue.component('hk-content', content);
}

const plugin = {
  install
}

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
