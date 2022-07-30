/*
 * :file description: 
 * :name: /cvue/src/global-api/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-28 06:29:11
 * :last editor: 张德志
 * :date last edited: 2022-07-31 07:38:28
 */
import { mergeOptions } from '../utils'
export function initGlobalApi(Vue) {
    Vue.options = {};
    Vue.mixin = function(mixin) {
        this.options = mergeOptions(this.options,mixin)
        console.log('------',this.options)
    }
}