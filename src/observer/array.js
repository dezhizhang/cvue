let oldArrayProtoMethod = Array.prototype;

export let arrayMethods = Object.create(oldArrayProtoMethod);

let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];

methods.forEach((method) => {
  arrayMethods[method] = function () {
    const result = oldArrayProtoMethod[method].apply(this, arguments);
    return result;
  };
});
