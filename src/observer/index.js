/*
 * :file description: 
 * :name: /cvue/src/observer/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-01 06:49:27
 * :last editor: 张德志
 * :date last edited: 2022-07-31 10:45:09
 */
import { arrayMethods } from "./array";
import Dep from './dep';
class Observer {
  constructor(value) {
    this.dep = new Dep();
    Object.defineProperty(value, "__ob__", {
      enumerable: false,
      configurable: false,
      value: this,
    });

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  observeArray(value) {
    value.forEach((item) => {
      observe(item);
    });
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, value) {
  let childDep = observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if(Dep.target) {
        dep.depend();
        if(typeof childDep == 'object') {
          // 默认组数组增加了一个属性
          childDep.dep.depend()
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);

      value = newValue;
      dep.notify();
      
    },
  });
}

export function observe(data) {
  if (typeof data !== "object" && data !== null) {
    return;
  }
  if(data.__ob__) {
    return data;
  }

  return new Observer(data);
}
