/*
 * :file description:
 * :name: /cvue/src/observer/watcher.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 08:41:07
 * :last editor: 张德志
 * :date last edited: 2022-08-03 06:06:14
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
    this.user = options.user;
    this.lazy = options.lazy;
    this.dirty = this.lazy;
    this.isWatcher = !options.user;
    this.deps = [];
    this.value = undefined;
    this.depsId = new Set();
    if (typeof exprorFn == "function") {
      this.getter = exprorFn;
    }else {
      this.getter = function() {
        let path = exprorFn.split(',');
        let obj = vm;
        for(let i=0;i < path.length;i++) {
          obj = obj[path[i]];
        }
        return obj;
      }
    }
    this.value = this.lazy ? void 0:this.get();
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
    let result = this.getter();
    popTarget();
    return result;
  }
  run() {
    let newValue = this.get();
    let oldVnode = this.value;
    if(this.user) {
      this.cb.call(this.vm,newValue,oldVnode);
    }
  }
  update() {
    if(this.lazy) {
      this.dirty = true;
    }else {
      queueWatcher(this);
    }
  }
  evaluate() {
    this.valu = this.get();
    this.dirty = false;
  }
}

let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run();
    if(watcher.isWatcher) {
      watcher.cb();
    }
  })
  // queue.forEach(watcher => watcher.run());
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
    }
  }
}

export default Watcher;
