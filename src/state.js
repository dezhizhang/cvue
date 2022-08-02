/*
 * :file description: 
 * :name: /cvue/src/state.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 06:30:08
 * :last editor: 张德志
 * :date last edited: 2022-08-03 05:52:44
 */
import { observe } from "./observer/index";
import Watcher from "./observer/watcher";
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
    initWatch(vm);
  }
}

function initProps() {

}

function initMethods() {

}

function initComputed(vm) {
  let computed = vm.$options.computed;
  const watchers =vm._computedWatchers = {};

  for(let key in computed) {
    let userDef = computed[key];
    const getter = typeof userDef == 'function' ? userDef:userDef.get;
    watchers[key] = new Watcher(vm,getter,() =>{},{lazy:true})
    defineComponent(vm,key,userDef)
  }
}
const sharedPropertyDefinition = {};

function defineComponent(target,key,userDef) {
  if(typeof userDef == 'function') {
    sharedPropertyDefinition.get = userDef;
  }else {
    sharedPropertyDefinition.get = userDef.get;
    sharedPropertyDefinition.set = userDef.set;
  }
  Object.defineProperty(target,key,sharedPropertyDefinition);
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



function initWatch(vm) {
  let watch = vm.$options.watch;
  for(let key in watch) {
    const handler = watch[key];
    if(Array.isArray(handler)) {
      handler.forEach(handle => {
        createWatcher(vm,key,handle);
      })
    }else {
      createWatcher(vm,key,handler);
    }
  }
}


function createWatcher(vm,exprOrFn,handler,options) {
  if(typeof handler == 'object') {
    options = handler;
    handler = handler.handler;
  }
  if(typeof handler == 'string') {
    handler = vm[handler];
  }
  console.log('handler',handler);
  return vm.$watch(exprOrFn,handler,options);
}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function(cb) {
    nextTick(cb);
  }
  Vue.prototype.$watch = function(exprOrFn,cb,options) {
   let watcher = new Watcher(this,exprOrFn,cb,{...options,user:true});
   if(options.immediate) {
    console.log('cb',cb);
    // cb();
    
   }
  }
}
