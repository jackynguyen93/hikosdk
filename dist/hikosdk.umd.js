(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.hikosdk = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    props: {
      items: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;
  /* template */

  var __vue_render__ = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("ul", {
      staticClass: "breadcrumb"
    }, _vm._l(_vm.items, function (item) {
      return _c("li", {
        key: item.href
      }, [_c("a", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: item.href && item.href.length > 0 && !item.actvie,
          expression: "item.href && item.href.length>0 && !item.actvie"
        }],
        attrs: {
          href: item.href
        }
      }, [_vm._v(_vm._s(item.text))]), _vm._v(" "), _c("span", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: item.active && item.active === true,
          expression: "item.active && item.active === true"
        }]
      }, [_vm._v(_vm._s(item.text))])]);
    }), 0);
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  const __vue_inject_styles__ = function (inject) {
    if (!inject) return;
    inject("data-v-e1858cb4_0", {
      source: "\nul.breadcrumb[data-v-e1858cb4] {\n    padding: 10px 16px;\n    list-style: none;\n    background-color: #eee;\n}\nul.breadcrumb li[data-v-e1858cb4] {\n    display: inline;\n    font-size: 18px;\n}\nul.breadcrumb li + li[data-v-e1858cb4]:before {\n    padding: 8px;\n    color: black;\n    content: \"/\\00a0\";\n}\nul.breadcrumb li a[data-v-e1858cb4] {\n    color: #0275d8;\n    text-decoration: none;\n}\nul.breadcrumb li a[data-v-e1858cb4]:hover {\n    color: #01447e;\n    text-decoration: underline;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/nguyen/work/hikosdk/src/components/breadcrumb/breadcrumb.vue"],
        "names": [],
        "mappings": ";AAsBA;IACA,kBAAA;IACA,gBAAA;IACA,sBAAA;AACA;AACA;IACA,eAAA;IACA,eAAA;AACA;AACA;IACA,YAAA;IACA,YAAA;IACA,iBAAA;AACA;AACA;IACA,cAAA;IACA,qBAAA;AACA;AACA;IACA,cAAA;IACA,0BAAA;AACA",
        "file": "breadcrumb.vue",
        "sourcesContent": ["<template>\n    <ul class=\"breadcrumb\">\n        <li v-for=\"item in items\" :key=\"item.href\">\n            <a v-show=\"item.href && item.href.length>0 && !item.actvie\" :href=\"item.href\">{{item.text}}</a>\n            <span v-show=\"item.active && item.active === true\">{{item.text}}</span>\n        </li>\n    </ul>\n</template>\n\n<script>\n  export default {\n    props: {\n      items: {\n        type: Array,\n        required: true,\n        default: () => []\n      }\n    }\n  };\n</script>\n\n<style scoped>\n    ul.breadcrumb {\n        padding: 10px 16px;\n        list-style: none;\n        background-color: #eee;\n    }\n    ul.breadcrumb li {\n        display: inline;\n        font-size: 18px;\n    }\n    ul.breadcrumb li + li:before {\n        padding: 8px;\n        color: black;\n        content: \"/\\00a0\";\n    }\n    ul.breadcrumb li a {\n        color: #0275d8;\n        text-decoration: none;\n    }\n    ul.breadcrumb li a:hover {\n        color: #01447e;\n        text-decoration: underline;\n    }\n</style>"]
      },
      media: undefined
    });
  };
  /* scoped */


  const __vue_scope_id__ = "data-v-e1858cb4";
  /* module identifier */

  const __vue_module_identifier__ = undefined;
  /* functional template */

  const __vue_is_functional_template__ = false;
  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__ = /*#__PURE__*/normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

  //
  //
  //
  //
  //
  //
  var script$1 = {
    name: 'Login',
    props: {
      className: {
        type: String,
        default: ''
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      class: _vm.className
    }, [_vm._v("\n  login\n")]);
  };

  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
  /* style */

  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return;
    inject("data-v-89c2ebfa_0", {
      source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      map: {
        "version": 3,
        "sources": [],
        "names": [],
        "mappings": "",
        "file": "login.vue"
      },
      media: undefined
    });
  };
  /* scoped */


  const __vue_scope_id__$1 = "data-v-89c2ebfa";
  /* module identifier */

  const __vue_module_identifier__$1 = undefined;
  /* functional template */

  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

  //
  //
  //
  //
  //
  //
  var script$2 = {
    name: 'Category'
  };

  /* script */
  const __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$2 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", [_vm._v("\n  category\n")]);
  };

  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
  /* style */

  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return;
    inject("data-v-3db261e1_0", {
      source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      map: {
        "version": 3,
        "sources": [],
        "names": [],
        "mappings": "",
        "file": "category.vue"
      },
      media: undefined
    });
  };
  /* scoped */


  const __vue_scope_id__$2 = "data-v-3db261e1";
  /* module identifier */

  const __vue_module_identifier__$2 = undefined;
  /* functional template */

  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

  //
  //
  //
  //
  //
  //
  var script$3 = {
    name: 'Content'
  };

  /* script */
  const __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$3 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", [_vm._v("\n  Content\n")]);
  };

  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
  /* style */

  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return;
    inject("data-v-4bb0e668_0", {
      source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      map: {
        "version": 3,
        "sources": [],
        "names": [],
        "mappings": "",
        "file": "content.vue"
      },
      media: undefined
    });
  };
  /* scoped */


  const __vue_scope_id__$3 = "data-v-4bb0e668";
  /* module identifier */

  const __vue_module_identifier__$3 = undefined;
  /* functional template */

  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$4 = {
    name: 'users',
    props: {
      users: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  };

  /* script */
  const __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$4 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("ul", {
      staticClass: "users"
    }, _vm._l(_vm.users, function (user, index) {
      return _c("li", {
        key: index,
        staticClass: "user"
      }, [_c("nuxt-link", {
        attrs: {
          to: {
            name: "users-id",
            params: {
              id: index
            }
          }
        }
      }, [_vm._v("\n      " + _vm._s(user.name) + "\n    ")])], 1);
    }), 0);
  };

  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
  /* style */

  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return;
    inject("data-v-cba2b29c_0", {
      source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      map: {
        "version": 3,
        "sources": [],
        "names": [],
        "mappings": "",
        "file": "users.vue"
      },
      media: undefined
    });
  };
  /* scoped */


  const __vue_scope_id__$4 = "data-v-cba2b29c";
  /* module identifier */

  const __vue_module_identifier__$4 = undefined;
  /* functional template */

  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('hk-breadcrumb', __vue_component__);
    Vue.component('hk-login', __vue_component__$1);
    Vue.component('hk-category', __vue_component__$2);
    Vue.component('hk-content', __vue_component__$3);
    Vue.component('hk-users', __vue_component__$4);
  }
  const plugin = {
    install
  }; // Auto-install

  let GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = plugin;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
