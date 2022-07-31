/*
 * :file description: 
 * :name: /cvue/src/lifcycle.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 05:53:23
 * :last editor: 张德志
 * :date last edited: 2022-07-31 08:12:30
 */

import { patch } from './vdom/patch';
export function lifcycleMixin(Vue) {
   Vue.prototype._update = function(vnode) {
    const vm = this;
    patch(vm.$el,vnode);
   }
}

export function mountComponent(vm,el) {
    callHook(vm,'beforeMount');
    // 先调用render方法创建虚拟节点
    vm._update(vm._render());
    callHook(vm,'mounted');
}

export function callHook(vm,hook) {
    const handles = vm.$options[hook];
    if(handles) {
        for(let i=0;i < handles.length;i++) {
            handles[i].call(vm);
        }
    }
}


