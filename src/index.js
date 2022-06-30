import { initMixin } from "./init";


function Vue(optons) {
   this._init(optons);

}

initMixin(Vue);

export default Vue;
