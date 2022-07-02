import { parseHTML } from "./parse";

export function compileToFunction(template) {
    const ast = parseHTML(template);
    console.log(ast);
    
//   const ast = parseHTML(template);
//   console.log(ast);
}
