(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var oldArrayProtoMethod = Array.prototype;
  var arrayMethods = Object.create(oldArrayProtoMethod);
  var methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      var result = oldArrayProtoMethod[method].apply(this, arguments);
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods;
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue);
        value = newValue;
      }
    });
  }

  function observe(data) {
    console.log(data);

    if (_typeof(data) !== "object" && data !== null) {
      return;
    }

    return new Observer(data);
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
    vm._data = data = typeof data == 'function' ? data.call(vm) : data; // for(let key in data) {
    //   proxy(vm,'_data',key)
    // }
    //数据

    observe(data);
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
