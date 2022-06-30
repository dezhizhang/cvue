(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function initMixin(Vue) {
      Vue.prototype._init = function (optons) {};
    }

    function Vue(optons) {
      var vm = this;
      vm.$options = optons;
      console.log('options');
    }

    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
