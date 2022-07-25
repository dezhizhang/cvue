/*
 * :file description: 
 * :name: /cvue/src/lifcycle.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 05:53:23
 * :last editor: 张德志
 * :date last edited: 2022-07-26 06:58:21
 */

import { patch } from './vdom/patch';

export function lifcycleMixin(Vue) {
   Vue.prototype._update = function(vnode) {
    const vm = this;
    patch(vm.$el,vnode);
   }
}

export function mountComponent(vm,el) {
    // 先调用render方法创建虚拟节点
    vm._update(vm._render())
}

// vue渲染流程
//1先初始化数据
//2将模板进行编译
//3生成虚拟dom


