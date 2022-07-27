/*
 * :file description: 

 * :name: /cvue/src/utils.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-02 14:41:16
 * :last editor: 张德志
 * :date last edited: 2022-07-28 07:20:59
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


let strats = {};

export const LIFECYCLE_HOOKS = [

];

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
    if(parent.hashOwnProperty(key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    if(strats[key]) {
      options[key] = strats[key](parent[key],child[key])
    }else {

    }
  }
  return options;

}