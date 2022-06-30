import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (optons) {
    const vm = this;
    vm.$options = optons;

    // 初始化状态
    initState(vm);
  };
}
