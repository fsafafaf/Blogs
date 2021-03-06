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
          limit: 10240,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        }
      }
    ]
  }
}
```

这样就能将项目中小于 10kb 的图片转化为 base64 应用到页面中

### 使用 CSS 代替图片

比如实现修饰效果，如半透明、边框、圆角、阴影、渐变等，在当前主流浏览器中都可以用 CSS 达成，这样减少图片的请求，达到优化的目的

#### 缺点

- 受限于 css 的浏览器兼容性
- 对于较复杂的图案就无能为力了，写也麻烦，开发成本大

### 使用 CDN 图片

CDN 全称 Content Delivery Network, 即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络阻塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术

> 以前买火车票大家只能去火车站买，后来我们买火车票哭在楼下的火车票代售点买

#### 基本原理

广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，当用户访问网络时，利用全局辅助技术奖用户的访问指向距离最近的工作正常的缓存服务器上吗，由缓存服务器直接响应用户请求

#### 基本思路

CDN 的基本思路是尽可能避开互联网上可能影响数据传输熟读和稳定性的瓶颈和环节，使内容传输的更快、更稳定。
其目的是使用户可就近取得所需内容解决 Internet 网络拥挤的状况，提高用户访问网站的响应速度

#### CDN 的优势

- CDN 节点解决了跨运营商和跨地域访问的问题，访问延时大大降低；
- 大部分请求在 CDN 边缘节点完成，CDN 起到了分流作用，减轻了源站的负载

### 图片懒加载

懒加载是一种网页性能优化的方式，在进入页面的时候，只请求可是区域的图片资源

- 减少资源的加载，页面启动只加载首屏的图片，这样能明显减少服务器的压力和流量，也能减少浏览器的负担
- 防止并发加载的资源过多二阻塞 js 的加载，影响整个网站的启动，影响用户体验
- 浪费用户的流量，有些用户并不想全部看完，全部加载会耗费大量流量

#### 原理

懒加载的原理就是战士不设置图片的 src 属性，而是将图片的 url 影长起来，比如卸载 data-src 里面，等当前图片到了可是区域再讲图片真是的 url 放到 src 属性里，从而实现图片的延迟加载

```JS
function lazyload() {
  let viewHeight = document.documentElement.clientHeight || window.innerHeight; //获取可视区高度
  let imgs = document.querySelectorAll('img[data-src]');  // 获取所有有 data-src 属性的 img 标签
  imgs.forEach((item, index) => {
    // data- 开头的属性都会存储在 dataset 里面
    if (item.dataset.src === '') return;

    // 用于获取页面中某个元素的左，上，右，下分别相对浏览器视窗的位置
    let rect = item.getBoundingClientRect();
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      item.src = item.dataset.src;
      item.removeAttribute('data-src');
    }
  })
}

// 可以使用节流优化一下
window.addEventListener('scroll', lazyload);
```

### 图片预加载

指在一些需要展示大量图片的网站，将图片提前加载到本地缓存中，从而提升用户体验

常用有两种方式，一种是隐藏在 css 的 background 的 url 属性里，一种是通过 javascript 的 Image 对象设置实例对象的 src 属性实现图片的预加载

#### 1. 用 css 和 js 实现预加载

```css
#preload {
  background: url(http://domain.tld/image.png) no-repeat -9999px -9999px;
}
```

通过 css 的 background 属性将图片预加载到屏幕之外，当这些图片在 web 页面的其他地方用到时，浏览器在渲染过程就会使用预加载（缓存）的图片
优化：使用该方法加载图片会和页面的其他内容一起加载，增加了页面的整体加载时间，解决这个问题可以使用 JS 来推迟预加载的时间，直到页面加载完毕

```JS
function preloader() {
  if (document.getElementById) {
    document.getElementById('preload').style.background =
     'url(http://domain.tld/image.png) no-repeat -9999px -9999px'
  }
}

// window.onload = func  func 会在页面加载完毕后执行
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload()
      } else {
        func()
      }
    }
  }
}
```

#### 2. 通过 JS 实现预加载

```JS
function proloader() {
  if (document.images) {
    var img = new Image();
    img.src = 'http://domain.tld/path/to/image-001.gif'
  }
}
function addloadEvent(func) {
  var oldload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      if (oldload) {
        oldload()
      } else {
        func()
      }
    }
  }
}
```

### 响应式图片加载

在不同分辨率的设备上显示不同尺寸的图片，避免资源的浪费
常用的方法: css3 的媒体查询（media query）

```CSS
@media screen and (min-width: 1200px) {
  img {
    background-image: url('1-png');
  }
}
@media screen and (min-width: 992px) {
  img {
    background-image: url('2-png');
  }
}
@media screen and (min-width: 768px) {
  img {
    background-image: url('3-png');
  }
}
```

此外，还可以使用 HTML5 的 picture 属性进行响应式处理。方法如下：

1.  创建 picture 标签
2.  放置多个 source 标签，以指定不同的图像文件名，进而根据不同的条件进行加载
3.  添加一个回退的元素

```HTML
<picture>
  <source srcset="src/img/1.png" media="(min-width: 1200px)" />
  <source srcset="src/img/2.png" media="(min-width: 992px)" />
  <source srcset="src/img/3.png" media="(min-width: 768px)" />
  <img src="src/img/4.png" />
</picture>
```

tip: 需要注意：现在很多浏览器对于 picture 这个标签还不支持，使用的时候需要加以注意

### 渐进式图片

渐进式图片的意思是在高画质图像加载完之前先显示低画质版本。低画质版本由于画质低、压缩率高，尺寸很小，加载很快。在两者之间我们可以根据需求显示不同画质的版本。

#### 优点

渐进式图片可以让用户产生图片加载边框的印象。用户不再盯着一片空白区域等待图片加载，而能看到图像变得越来越清晰，这样对用户体验也是友好的

### 总结

1. 选择合适的图片格式和压缩大图，可从根源上解决大图加载过慢的问题
2. 使用雪碧图、iconfont、base64、css 代替图片等可以减少图片 http 请求，提高页面加载速度
3. 使用 CDN 图片可以达到分流的效果，减少服务器压力
4. 图片懒加载、预加载、渐进式加载等可不同程度减少白屏时间，提高用户体验

### 参考文章

[前端性能优化-图片篇](https://juejin.cn/post/6965761736083243044#heading-6)
