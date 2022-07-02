import { observe } from "./observer/index";
import { proxy } from './utils';

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
