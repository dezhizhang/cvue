/*
 * :file description: 
 * :name: /cvue/src/compile/generate.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-03 15:55:05
 * :last editor: 张德志
 * :date last edited: 2022-07-25 06:57:05
 */


function genProps(attrs) {
    let str = '';
    for(let i=0;i < attrs.length;i++) {
        let attr = attrs[i];
        console.log('attr',attr)
        if(attr.name === 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key,value] = item.split(':');
                obj[key] = value;
            });
            attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    return `{${str.slice(0,-1)}}`;
}

function genChildren(ast) {
    let children = ast.children;
    if(children) {
        return children.map((child) => gen(child)).join(',')
    }
}


function gen(node) {

}

export function generate(ast) { 
    let children = genChildren(ast);
    let code = `_c('${ast.tag}',${ast.attrs.length ? `${genProps(ast.attrs)}`:'undefined'},${children ? `,${children}`:''})`;

     return code;
     
}