class Observer {
  constructor(value) {
    this.walk(value);
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
  console.log(data);
  if (typeof data !== "object" && data !== null) {
    return;
  }

  return new Observer(data);
}
