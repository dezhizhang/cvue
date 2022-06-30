import { initMixin } from "./init";


function Vue(optons) {
    const vm = this;
    vm.$options = optons;
    console.log('options')
}

initMixin(Vue);

export default Vue;
