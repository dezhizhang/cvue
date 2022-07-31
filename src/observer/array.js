/*
 * :file description: 
 * :name: /cvue/src/observer/array.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-02 14:55:30
 * :last editor: 张德志
 * :date last edited: 2022-07-31 10:30:17
 */
let oldArrayProtoMethod = Array.prototype;

export let arrayMethods = Object.create(oldArrayProtoMethod);

let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayProtoMethod[method].apply(this, args);
    let inserted;
    let ob = this.__ob__;
    
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if(inserted) ob.observeArray(inserted);
    ob.dep.notify(); // 通知数组更新
    return result;
  };
});
