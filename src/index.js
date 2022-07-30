/*
 * :file description: 
 * :name: /cvue/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 05:49:48
 * :last editor: 张德志
 * :date last edited: 2022-07-31 07:12:18
 */
import { initMixin } from "./init";
import { lifcycleMixin } from './lifcycle';
import { renderMinix } from  './vdom/index';
import { initGlobalApi } from './global-api/index';
function Vue(optons) {
   this._init(optons);

}

initMixin(Vue);
//混合生命周期 渲染
lifcycleMixin(Vue);

//
renderMinix(Vue);

//初始化全局api
initGlobalApi(Vue);


export default Vue;
