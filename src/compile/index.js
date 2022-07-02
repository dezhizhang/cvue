const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const attribute =
  /^\s*([^\s”‘<>\/=]+)(?:\s*(=)\s*(?:”([^”]*)”+|'([^’]*)’+|([^\s”‘=<>`]+)))?/;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClode = /^\s*(\/?)>/;

function parseHTML(html) {
  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      parseStartTag(html);
      break;
    }
  }
}

function parseStartTag(html) {
  const start = html.match(startTagOpen);
  if (start) {
    let match = {
      tagName: start[1],
      attrs: [],
    };
    html = advance(html, start[0].length);
    let end;
    let attr;
    while (
      !(end = html.match(startTagClode)) &&
      (attr = html.match(attribute))
    ) {
      match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
      html = advance(html, attr[0].length);
    }
    console.log("match", match);
    if (end) {
      html = advance(html,end[0].length);
      return match;
    }
  }
}

function advance(html, n) {
  html = html.substring(n);
  return html;
}

export function compileToFunction(template) {
  const ast = parseHTML(template);
  // return ast;
}
