/*
 * :file description: 

 * :name: /cvue/src/utils.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-02 14:41:16
 * :last editor: 张德志
 * :date last edited: 2022-07-31 07:37:44
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

strats.data = function() {
  
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

    }
  }
  return options;

}
