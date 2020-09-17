import register from "register.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("v-register", register);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

register.install = install;

export default register;