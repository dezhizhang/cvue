import { compileToFunction } from "./compile/index";
import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (optons) {
    const vm = this;
    vm.$options = optons;

    // 初始化状态
    initState(vm);

    //如果当前有el属性说明要渲染模板
    if(vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  Vue.prototype.$mount = function(el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

    if(!options.render) {
      let template = options.template;
      if(!template && el) {
        template = el.outerHTML;
      }
      const render = compileToFunction(template);
      options.render = render;
    }
  }
}
