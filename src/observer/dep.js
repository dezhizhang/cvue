/*
 * :file description: 
 * :name: /cvue/src/observer/dep.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 09:24:09
 * :last editor: 张德志
 * :date last edited: 2022-07-31 10:08:06
 */

let id = 0;
class Dep {
    constructor() {
        this.subs = [];
        this.id = id++;
    }
    depend() {
        Dep.target.addDep(this);
        // this.subs.push(Dep.target);
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
    
}


Dep.target = null;

export function pushTarget(watcher) {
    Dep.target = watcher;
}

export function popTarget() {
    Dep.target = null;
}


export default Dep;