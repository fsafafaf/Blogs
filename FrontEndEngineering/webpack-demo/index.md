# webapck 是什么

webapck 是一个现代 JavaScript 应用程序的静态模块打包器。

当 webpack 处理应用程序时，它会递归的构建一个依赖关系图，其中包括应用程序的每个模块，然后将这些模块打包成一个或多个 bundle

**核心概念**

- 入口（entry）
- 出口（output）
- loader
- 插件（plugin）

## 1. Webpack 中的 module 指的是什么

webpack 支持 ESModule, CommonJS, AMD, Assests(image,font,video,audio,json)

1. ESM

- 关键词 export，允许 ESM 中内容暴露给其他模块
- 关键词 import 导入其他 ESM 中暴露的模块

tip: package.json 中， type: module -> ESM type: commonjs -> CommonJS

2. CommonJS

module.exports, 允许将 CommonJS 中的内容暴露给其他模块

require


tip:入口文件和输出路径

**entry**：指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始, 默认值为`./src`

**output**：告诉 webpack 在哪输出打包好的 bundles，以及如何命名这些文件，默认值为`./dist`

```JS
const path = require('path');

module.exports = {
  entry: './package/field/app.js',
  output: {
    // __dirname 当前绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-wepbakc.bundle.js'
  }
}
```
## 2.webpack modules, 如何表达自己的各种依赖关系？

- ESM import 语句
- CommonJS require
- AMD define require
- css/sass/less @import

## 3.我们常说的 chunk 和 bundle 的区别是什么？（重点）

1. Chunk

chunk 是 wepback 打包过程中 Modules 的集合，是**打包过程中**的概念

Webpack 的打包是从一个入口模块开始，入口模块应用其他模块，其他模块引用其他模块。。。
Webpack 通过引用关系逐个打包模块，这些 modules 就形成了一个 chunk

如果有多个入口模块，可能会产出多条打包路径，每条路径都会形成一个 chunk

2. Bundle

最终输出的一个或多个文件

3. chunk 和 bundle 的关系是什么？

_chunk 是过程，bundle 是结果_
大多数情况下，一个 chunk 会生成一个 bundle, 但是也有例外

如果加了 sourcemap，一个 entry，一个 chunk 对应两个 bundle

Chunk 是过程中的代码块，而 bundle 是打包输出的结果，Chunk 在构建完成后就呈现为 bundle


## 4.Plugin 和 Loader 分别是做什么的？怎么工作？

### 1. Loader

模块转换器，将非 JS 模块转换为 webpack 能够识别的 JS 模块

本质上，webpack loader 将所有类型的文件，转换为应用程序的**依赖图**可以直接应用的模块

在 webpack 中配置 loader 有两个目标

1. `test`属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件
2. `use`属性，表示进行转换使用哪个 loader

```JS
module.exports = {
  output: {
    filename: 'my-first-webpack.bunle.js',
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
}
```

### 2. Plugin

扩展插件，_webpack 运行的每一个阶段，都会广播出对应的事件_，这给了插件去监听对应事件的机会

用法：在 webpack 配置中，向`plugin`属性传入`new`实例

```JS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpcak = require('wbpack'); // 访问内置的插件

const config = {
  ...
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './scr/index.html'})
  ]
}

module.exports = config;
```

### 3. Compiler

对象，包含了 webpack 环境所有配置信息，包含 options、loader、plugins
在 webpack 启动的时候实例化，它是全局唯一的，可以把它理解为 webpack 的实例

### 4. Compliation

包含了当前的模块资源，编译生成资源
webpack 在开发模式运行时，每检测到一个文件变化，就会创建一个新的 Compliation

## 5.能简单描述下 webpack 的打包过程吗

1. 初始化参数: shell webpack.config.js
2. 开始编译: 初始化一个 Compiler 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找到所有的入口文件
4. 编译模块：从入口模块开始，调用所有的 loader，再去递归的找依赖
5. 完成模块编译：得到每个模块被翻译后的最终内容以及它们之间的依赖关系
   tip: 依赖图：展示每个模块之间依赖关系
6. 输出资源：根据得到的依赖关系，组装成一个个包含多个 module 的 chunk
7. 输出完成：根据配置，确定要输出的文件名以及文件路径
