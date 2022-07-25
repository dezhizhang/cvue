/*
 * :file description:
 * :name: /cvue/src/vdom/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 06:02:25
 * :last editor: 张德志
 * :date last edited: 2022-07-26 06:33:57
 */

export function renderMinix(Vue) {
  Vue.prototype._c = function () {
    return createElement(...arguments);
  };
  Vue.prototype._s = function (value) {
    return value == null
      ? ""
      : typeof value == "object"
      ? JSON.stringify(value)
      : value;
  };
  Vue.prototype._v = function (text) {
    return createTextVnode(text);
  };
  Vue.prototype._render = function () {
    const vm = this;
    const render = vm.$options.render;
    let vnode = render.call(vm);
    return vnode;
  };
}

function createElement(tag, data = {}, ...children) {
  return vnode(tag, data, data.key, children);
}

function createTextVnode(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}

// 用来产生虚拟dom
function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text,
  };
}
