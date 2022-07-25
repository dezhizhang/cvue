/*
 * :file description: 
 * :name: /cvue/src/lifcycle.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 05:53:23
 * :last editor: 张德志
 * :date last edited: 2022-07-26 06:35:38
 */


export function lifcycleMixin(Vue) {
   Vue.prototype._update = function(vnode) {
    console.log('---------',vnode);
   }
}

export function mountComponent(vm,el) {


    // 先调用render方法创建虚拟节点
    vm._update(vm._render())
}

