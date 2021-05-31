1. webpack 优化相关

  > 使用更新的 webpack

    1. 缩小构建目标, loader 的 test 配置指定的文件类型， include 指定查找路径，exclude 指定排除路径
    2. babel-loader 中 cacheDirectory 设置为 true, 将编译过的文件缓存起来
    3. 使用 terser-webpack-plugin 插件，代码压缩（webpack 5 中默认使用多线程运行以提高构建速度）
    4. 按需加载，异步导入，配合 react 的 React.lazy, suspense 实现，可减少包体积，优化首屏加载速度