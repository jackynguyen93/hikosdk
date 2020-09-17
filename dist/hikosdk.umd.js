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
    inject("data-v-45289926_0", {
      source: "\nul.breadcrumb[data-v-45289926] {\n    padding: 10px 16px;\n    list-style: none;\n    background-color: #eee;\n}\nul.breadcrumb li[data-v-45289926] {\n    display: inline;\n    font-size: 18px;\n}\nul.breadcrumb li + li[data-v-45289926]:before {\n    padding: 8px;\n    color: black;\n    content: \"/\\00a0\";\n}\nul.breadcrumb li a[data-v-45289926] {\n    color: #0275d8;\n    text-decoration: none;\n}\nul.breadcrumb li a[data-v-45289926]:hover {\n    color: #01447e;\n    text-decoration: underline;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/nguyen/work/hikosdk/src/components/register/register.vue"],
        "names": [],
        "mappings": ";AAsBA;IACA,kBAAA;IACA,gBAAA;IACA,sBAAA;AACA;AACA;IACA,eAAA;IACA,eAAA;AACA;AACA;IACA,YAAA;IACA,YAAA;IACA,iBAAA;AACA;AACA;IACA,cAAA;IACA,qBAAA;AACA;AACA;IACA,cAAA;IACA,0BAAA;AACA",
        "file": "register.vue",
        "sourcesContent": ["<template>\n    <ul class=\"breadcrumb\">\n        <li v-for=\"item in items\" :key=\"item.href\">\n            <a v-show=\"item.href && item.href.length>0 && !item.actvie\" :href=\"item.href\">{{item.text}}</a>\n            <span v-show=\"item.active && item.active === true\">{{item.text}}</span>\n        </li>\n    </ul>\n</template>\n\n<script>\n  export default {\n    props: {\n      items: {\n        type: Array,\n        required: true,\n        default: () => []\n      }\n    }\n  };\n</script>\n\n<style scoped>\n    ul.breadcrumb {\n        padding: 10px 16px;\n        list-style: none;\n        background-color: #eee;\n    }\n    ul.breadcrumb li {\n        display: inline;\n        font-size: 18px;\n    }\n    ul.breadcrumb li + li:before {\n        padding: 8px;\n        color: black;\n        content: \"/\\00a0\";\n    }\n    ul.breadcrumb li a {\n        color: #0275d8;\n        text-decoration: none;\n    }\n    ul.breadcrumb li a:hover {\n        color: #01447e;\n        text-decoration: underline;\n    }\n</style>"]
      },
      media: undefined
    });
  };
  /* scoped */


  const __vue_scope_id__ = "data-v-45289926";
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

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('hk-register', __vue_component__);
  }
  const VRegister = __vue_component__;
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

  exports.VRegister = VRegister;
  exports.default = plugin;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
