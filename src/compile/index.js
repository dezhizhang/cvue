/*
 * :file description: 
 * :name: /cvue/src/compile/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-02 16:40:54
 * :last editor: 张德志
 * :date last edited: 2022-07-26 05:46:17
 */
import { parseHTML } from "./parse";
import { generate } from "./generate";

export function compileToFunction(template) {
  //解析html模板
  let ast = parseHTML(template);

  console.log('ast',ast);
  // 生成code
  let code = generate(ast);

  // 将字符串变成函数，限制取值范围
  let render = new Function(`with(this){return ${code}}`);

  return render;
  
}
