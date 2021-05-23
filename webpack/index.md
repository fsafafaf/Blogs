1. webapck 是什么

一个打包编译器，将浏览器不认识的 JS 代码编译为浏览器能够运行的代码

2. 入口文件和输出路径

entry

output

3. Chunk 和 bundle 的区别

一般情况下一个 Chunk 对应着一个 bundle

当 devtool 设置为 source-map 时，一个 chunk 会多生成一个 map 结尾的 bundle

Chunk 是过程中的代码块，而 bundle 是打包输出的结果，Chunk 在构建完成后就呈现为 bundle

### Plugin 和 Loader 分别是做什么的？怎么工作？

1. Loader

模块转换器，将非 JS 模块转换为 webpack 能够识别的 JS 模块

本质上，webpack loader 将所有类型的文件，转换为应用程序的**依赖图**可以直接应用的模块

2. Plugin

扩展插件，*webpack 运行的每一个阶段，都会广播出对应的事件*，这给了插件去监听对应事件的机会

3. Compiler

对象，包含了 webpack 环境所有配置信息，包含 options、loader、plugins
在 webpack 启动的时候实例化，它是全局唯一的，可以把它理解为 webpack 的实例

4. Compliation

包含了当前的模块资源，编译生成资源
webpack 在开发模式运行时，每检测到一个文件变化，就会创建一个新的 Compliation

### 能简单描述下 webpack 的打包过程吗

1. 初始化参数: shell webpack.config.js
2. 开始编译: 初始化一个 Compiler 对象，加载所有的配置，开始执行编译
3. 确定入口：根据 entry 中的配置，找到所有的入口文件
4. 编译模块：从入口模块，调用所有的 loader，再去递归的找依赖
5. 完成模块编译：得到每个模块被翻译后的最终内容以及它们之间的依赖关系
tip: 依赖图：展示每个模块之间依赖关系
6. 输出资源：根据得到的依赖关系，组装陈一个个包含多个 module 的 chunk
7. 输出完成：根据配置，确定要输出的文件名以及文件路径