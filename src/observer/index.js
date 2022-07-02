import { arrayMethods } from "./array";

class Observer {
  constructor(value) {
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
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);

      value = newValue;
    },
  });
}

export function observe(data) {
  if (typeof data !== "object" && data !== null) {
    return data;
  }
  if(data.__ob__) {
    return data;
  }

  return new Observer(data);
}
