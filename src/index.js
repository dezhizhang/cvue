/*
 * :file description: 
 * :name: /cvue/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 05:49:48
 * :last editor: 张德志
 * :date last edited: 2022-07-26 06:20:15
 */
import { initMixin } from "./init";
import { lifcycleMixin } from './lifcycle';
import { renderMinix } from  './vdom/index';

function Vue(optons) {
   this._init(optons);

}

initMixin(Vue);
//混合生命周期 渲染
lifcycleMixin(Vue);

//
renderMinix(Vue);


export default Vue;
