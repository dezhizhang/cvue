const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute =
  /^\s*([^\s”‘<>\/=]+)(?:\s*(=)\s*(?:”([^”]*)”+|'([^’]*)’+|([^\s”‘=<>`]+)))?/;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClode = /^\s*(\/?)>/;

export function parseHTML(html) {
  let root;
  let currentParent;
  let stack = [];

  function createAstElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent: null,
    };
  }

  function start(tagName, attrs) {
    let element = createAstElement(tagName, attrs);
    if (!root) {
      root = element;
    }
    currentParent = element;
    stack.push(tagName);
  }

  function chars(text) {
    text = text.replace(/\s/g, "");
    if (text) {
      currentParent.children.push({
        type: 3,
        text,
      });
    }
  }

  function end(tagName) {
    let element = stack.pop();
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parseStartTag(html);
      console.log(startTagMatch);
      debugger;
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
      }
      const endTagMatch = html.match(endTag);
      console.log(endTagMatch);
      if (endTagMatch) {
        html = advance(html, endTagMatch[0].length);
        end(endTagMatch[1]);
      }
    }
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      html = advance(html, text.length);

      chars(text);
    }
  }
  return root;
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
      match.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5],
      });
      html = advance(html, attr[0].length);
    }
    if (end) {
      html = advance(html, end[0].length);
      return match;
    }
  }

  function advance(html, n) {
    html = html.substring(n);
    return html;
  }
}
