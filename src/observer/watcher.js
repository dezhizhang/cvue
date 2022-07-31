/*
 * :file description:
 * :name: /cvue/src/observer/watcher.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 08:41:07
 * :last editor: 张德志
 * :date last edited: 2022-07-31 15:31:46
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
    if (this.depsId.has(id)) {
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
  run() {
    this.get();
  }
  update() {
    queueWatcher(this);
    this.get();
  }
}

let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue() {
  queue.forEach(watcher => watcher.run());
  queue = [];
  has = {};
  pending = false;
}

function nextTick() {
  
}


function queueWatcher(watcher) {
  let id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;
    if (!pending) {
      nextTick(flushSchedulerQueue);
      // setTimeout(() => {
      //   queue.forEach((watcher) => watcher.run());
      //   queue = [];
      //   has = {};
      //   pending = false;
      // }, 0);
      // pending = true;
    }
  }
}

export default Watcher;
