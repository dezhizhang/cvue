/*
 * :file description: 
 * :name: /cvue/src/vdom/patch.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-26 06:43:13
 * :last editor: 张德志
 * :date last edited: 2022-08-02 04:46:22
 */


export function patch(oldVnode,vnode) {
    
    if(oldVnode.nodeType === 1) {
        // 将虚拟节点转换成真实节点
        let el = createElm(vnode);
        updateProperties(vnode);
        let parentElm = oldVnode.parentNode;
        parentElm.insertBefore(el,oldVnode.nextSibling);
        // 删除老节点
        parentElm.removeChild(oldVnode);
        return el;
    }else {
        //1.比较两个元素标签不一样直接替换
        if(oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentNode.removeChild(createElm(vnode))
        }
        //2文本的比对
        if(!oldVnode.tag) {
            if(oldVnode.text !== vnode.text) {
                return oldVnode.el.textContent = vnode.text;
            }
        }
    }

}


export function createElm(vnode) {
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