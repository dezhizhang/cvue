/*
 * :file description: 

 * :name: /cvue/src/utils.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-02 14:41:16
 * :last editor: 张德志
 * :date last edited: 2022-07-31 15:56:01
 */
export function proxy(vm, data, key) {

  Object.defineProperty(vm,key, {
    get() {
      return vm[data][key];
    },
    set(newValue) {
      vm[data][key] = newValue;
    },
  });
}




export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'update',
  'beforeDestory',
  'destroyed',
];

let strats = {};

strats.data = function(parentVal,childVal) {
  return childVal;
}

strats.computed = function() {

}

strats.watch = function() {

}


LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

function mergeHook(parentVal,childValue) {
  if(childValue) {
    if(parentVal) {
      return parentVal.concat(childValue);
    }else {
      return [childValue];
    }
  }else {
    return parentVal;
  }
}

export function mergeOptions(parent,child) {
  let options = {};

  for(let key in parent) {
    mergeField(key);
  }

  for(let key in child) {
    if(parent && !parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    if(strats[key]) {
      options[key] = strats[key](parent[key],child[key])
    }else {
      options[key] = child[key];
    }
  }
  return options;

}
let pending = false;
let callbacks = [];
function flushCallbacks() {
  callbacks.forEach(cb => cb());
  pending = true;
}

let timerFunc;
if(Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks);
  }
}else if(MutationObserver) {
  let observe = new MutationObserver(flushCallbacks);
  let textNode = document.createTextNode(1);
  observe.observe(textNode,{characterData:true});
  timerFunc = () => {
    textNode.textContent = 2;
  }
}else if(setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  }
}else {
  timerFunc = () => {
    setTimeout(flushCallbacks);
  }
}

export function nextTick(cb) {
  callbacks.push(cb);
  console.log('cb',cb)
  if(!pending) {
    timerFunc();
    
  }
  // Promise.resolve().then()
  // console.log('cb',cb);
}