/*
 * :file description: 
 * :name: /cvue/src/state.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 06:30:08
 * :last editor: 张德志
 * :date last edited: 2022-07-31 15:39:45
 */
import { observe } from "./observer/index";
import { nextTick, proxy } from './utils';

export function initState(vm) {
  const options = vm.$options;
  if (options.props) {
    initProps(vm);
  }
  if (options.methods) {
    initMethods(vm);
  }
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) {
    initWatch();
  }
}

function initProps() {

}

function initMethods() {

}

function initData(vm) {
    let data = vm.$options.data;
    vm._data = data = typeof data == 'function' ? data.call(vm):data;
    
    for(let key in data) {
      proxy(vm,'_data',key)
    }
    //数据
    observe(data);
    
}

function initComputed() {

}

function initWatch() {

}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function(cb) {
    nextTick(cb);
  }
}
