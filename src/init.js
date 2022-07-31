/*
 * :file description:
 * :name: /cvue/src/init.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 06:06:37
 * :last editor: 张德志
 * :date last edited: 2022-07-31 08:11:32
 */
import { compileToFunction } from "./compile/index";
import { initState } from "./state";
import { mountComponent,callHook } from "./lifcycle";
import { mergeOptions } from './utils'

export function initMixin(Vue) {
  Vue.prototype._init = function (optons) {
    const vm = this;
    // 将用户自定义的options进行合并
    vm.$options = mergeOptions(vm.constructor.options,optons);
    callHook(vm,'beforeCreate');
    // 初始化状态
    initState(vm);
    callHook(vm,'created');
    //如果当前有el属性说明要渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;

    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      const render = compileToFunction(template);
      options.render = render;
    }

    mountComponent(vm, el);
  };
}
