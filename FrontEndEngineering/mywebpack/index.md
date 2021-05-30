# 实现一个自己的打包根据

webpack

本质上， webapck 是一个现代 JavaScript 应用程序的静态模块打包器。

当 webpack 处理应用程序时，它会递归的构建一个依赖关系图，其中包括应用程序的每个模块，然后将这些模块打包成一个或多个 bundle

1. Esmodule

```js
import axios from "axios";

export default axios;
```

## 概览

1. 找到一个入口文件
2. 解析这个入口文件，提取它的依赖
3. 解析入口文件依赖的依赖，递归的去创建一个文件间的依赖图，描述所有文件的依赖关系
4. 把所有文件打包成一个文件

## 开始开发！！！

1. 新建几个 js 源文件

2. 肉眼观察三个文件的依赖关系

entry 依赖 message， message 依赖 name

entry.js -> message.js -> name.js

3. 开始编写自己的打包工具，mywebpack.js

```js

```

4. 分析 ast,思考如何能够解析出 entry.js 的依赖

4.1 File -> program
4.2 program -> body 里面是我们各种语法的描述
4.3 ImportDeclaration 引入的声明
4.4 ImportDevlaration source 属性，souce.value 就是引入文件的地址 './message.js'

5. 生成 entry.js 的 ast

babylon 一个基于 babel 的 js 解析工具，

6. 基于 AST，找到 entry.js 的 ImportDevlaration

7. 获取 entry.js 依赖

8. 优化 createAsset，使其能够区分文件

因为要获取所有文件的依赖，所以咱们需要一个 id 来标识所有文件

这里咱们用一个简单的自增 number，这样遍历的每个文件 id 就唯一了。

先获取到 entry.js

9. 获取到单个文件的依赖了，接下来尝试建立依赖图

新增一个函数 createGraph，把 createAsset 调用移入 createGraph

entry 的路径需要是动态的，所以 createGraph 接收一个参数 entry

10. 上面存储的都是相对路径，想办法吧他们转为绝对路径

有了绝对路径，我们才能获取到各个文件的 asset

11. 我们需要一个 map，记录 depend 中的相对路径 和 childAsset 的对应关系

因为我们需要做依赖的引入，需要这样的一个依赖关系

12. 开始遍历所有依赖文件

```js
function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const allAsset = [mainAsset];

  for (let asset of allAsset) {
    const dirname = path.dirname(asset.filename);

    asset.mapping = {};

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);

      const childAsset = createAsset(absolutePath);

      asset.mapping[relativePath] = childAsset.id;

      allAsset.push(childAsset);
    });
  }
  return allAsset;
}
console.log(allAsset)[
  ({
    id: 0,
    filename: "./source/entry.js",
    dependencies: ["./message.js"],
    mapping: { "./message.js": 1 },
  },
  {
    id: 1,
    filename: "source/message.js",
    dependencies: ["./name.js"],
    mapping: { "./name.js": 2 },
  },
  { id: 2, filename: "source/name.js", dependencies: [], mapping: {} })
];
```

这个输出就是一直提到的依赖图！！！

13. 新增一个方法 bundle

14. 创建整体的结果代码

因为他需要接收参数，且需要立即执行，所以用一个自执行函数来包裹。

自执行函数接收的参数是 module

15. 编译所有的源代码

16. 把编译后的代码，加入到 result 中

CommonJS 的规范要求

1. module 变量代表当前模块

这个变量是一个对象，它的 exports 属性是对外的接口，module.exports，加载某个模块，其实就是加载
