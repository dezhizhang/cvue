/*
 * :file description: 
 * :name: /cvue/src/compile/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-02 16:40:54
 * :last editor: 张德志
 * :date last edited: 2022-07-25 04:57:24
 */
import { parseHTML } from "./parse";
import { generate } from "./generate";

export function compileToFunction(template) {
  let ast = parseHTML(template);

  console.log('ast',ast);
  
}
