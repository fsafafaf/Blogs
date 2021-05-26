// 虚拟 dom：也就是虚拟节点，通过 JS 的 Object 对象模拟 DOM 中的节点，然后通过特定的 render 方法将其渲染成真实的 DOM 节点
// 在之前，对于页面的重新渲染都是通过操作 dom，重置 innerHTML 来完成的，而 虚拟 dom 是通过 JS 层面的计算，返回一个 path 对象
// 即补丁对象，通过特定的操作解析 path 对象，完成页面的重新渲染。
// 一：utils 方法库
const _ = new Object();

_.setAttr = function setAttr(node, key, value) {
  switch (key) {
    case "style":
      node.style.cssText = value;
      break;
    case "value":
      let tagName = node.tagName || "";
      tagName = tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        node.value = value;
      } else {
        // 如果节点不是 input 或者 textarea, 则使用 `setAttribute` 去设置属性
        node.setAttribute(key, value);
      }
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
};

_.slice = function slice(arrayLike, index) {
  return Array.prototype.slice.call(arrayLike, index);
};

_.type = function type(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|]/g, "");
};

_.isArray = function isArray(list) {
  return _.type(list) === "Array";
};

_.toArray = function toArray(listLike) {
  if (!listLike) return [];

  let list = [];
  for (let i = 0, l = listLike.length; i < l; i++) {
    list.push(listLike[i]);
  }
  return list;
};

_.isString = function isString(list) {
  return _.type(list) === "String";
};

_.isElementNode = function (node) {
  return node.nodeType === 1;
};

// 二：实现一个 Element

// 用一个 Object 去模拟 DOM 节点
{
  /* <ul id='list'>
  <li class='item'>iitem1</li>
  <li class='item'>iitem2</li>
  <li class='item'>iitem3</li>
</ul> */
}

let ul1 = {
  tagName: "ul",
  attrs: { id: "list" },
  children: [
    { tagName: "li", attrs: { class: "item", children: ["item1"] } },
    { tagName: "li", attrs: { class: "item", children: ["item2"] } },
    { tagName: "li", attrs: { class: "item", children: ["item3"] } },
  ],
};

// 可以使用构造函数进行优化
// var Element = function (tagName, attrs, children) {
//   this.tagName = tagName;
//   this.attrs = attrs;
//   this.children = children;
// }

// var el = (tagName, attrs, children) => new Element(tagName, attrs, children);

// var ul = el('ul', {id: 'list'}, [
//   el('li', {class: 'item'}, 'item1'),
//   el('li', {class: 'item'}, 'item2'),
//   el('li', {class: 'item'}, 'item3'),
// ])

// 接下来给 Element 提供一个 render 函数，将 Element 对象渲染成真实的 DOM 节点。
class Element {
  constructor(tagName, attrs, children) {
    // 如果只穿 tagName,children
    if (_.isArray(attrs)) {
      children = attrs;
      attrs = {};
    }

    this.tagName = tagName;
    this.attrs = attrs || {};
    this.children = children;
    // 设置 this.key 属性，是为了后面 list diff 做准备
    this.key = attrs ? attrs.key : void 0;
  }

  render() {
    let el = document.createElement(this.tagName);
    let attrs = this.attrs;

    for (let attrName in attrs) {
      let attrValue = attrs[attrName];
      _.setAttr(el, attrName, attrValue);
    }

    let children = this.children || [];
    children.forEach((child) => {
      let childEl =
        child instanceof Element
          ? child.render() // 若子节点也是虚拟节点，则递归进行构建
          : document.createTextNode(child); // 若是字符串，直接构建文本
      el.appendChild(childEl);
    });

    return el;
  }
}

function el(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
}

var ul = el("ul", { id: "list" }, [
  el("li", { class: "item" }, ["item1"]),
  el("li", { class: "item" }, ["item2"]),
  el("li", { class: "item" }, ["item3"]),
]);

let ulRoot = ul.render();
document.body.appendChild(ulRoot);

// 三：实现 diff 算法
// 这里我们做的就是实现一个 diff 算法进行虚拟节点 Element 的对比，并返回一个 path 对象
// 用来存储两个节点不同的地方。这也是整个 virtual dom 实现最核心的一步。而 diff 算法又包含了两个不一样的算法，一个 O(n),一个 O(max(m,n))

// 同级比较会出现 4 种情况
// - 整个元素不同，即元素被替换
// - 元素的 attrs 不同
// - 元素 text 文本改变
// - 元素顺序被替换，即元素需要重新排序
const REPLACE = 0;
const ATTRS = 1;
const TEXT = 2;
const REORDER = 3;

// diff 入口，比较新旧两颗树的差异
function diff(oldTree, newTree) {
  let index = 0;
  let patches = {}; // 用来记录每个节点差异的补丁对象
  walk(oldTree, newTree, index, patches);
  return patches;
}

// walk 遍历查找节点差异
function walk(oldNode, newNode, index, patches) {
  let currenPatch = [];

  // 如果 oldNode 被 remove 了
  if (newNode === null || newNode === undefined) {
    // 先不做操作，具体交给 listDiff 来处理
  }
  // 比较文本之间的不同
  else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) currenPatch.push({ type: TEXT, content: newNode });
  }
  // 比较 attrs 的不同
  else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // const attrsPatches = {}
    // let attrName;
    // for (attrName in oldNode.attrs) {
    //   if (
    //     newNode.attrs[attrName] !== oldNode.attrs[attrName]
    //   ) {
    //     attrsPatches[attrName] = newNode.attrs[attrName];
    //   }
    // }
    // for (attrName in newNode.attrs) {
    //   if (oldNode.attrs.hasOwnProperty(attrName)) attrsPatches[attrName] = newNode.attrs[attrName];
    // }
    //  不能使用 Objcet.keys，因为 key: undefined 也会被算成一个属性
    // if (Object.keys(attrsPatches).length > 0) currenPatch.push({ type: ATTRS, content: attrsPatches });
    let attrsPatches = diff(oldNode, newNode);
    if (attrsPatches) currenPatch.push({ type: ATTRS, content: attrsPatches });
    // 递归进行子节点的 diff 比较
    diffChildren(oldNode.children, newNode.children, index, patches);
  }
  else {
    currenPatch.push({ type: REPLACE, node: newNode})
  }

  if (currenPatch.length) {
    patches[index] = currenPatch;
  }
}

function diffAttrs(oldNode, newNode) {
  let count = 0;
  let oldAttrs = oldNode.attrs;
  let newAttrs = newNode.attrs;

  let key, value;
  let attrsPatches = {};

  // 如果存在不同的 attrs
  for (key in oldAttrs) {
    value = oldAttrs[key];
    // 当 属性被删除时, newAttrs[key] === undefined
    if (newAttrs[key] !== value) {
      count++;
      attrsPatches[key] = newAttrs[key];
    }
  }
  // 如果有新增属性
  for (key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      count++;
      attrsPatches[key] = newAttrs[key];
    }
  }

  if (count === 0) {
    return null;
  }

  return attrsPatches;
}
