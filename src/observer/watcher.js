/*
 * :file description:
 * :name: /cvue/src/observer/watcher.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 08:41:07
 * :last editor: 张德志
 * :date last edited: 2022-07-31 09:33:11
 */
import { pushTarget, popTarget } from "./dep";
let id = 0;

class Watcher {
  constructor(vm, exprorFn, cb, options) {
    this.vm = vm;
    this.cb = cb;
    this.id = id++;
    this.exprorFn = exprorFn;
    this.options = options;

    if (typeof exprorFn == "function") {
      this.getter = exprorFn;
    }
    this.get();
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }
  update() {
    this.get()
  }
}

export default Watcher;
