(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  /*
   * :file description: 
   * :name: /cvue/src/compile/parse.js
   * :author: 张德志
   * :copyright: (c) 2022, Tungee
   * :date created: 2022-07-02 21:08:47
   * :last editor: 张德志
   * :date last edited: 2022-07-25 06:03:26
   */
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; //标签名
  // ?：匹配不捕获

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //  <my:xx>

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); //标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //匹配标签结尾的</div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; //匹配属性的   aaa

  var startTagClose = /^\s*(\/?)>/; //匹配标签结束的 >

  function parseHTML(html) {
    var root; //标签闭合是否符合预期

    var stack = [];
    var currentParent;

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end;

        var attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        //标签名
        type: 1,
        //元素类型
        children: [],
        //孩子列表
        attrs: attrs,
        //属性集合
        parent: null //父元素

      };
    }

    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element; //当前解析的标签 保存起来

      stack.push(element);
    }

    function end(tagName) {
      //在结尾标签处  创建父子关系
      var element = stack.pop(); //取出栈中的最后一个

      currentParent = stack[stack.length - 1];

      if (currentParent) {
        //在闭合时可以知道这个标签的父亲是谁
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      //把空格删掉
      text = text.replace(/\s/g, "");

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    }

    while (html) {
      //只要html不为空字符串，就一直解析
      var textEnd = html.indexOf("<");

      if (textEnd == 0) {
        var startTagMatch = parseStartTag(); //开始标签匹配的结果  处理开始

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          //处理结束标签
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        //是文本
        text = html.substring(0, textEnd);
      }

      if (text) {
        //处理文本
        advance(text.length);
        chars(text);
      }
    }

    function advance(n) {
      //将字符串进行截取操作，在更新内容
      html = html.substring(n);
    }

    return root;
  }

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*
   * :file description: 
   * :name: /cvue/src/compile/generate.js
   * :author: 张德志
   * :copyright: (c) 2022, Tungee
   * :date created: 2022-07-03 15:55:05
   * :last editor: 张德志
   * :date last edited: 2022-07-25 07:02:17
   */
  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      console.log('attr', attr);

      if (attr.name === 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(ast) {
    var children = ast.children;

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }

  function gen(node) {
    if (node.type === 1) {
      return generate(node);
    } else {
      var text = node.text;
      return "_v(".concat(JSON.stringify(text), ")");
    }
  }

  function generate(ast) {
    var children = genChildren(ast);
    var code = "_c('".concat(ast.tag, "',").concat(ast.attrs.length ? "".concat(genProps(ast.attrs)) : 'undefined', ",").concat(children ? "".concat(children) : '', ")");
    return code;
  }

  /*
   * :file description: 
   * :name: /cvue/src/compile/index.js
   * :author: 张德志
   * :copyright: (c) 2022, Tungee
   * :date created: 2022-07-02 16:40:54
   * :last editor: 张德志
   * :date last edited: 2022-07-25 06:51:58
   */
  function compileToFunction(template) {
    //解析html模板
    var ast = parseHTML(template);
    console.log('ast', ast); // 生成code

    var code = generate(ast);
    console.log('code', code);
  }

  var oldArrayProtoMethod = Array.prototype;
  var arrayMethods = Object.create(oldArrayProtoMethod);
  var methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayProtoMethod[method].apply(this, args);
      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          inserted = args.slice(2);
          break;
      }

      if (inserted) ob.observeArray(inserted);
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      Object.defineProperty(value, "__ob__", {
        enumerable: false,
        configurable: false,
        value: this
      });

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        value.forEach(function (item) {
          observe(item);
        });
      }
    }, {
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
    if (_typeof(data) !== "object" && data !== null) {
      return data;
    }

    if (data.__ob__) {
      return data;
    }

    return new Observer(data);
  }

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        vm[data][key] = newValue;
      }
    });
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
    vm._data = data = typeof data == 'function' ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, '_data', key);
    } //数据


    observe(data);
  }

  /*
   * :file description: 
   * :name: /cvue/src/init.js
   * :author: 张德志
   * :copyright: (c) 2022, Tungee
   * :date created: 2022-07-01 06:06:37
   * :last editor: 张德志
   * :date last edited: 2022-07-25 04:43:58
   */
  function initMixin(Vue) {
    Vue.prototype._init = function (optons) {
      var vm = this;
      vm.$options = optons; // 初始化状态

      initState(vm); //如果当前有el属性说明要渲染模板

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        }

        var render = compileToFunction(template);
        options.render = render;
      }
    };
  }

  function Vue(optons) {
    this._init(optons);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
