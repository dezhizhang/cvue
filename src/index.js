/*
 * :file description: 
 * :name: /cvue/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 05:49:48
 * :last editor: 张德志
 * :date last edited: 2022-08-02 04:52:25
 */
import { initMixin } from "./init";
import { lifcycleMixin } from './lifcycle';
import { renderMinix } from  './vdom/index';
import { initGlobalApi } from './global-api/index';
import { stateMixin } from "./state";
function Vue(optons) {
   this._init(optons);

}

initMixin(Vue);
//混合生命周期 渲染
lifcycleMixin(Vue);

// 初始化状态
stateMixin(Vue);


//
renderMinix(Vue);

//初始化全局api
initGlobalApi(Vue);

import { compileToFunction } from './compile/index';
import { createElm,patch } from './vdom/patch';

let vm1 = new Vue({data:{name:'hello'}});
let render1 = compileToFunction(`<div id="a">{{name}}</div>`);
let vnode1 = render1.call(vm1);

document.body.appendChild(createElm(vnode1));

let vm2 = new Vue({data:{name:'change'}});
let render2 = compileToFunction(`<div id="b">{{name}}</div>`);
let vnode2 = render2.call(vm2);

setTimeout(() =>{
   patch(vnode1,vnode2);
},1000)


export default Vue;
