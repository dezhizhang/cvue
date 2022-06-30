(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function observe(data) {
      console.log(data);
    }

    function initState(vm) {
      var options = vm.$options;

      if (options.props) ;

      if (options.methods) ;

      if (options.data) {
        initData(vm);
      }

      if (options.computed) ;

      if (options.watch) ;
    }

    function initData(vm) {
      var data = vm.$options.data;
      data = typeof data == 'function' ? data.call(vm) : data; //数据

      observe(data);
      console.log(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (optons) {
        var vm = this;
        vm.$options = optons; // 初始化状态

        initState(vm);
      };
    }

    function Vue(optons) {
      this._init(optons);
    }

    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
