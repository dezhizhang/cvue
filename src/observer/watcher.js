/*
 * :file description:
 * :name: /cvue/src/observer/watcher.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 08:41:07
 * :last editor: 张德志
 * :date last edited: 2022-07-31 10:06:28
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
    this.deps = [];
    this.depsId = new Set();
    if (typeof exprorFn == "function") {
      this.getter = exprorFn;
    }
    this.get();
  }
  addDep(dep) {
    let id = dep.id;
    if(this.depsId.has(id)) {
        this.deps.push(dep);
        this.depsId.add(id);
        dep.addSub(this);
    }
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
