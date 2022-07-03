import { parseHTML } from "./parse";
import { generate } from "./generate";

export function compileToFunction(template) {
  // let ast = parseHTML(template);

  let code = generate("hello");

  console.log('hello')
}
