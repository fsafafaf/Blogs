#

## 图片性能优化

- 选择合适的图片格式
- 图片压缩
- 使用雪碧图
- 使用 iconfont
- 使用 base64 格式
- 使用 css 代替图片
- 图片懒加载
- 图片预加载
- 响应式图片加载
- 渐进式图片

### 选择合适的图片格式

- JPG
  - 有损压缩，可以大大减少图片的体积，一般 60%
  - 适用于色彩丰富的图片，不支持透明
  - 无兼容性问题
  - 不支持透明
  - 常用来作为大的背景图、轮播图或者 Banner 图（网页广告图）出现
- PNG
  - 色彩更加丰富，而且支持透明性
  - 无损压缩
  - 体积太大了
  - 常用来呈现小的 Logo、颜色简单且对比强烈的图片或背景
- GIF
  - 最多支持 256 种颜色的 8 位无损图片,支持透明
  - 文件体积通常很小,
  - 支持动画，适合展示一些无限循环的动画
  - 展示只有简单色彩的图片非常合适
- WebP
  - 集多种图片文件格式优点于一身
  - 但是浏览器支持不够普遍，尤其是移动端 IOS 系统基本不支持

### 图片压缩

图片太大会导致加载时间过长，在保证清晰度的情况星啊，可适当对图片大小进行压缩

**有损压缩**
有损压缩在压缩的过程种，损失了一部分图片的信息，即降低了图片的质量，这是不可逆的。（jpg）

**无损压缩**
无损压缩指的是在压缩过长中，图片的质量没用如何损耗，可从压缩图片中恢复出原图片，压缩算法对图片的所有数据进行编码压缩，既能保持质量，又能降低体积(png,gif)

#### 工具压缩

- [tinypng](https://tinypng.com/)
- [智图压缩](https://zhitu.isux.us/)
- [squoosh](https://squoosh.app/)
- [compressor](https://compressor.io/)

#### webpack 压缩

工程化的项目可以在 webpack 里面配置 `image-webpack-loader` 进行图片压缩

1. 安装依赖

```shell
npm install --save-dev imapge-wepback-loader
```

2. 配置 webpack

```JS
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:7].[ext]'
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50,
              },
              optipng: {
                enabled: true,
              }
            },
            pngquant: {
              quality: [0.5, 0.65],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            }
          }
        ]
      }
    ]
  }
}
```

### 使用雪碧图

雪碧图, CSS Sprites, 国内也叫 CSS 精灵, 是一种 CSS 图像合成技术, 主要用于小图片显示.

浏览器请求资源的时候, 同源域名请求资源的时候有最大并发限制, chrome 为 6 个, 比如有 10 个相同 CDN 域名的小图片,那么需要发起 10 次请求，分两次并发. 第一次请求返回后，再发起第二次并发。如果使用雪碧图，将 10 个小图片合成一个大图片，只需要发起一个请求即可。
**减少了服务器压力，减少并发，减少请求次数**

#### 优点

把诸多小图片合成一张大图，利用`backround-position`属性值来确定图片呈现的位置，可以有效的较少请求个数，而且不影响开发体验，使用构建插件可以做到对开发者透明。
适用于页面图片多且丰富的场景。

#### 缺点

生成的图片体积较大，减少请求个数的同时也增加了图片的大小，不合理拆分将不利于并行加载

#### 合成雪碧图

在 weboack 中，有对应的插件提供了自动合成雪碧图的功能并且可以自动生成对应的样式文件 `webpack-spritesmith`, 使用方法如下

```JS
var path = require('path');
var Spritesmith = require('webpack-spritesmith');

module.exports = {
  plugins: [
    new Spritesmith({
      src: {
        cwd: path.resolve(__dirname, 'src/ico'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl'),
      },
      apiOptions: {
        cssImageRef: '~sprite.png',
      }
    })
  ]
}
```

通过上面配置就能将 `src/ico` 目录下的所有 png 文件合成雪碧图，并且输出到对应目录，同时还可以生成对应的样式文件，样式文件的语法会根据你配置的样式文件的后缀动态生成

### 使用 iconfont

iconfont（字体图标）, 即通过字体的方式展示图标，多用于渲染图标、简单图形、特殊字体等

#### 优点

- 像使用字体一样，设置大小、颜色及其他样式，不失真
- 轻量，易修改
- 有效减少 HTTP 请求次数

### 使用 base64 格式

原理：将图片转换为 base64 编码字符串 inline 到页面或 css 中

#### 优点

- 提升性能：网页上的每一个图片，都需要消耗一个 http 请求下载而来的，图片的下载始终都要像服务器发出请求，要是图片的下载不用向服务器发出请求, base64 可以随着 HTML 的下载同时下载到本地，减少 https 请求
- 加密: 让用户一眼看不出图片内容，只能看到编码
- 方便引用：在多个文件同时使用某些图片时，可以把图片转为 base64 格式的文件，把样式放在全局中，比如 common.css, 以后再用的时候就可以直接加雷鸣，而不需要多层找文件路径，会提升效率

但是需要注意的是：如果图片比较大，图片的色彩层次会比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。

base 64 化最常见的就是在 url-loader 中使用

```JS
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          
        }
      }
    ]
  }
}
```