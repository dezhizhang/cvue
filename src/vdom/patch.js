/*
 * :file description: 
 * :name: /cvue/src/vdom/patch.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 06:43:13
 * :last editor: 张德志
 * :date last edited: 2022-07-28 06:21:32
 */


export function patch(oldVnode,vnode) {
    // 将虚拟节点转换成真实节点
    let el = createElm(vnode);
    updateProperties(vnode);
    let parentElm = oldVnode.parentNode;
    parentElm.insertBefore(el,oldVnode.nextSibling);
    // 删除老节点
    parentElm.removeChild(oldVnode);
}


function createElm(vnode) {
    let { tag,children,key,data,text} = vnode;
    if(typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child));
        })
    }else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}

function updateProperties(vnode) {
    let el = vnode.el;
    let newProps = vnode.data || {};
    for(let key in newProps) {
        if(key == 'style') {
            for(let styleName in newProps.key) {
                el.style[styleName] = newProps.style[styleName];
            }
        }else if(key == 'class') {
            el.className = el.class;
        }else {
            el.setAttribute(key,newProps[key]);
        }
    }
}