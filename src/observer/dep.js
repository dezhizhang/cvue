/*
 * :file description: 
 * :name: /cvue/src/observer/dep.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 09:24:09
 * :last editor: 张德志
 * :date last edited: 2022-07-31 09:31:56
 */


class Dep {
    constructor() {
        this.subs = [];
    }
    depend() {
        this.subs.push(Dep.target);
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