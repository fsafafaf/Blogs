# Enzyme

React 的 JS 测试工具，使 React 组件的输出更加容易

## 常用函数

- simulate(event, mock)：用来模拟事件触发，event 为事件名称，mock 为一个 event object；
- instance()：返回测试组件的实例；
- find(selector)：根据选择器查找节点，selector 可以是 CSS 中的选择器，也可以是组件的构造函数，以及组件的 display name 等；
- at(index)：返回一个渲染过的对象；
- get(index)：返回一个 react node，要测试它，需要重新渲染；
- contains(nodeOrNodes)：当前对象是否包含参数重点 node，参数类型为 react 对象或对象数组；
- text()：返回当前组件的文本内容；
- html()： 返回当前组件的 HTML 代码形式；
- props()：返回根组件的所有属性；
- prop(key)：返回根组件的指定属性；
- state()：返回根组件的状态；
- setState(nextState)：设置根组件的状态；
- setProps(nextProps)：设置根组件的属性；

## 使用

为了方便讲解测试用例，我们首先新建一个 enzyme.js 的测试文件。

```js
import react from "react";

const Example = (props) => {
  return (
    <div>
      <button>{props.text}</button>
    </div>
  );
};

export default Example;
```

### 浅渲染 shallow

Shallow Rendering 用于将一个组件渲染成虚拟 DOM 对象，但是只渲染第一层，不渲染所有子组件，所以处理速度特别快。

并且它不需要 DOM 环境，因为根本没有加载进 DOM

```js
import React from 'react'
```

### mount

真实渲染 React 组件
