1. Number 相关语法糖

```JavaScript
/** && 代替 if */
if(creat) {creat.add()}
// 等价于
creat && crear.add()
// && 的作用： 在操作数中找到第一个虚值表达式并返回，如果没有虚值则返回最后一个真值表达式

/** 使用 + 或一元运算符是将字符串转为数字最快的方法
var a = '1.23'
+a // 1.23
/** 取整 */
const number = Math.random()
1. 向下取整 Math.floor(number);
2. 取整 parInt(number)
3. 向上取整 Math.ceil(number)
4. 四舍五入 Math.round(number)
5. 与0按位或 number | 0
6. 与0按位异或 number ^ 0
7. 两次的按位取反 ~~number
// 注意：5 6 7 原理是在按位操作时，操作数会被强制转换为一个有符号的32位整数，所以自然剔除了小数部分。但同时意味着这种方法也存在局限性：按位操作时，可操作的数为±2^31-1之间。

```

2. 字符串模板传参

```JavaScript
const get = (a, b, c) => {
  console.log("a", a);
  console.log("b", b);
  console.log("c", c);
}
const [a, b] = [1, 2];
get`This number is ${a}, two number ${b} xo`
// a: ["This number is", ", two number ", "xo"]
// b: 1
// c: 2
```

3. typeof [1,2,3] === 'object'

4. `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

5. 在对象上，如果 `toString()` 方法没有被覆盖的话，返回 `[object, type]` type 为对象的类型

6. class

- class 中的静态方法的 `this` 指向 class
- class 定义不存在 function 一样的定义提升, 必须在使用前定义
- typeof <class> // function

7. `instanceof` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
   例：

```js
var child1 = new Child();
child1 instanceof Child; // true
```

isPrototypeOf 刚好与 instanceof 相反，它用来判断指定对象是否存在另一个对象的原型链当中

```js
var child1 = new Child();
Child.prototype.isPrototypeOf(child1); // true
```

8. `Object.create(propto, propertiesObject)`

- 参数一：需要指定的原型对象
- 参数二：可选参数，给新对象自身添加新属性以及描述器

9. `arguments` 是一个对应于传递给函数(**非箭头函数**)的参数的类数组对象。

```JS
function fn(a, b, c, d) {
  console.log(arguments);
}
fn(1,2,3,4) // Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

10. `Number.toFixed()`

JS 中的 `toFixed` ，采取的是四舍六入，末尾为 5，有时候会进一位，有时候不会进，（原理？？？），但是 5 后的后一位有数字的话，就会进一位

```JS
var [a, b, c] = [1.12355, 101.12355, 99.12355];
a.toFixed(4); // 1.1236
b.toFixed(4); // 1.1235
c.toFixed(4); // 1.1235
```

解决方法：自定义 toFixed 方法，利用 5 后面还有数字则进一位的特性进行处理 --- [实现](./code/myFixed.ts)

11. `void 0` 与 `undefined` 的区别

- void 后面加任何表达式都是返回 undefined，所以用 void 0 代替 undefined 是最节省字节
- 虽然 undefined 在全局对象是一个只读属性，不能被重写，但是在局部作用域中，还是可以被重写的
- 使用 `a === void 0` 来判断是否值为 undefined, 而不要直接使用 undefined 来进行判断，因为 undefined 可能被重写

12. 什么情况下 `a === a-1`

- a 为 正负 Infinity, Infinity 是一个 Number 类型，表示无穷大
- 超过 JS 精度的大数 Number 都可以满足（例如 17 位以上的数字）

13. 使用 var、let、const 定义变量声明的是局部变量，直接进行变量赋值是声明全局变量

```JS
function fn() {
  var a = 1;
  c = 2;
}
fn();
console.log(a)  // 报错
console.log(c)  // 2
```

14. `new Number(3) === 3`为 false，因为 `new Number`生成的是一个对象，其身上不仅有值，还有一堆额外的功能

15. 懒加载（延迟加载）和预加载

- 懒加载：指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式
  - 为什么使用懒加载？
  - 提高用户体验
  - 减少无效资源的加载
  - 防止并发加载的资源过多会阻塞 JS 的加载
- 预加载：将所需的资源提前请求加载到本地，这样在后面需要用到时就可以直接从缓存中获取对象
  - 为什么用预加载：在页面完全加载完之前，先加载主要内容，减少页面一直为空白的情况
  - 实现预加载的几个方法
    - 使用 html 标签 `<img src='http://xxxx.com/xxx.jpg'>`
    - 使用 Image 对象
    - 使用 XMLhttpRequest 对象
- 懒加载和预加载的区别
  - 一个是提前加载，一个是不加载或者延后加载
  - 懒加载对服务端前端有一定的缓解压力作用，而预加载则增加了服务器前端的压力

16. 同步加载和异步加载

- 同步加载：阻塞模式，事件一个接一个的加载，所以 srcpit 标签放在最后，防止阻塞页面的加载
- 异步加载：非阻塞模式，在下载执行 JS 的同时，还会继续进行后续的页面处理
  - 动态添加 script 标签
  - 通过 Ajax 动态获取 JS 代码，并通过 eval() 执行
  - script 标签添加 async、defer
    - async 加载和执行都是异步的
    - defer 加载是异步的，执行需要在所有元素解析完成之后、DOMContentLoaded 事件触发之前执行
  - iframe 标签

17. 判断 a == b, 如果 a、b 一个是 object 一个是 string/number, 则是拿 object.toString() 与 另一个值进行 == 比较

18. **包装类型** Boolean、Number、String

包装类型和原始类型的区别
```JS
true === new Boolean(true); // false
123 === new Number(123); // false
'ConardLi' === new String('ConardLi'); // false
console.log(typeof new String('ConardLi')); // object
console.log(typeof 'ConardLi'); // string
```
为什么增加包装类型：因为基本类型只存在于一行代码的执行瞬间，然后立即销毁，这意味着我们不能在运行的时为基本类型添加方法和属性

19. null == undefined 比较结果是 true, 除此之外，null、undefined 和其他任何结果的比较值都为false

20. while、 for、 for in 三种循环方式的执行效率由高到低，做算法题时，最好用 while 实现一个 forEach, 然后用 Object.keys 来达到 for in
> while 实现 forEach

21. 函数式编程被人诟病的点：复用性提升后带来的额外开发成本

在具体业务中使用函数式编程，需要权衡 React 组件的复用性和开发体验，如果组件被拆分的过于细，固然复用性会提升，但是文件数量会增加，对应的文档和沟通成本也会增加。