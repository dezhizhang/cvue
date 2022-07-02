const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

const startTagOpen = new RegExp(`^<${qnameCapture}`);


function parseHTML(html) {
  while (html) {
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      parseStartTag(html);
      break;
    }
  }
}

function parseStartTag(html) {
    const start = html.match(startTagOpen);
    if(start) {
        let match = {
            tagName:start[1],
            attrs:[],
        }
        advance(html,start[0].length);

        console.log('match',match);

    }
}

function advance(html,n) {
    html = html.substring(n);
    return html;

}



export function compileToFunction(template) {
    const ast = parseHTML(template);
    // return ast;

}
