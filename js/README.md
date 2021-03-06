### 1.说下继承的几种方式和优缺点

#### 0.构造函数

1. es6 之前的构造函数

```JavaScript
// 1.构造函数
function 构造函数 (name) { this.name}
// 2.构造函数原型对象
原型对象 = 构造函数.prototype
// 3.实例
var 实例 = new 构造函数()
// 原型链
实例._proto_ = 原型对象;
原型对象.constructor = 构造函数;
```

#### 1.原型链继承：将父类的实例作为子类的原型对象

`var Child.prototype = new Father()`

- 优点：子类即继承了父类的模板，又继承了父类的原型对象
- 缺点：
  - 1. 不能给父类构造函数传递参数；
  - 2. 来自原型对象的所有属性都将共享，如果不小心修改到了原型对象中的引用类型属性，那么所有创建的子类实例都会受到影响
  - 3. 如果要给子类的原型上新增属性和方法，就必须放在 `Child.prototype = new Parent()`这样的语句后面
  - 4. 无法实现多继承，因为已经指定了原型对象

#### 2.构造函数继承：在子类的构造函数内部使用`call或apply`来调用父类构造函数

`function Child () { Father.call(this) }`

- 优点：
  - 解决了原型链继承中子类实例共享父类引用对象的问题
  - 可以实现多继承
  - 创建子类时，可以向父类传递参数
- 缺点：
  - 只能继承父类的实例属性和方法，不能继承父类的原型的属性和方法（原型对象）
  - 构造继承出来的实例只是子类的实例，不是父类的实例 （实例 instanceof 父类 为 false）
  - **无法实现函数复用**，本质是复制，每次子类实例化都会重新执行一遍父类的构造函数 ，影响性能

#### 3.组合继承：

- 优点：
  - 可以继承父类实例属性和方法，也能继承父类原型属性和方法
  - 弥补了原型链继承中引用属性共享的问题
  - 可传参，可复用
- 缺点：
  - 使用组合继承时，父类构造函数会被调用两次
  - 会生成两个实例，在父类实例上产生了无用废弃的属性（子类实例中的属性和方法会覆盖子类原型（父类实例）上的属性和方法，增加了不必要的内存）

#### constructor 总结

- `constructor`是构造函数原型对象中的一个属性，正常情况下它指向的是原型对象
- 它不会影响任何 JS 内部属性，只是用来标识一下某个实例是由哪个构造函数产生的而已
- 如果我们使用了**原型链继承**或者**组合继承**无意修改了`constructor`的指向，那么处于变成习惯，我们最好把它修改为正确的构造函数

#### 4.寄生组合继承：在组合继承上改造，用 Object.create 代替父类实例来进行原型链继承

**Object.create(proto)** 可以指定新建对象的原型对象
用法：Child.prototype = Object.create(Father.prototype);
这样就不需要 Child.prototype = new Father(), 多生成一遍父类实例了

- 优点：拥有上诉所有继承方式的优点：
  - 只调用了一次父类构造函数，只创建了一份父类属性
  - 子类可以用到父类原型链上的属性和方法
  - 能够正常的使用`instanceOf`和`isPrototypeOf`方法
  - 最成熟的方案，最常用的继承方法

#### 5.原型式继承: 创建一个构造函数,构造函数的原型指向对象,然后用 new 创建一个实例,并返回这个实例,本质是个浅拷贝(Object.create())

- 优点: 在不用创建构造函数的情况下，实现了原型链继承，代码量减少了一部分
- 缺点：与原型链继承一样，多个实例共享被继承对象的属性，存在篡改的可能，也不能传参

#### 6.寄生式继承：在原型式继承的基础上再封装一层，来增强对象，之后将这个对象返回。

- 优点：没有创建自定义对象
- 缺点：同原型式继承

#### 7.class 中的继承: extends、super 都是 寄生组合继承的语法糖

- 使用了`extends`实现继承的子类内部没有`constructor`方法，则会默认添加 `constructor`和`super`
- super
  - 必须在`constructor`中调用一下`super`函数
  - `super()`是用来产生实例`this`的
  - 子类`constructor`中要使用`this`的话必须放到`super()`之后
- super 作为对象使用
  - 在子类的普通函数中`super`对象指向父类的原型对象
  - 在子类的静态函数中`super`对象指向父类
  - ES6 规定，通过`super`调用父类方法时，`super`会绑定子类的`this`
- `class B extends A ` 只要 A 是一个有 prototype 属性的函数，就能被 B 继承

#### tips：ES5 继承和 ES6 继承的区别

- 在 ES5 中的继承（如构造继承、寄生组合继承），实质上是先创造子类的实例对象 this ，然后再将父类的属性和方法添加到 this 上（使用的是 `Parent.call(this)`）
- 在 ES6 中则不是这样的，它实质是**先创造父类的实例对象 this（也就是使用 super()）,然后再用子类的构造函数去修改 this**

#### 总结

1. 原型链继承

```js
Child.prototype = new Parent();
```

2. 构造继承

```js
function Child() {
  Parent.call(this, ...args);
}
```

3. 组合继承

```js
function Child() {
  Parent.call(this, ...args);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
```

- 4. 寄生组合继承

```js
function Child() {
  Parent.call(this, ...args);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

5. 原型式继承

```js
var Child = Object.create(Parent.prototype);
```

6. 寄生式继承

```js
function createAnother(obj) {
  var clone = Object.create(obj);
  clone.fn = function () {};
  return clone;
}
```

7. class 中的继承

```js
class A extends B {
  constructor(...args) {
    super(...args);
  }
}
```

#### [参考文章](https://juejin.cn/post/6844904098941108232#heading-49)

### 2.闭包的理解？

> 使用闭包可以实现私有方法和属性，优点是可以避免全局变量的污染，缺点是闭包中被引用的变量不会被回收，使用不当会造成内存泄漏

**理解**

- 函数嵌套函数
- 内层函数可以访问到外层函数的作用域的参数和变量
- 被引用的参数和变量不会被回收

**经典使用场景**

- return 回一个函数
- 函数作为参数
- IIFE （自执行函数）
- 循环赋值
- 使用回调函数就是在使用闭包

### 3.异步加载和延迟加载？

> 异步加载：

- 动态插入 script 标签
- 通过 ajax 去获取代码，然后通过 eval 执行
- script 标签添加 defer 或者 async 属性
- 创建并插入 iframe 让它异步执行 js

> 延迟加载：

- 有些 js 代码初始化时不需要，之后的使用才可能需要

### 4.遍历对象的方法

1. for in 所有能通过对象访问的、*可枚举*的属性，包括存在实例中的属性和存在于原型中的属性（除 symbol），如果只需要实例属性，可以使用 hasOwnProperty 进行过滤
2. Object.keys(obj) 用于获取对象自身所有的*可枚举*属性，不包括原型中的属性，返回一个由属性名组成的数组，
3. Object.getOwnPropertyNames(obj)，返回一个保护对象*所有属性*的数组（不含 symbol，包含*不可枚举*属性）

### 5.Map 和 object 的区别？

- Map 可以直接获取长度（map.size）
- Map 按添加元素的顺序进行排序，而 object 根据 key 自动排序
- Map 的 key 可以是任意值，而 object 的 key 只能是 string、number
- Map 添加了迭代器，可以通过 for of 来进行遍历
- Map 频繁增删键值对性能更好，object 未对频繁增删键值对做出优化

### 6.Promise 的静态方法

- Promise.all()：所有的 promise 都成功即返回结果，有一个失败直接返回失败，返回值顺序和参数顺序保持一致
- Promise.allSettled()：等所有的 promise 都完成后返回一个对象数组，每个对象对应每个 promise 的结果
- Promise.any()：所有的 promise 都失败即返回失败，有一个成功直接返回成功，本质上和 Promise.all 相反
- Promise.race()：返回一个 promise，参数中任意一个 promise 成功或失败，返回的 promise 就会成功或者失败
- Promise.reject()：返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法
- Promise.resolve(value)：返回一个状态由 value 决定的 Promise 对象，这样该 value 就能以 Promise 对象形式使用

**原型**

- promise.finally()：返回一个 promise， 在 promise 执行结束，无论成功还是失败都会执行指定的回调函数
- promise.then()：返回一个 Promise，接受两个参数，成功和失败的回调
- promise.catch()：返回一个 promise 处理拒绝的情况

### 7.函数声明和函数表达式的区别和用法？

- 函数声明：函数声明`function`会被提升到最上方，所以无论函数在哪里声明都可以执行
- 函数表达式：声明之前无法执行

### 8.new 的具体过程

1. 创建一个空对象(即 {});
2. 链接该对象的 `__proto__` 到构造函数的原型对象;
3. 将步骤一新创建的对象作为 this 的上下文；
4. 如果该函数没有返回对象，则返回 this

### 9.介绍下 Set、Map、WeakSet 和 WeakMap 的区别

1. Set：类数组，可以存储各种数据类型，可遍历，元素唯一，NAN 只能存一个，可用作数组去重
2. Map：key、value 都可以是各种数据结构，可用 for of 遍历，for in 遍历有序
3. WeakMap: key 只能是对象，value 可以是任意数据类型，key 是对象的弱引用，不可遍历，如果没有其他引用，对象会被 gc 掉，防止内存泄漏，用作存储 dom 结构
4. WeakSet：只能存储对象，也是弱引用，不可遍历

#### 弱引用与强引用：垃圾回收机制会回收掉不被引用的对象，而被弱引用的对象， 也会被回收,

强引用

```JS
let obj = { name : 'gaofeng'}
const target = new Map();
target.set(obj, '强引用');
obj = null;   // 虽然将 obj 手动进行释放, 但是在 target 中，key 对 obj 存在强引用关系， 所以这部分内存依然没有释放出来
```

弱引用

```JS
let obj = { name : 'gaofeng'}
const target = new WeakMap()
target.set(obj, '弱引用');
obj = null;   // 在 WeakMap 结构中, target 和 obj 之间就是弱引用关系，在下次垃圾回收机制中, obj 就会被回收
```

### 10.什么是 softbind ？

原生 bind，在 bind 多次的情况下，始终以第一次 bind 为准。

### 11.什么是防抖和节流？有什么区别？如何实现？

1. 防抖：操作的间隔没有达到指定的时间不触发操作。如搜索框一直输入不触发搜索
2. 节流：一段时间内最多执行一次操作，降低函数的执行频率。如页面鼓动时计算高度函数

### 12. ['1', '2', '3'].map(parseInt) what ? why ?

[1, NAN, NAN]

1. map(parseInt(item, index))
2. parseInt('1', 0) parseInt('2', 1) parseInt('2', 3)
3. parseInt 第二个参数为 几进制的设置，该值介于 2 ~ 36 之间, 0 的话默认为 十进制，其他返回 NaN

tip: 进制计算规则：

> 例子： 101 n 进制 n** 2 \* 1 + n ** 1 _ 0 + n \*\* 0 _ 1

### 13.模块化的演化过程

- step1：文件划分方式。基于约定，每个文件是一个模块，通过 script 标签引入 html，
  - 缺点：在模块不可访问、修改模块内容，没有独立的命名框架，无法管理模块依赖关系，难以分辨成员所属的模块
- step2：命名空间方式。每个模块一个命名空间，模块内容都挂在统一给全局对象下。只解决了命名冲突的问题，其他问题依旧存在。
- step3：IIFE。模块成员都放在立即执行函数形成的私有作用域中，将需要暴露的成员挂载到全局对象上。解决了命名冲突和作用域污染的问题。
- step4：IIFE 依赖参数，依赖作为 IIFE 参数传入，依赖关系明显

### 14.CommonJS 和 ESM 对于模块循环加载处理的区别？

- CommonJS 模块是加载时执行。一旦出现某个模块被循环加载，就只输出已执行的部分，没有执行的部分不会输出。
- ESM 对于导出模块、变量、对象是动态应用，遇到模块加载命令 import 时不会去执行模块，只是生成一个指向被加载模块的引用
- tips: CommonJS 模块规范主要适用于后端 Node.js, Node.js 是同步加载模块

### 15.为什么循环依赖不好？

组件之间的相互依赖性阻碍了理解，测试和重用（您需要理解两个组件才能使用其中一个）。

这使得系统的可维护性降低，因为难以理解代码。缺乏理解会使得更改变得更加困难，并且更容易出错。同样，如果组件具有循环依赖关系，则它们将更难以测试，以为他们无法单独进行测试。循环依赖性可能会在软件系统中引起有害的副作用。当您对软件系统进行较小的更改时，可能会对其他模块产生连锁反应，从而导致全局后果（错误、崩溃等）。最后，如果两个模块紧密耦合并且互相依赖，那么单个模块的重用将变得极为困难，甚至无法实现

### 16.面向对象编程？

- 面向对象 (OOP) 是一种计算机编程架构，OOP 达到了软件工程三个主要目标：重用性、灵活性、拓展性。
- 面向对象程序设计方法是尽可能模拟人类的思维方式，使得软件的开发方法与过程尽可能接近人类认识世界、解决现实问题的方法和过程，**把客观世界中的实体抽象为问题域中的对象**。
- 特点：封装性、继承性、多态性。

### 17.面向对象程序设计对于面向过程程序设计的优点？

1.  数据抽象的概念可以在保持外部接口不变的情况下修改内部实现，从而减少甚至避免对外界的干扰。
2.  通过继承减少大幅冗余代码，并可以方便拓展现有代码，提高编码效率，降低出错概率，提升软件可维护性。
3.  结合面向对象分析、面向对象设计，允许将问题域中的对象直接映射到程序中，减少软件开发过程中间环节的转换过程。
4.  通过对对象的辨别、划分可以将软件系统分割为若干相对为独立的部分，在一定程度上更便于控制软件复杂度。
5.  以对象为中心的设计可以帮助开发人员从静态（属性）和动态（方法）两个方面把握问题，从而更好地实现系统。
6.  通过对象的聚合、联合可以在保证封装与抽象的原则下实现对象在内在结构以及外在功能上的扩充，从而实现对象由低到高的升级

### 18. ECMAScript 和 JavaScript 的区别？

- ECMAScript 是形成 JavaScript 语言基础的脚本语言
- ECMAScript 是由国际标准组织以 ECMA-262 和 ECMA-402 规范的形式进行标准化的。
- JavaScript 遵循 ECMAScript 标准，JavaScript 是 ECMAScript 的实例
- ECMAScript 是基于 JavaScript 的，Javascript 也是基于 ECMAScript 的，两者密不可分

### 19.async/await 和 promise 相比较？

**见 promise 专题**

### 20.解释一下原型链和原型对象

- 原型链：javaScript 常被描述为一种基于原型的语言，每个对象拥有一个原型对象，对象以其原型为模板，从原型继承方法和属性，原型对象也可能拥有原型，并从中继承方法和属性，一层一层，以此类推，这种关系常被称为原型链，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。
  > 每个 JS 对象都有一个 `__proto__` 属性，它指向着该对象的原型，原型上也有`__proto__`，同样指向它的原型，直到 `__proto__` 指向 object.prototype。这样一个链表，就是原型链)
- 原型对象：原型对象是一个内部对象`[[prototype]]`，可以使用 Object.getPrototypeof() 或者`__proto__`访问

### 21.hash 路由和 browser（bro zhe） 路由的优缺点？

1. hash

- 优点：
  - 实现简单，兼容性好（兼容到 ie8）
  - 绝大多数前端框架均提供了 hash 路由实现
  - 不需要服务器端进行任何设置和开发
  - 除了资源加载和 Ajax 请求不会发起其他请求
- 缺点
  - 对于部分需要重定向的操作，后端无法获得 hash 部分内容，如 oauth 验证。
  - 服务器端无法准确跟踪前端路由信息
  - 对于需要锚点的功能需求会与路由机制冲突

2. browser

- 优点：
  - 重定向不会丢失 url 的参数，后端可以拿到
  - 后端可以准确跟踪路由信息
- 缺点：
  - 兼容性不如 hash 路由（兼容到 IE10）
  - 需要后端支持，每次返回 index.html

### 22.defer 和 async 的使用场景和区别？

相同点：异步加载
不同点：

- async 加载（fetch）完成后立即执行（execution），因此可能会阻塞 DOM 解析；（GA 统计）
- defer 加载（fetch）完成后延迟到 DOM 解析完成后才会执行（execution），但会在事件 DomContentLoaded 之前（多个 js 有关联）

### 23.TypeScript 中 type 和 interface 有什么区别？

- type 是类型别名不产生新类型
- interface 通过 extend 拓展；type 通过 & 拓展
- interface 可以自动合并（同名接口自动合并）；type 不行（同名 type 报错：重复定义）
- type 可以声明基本类型别名（type gaofeng = string），联合类型（type gaofeng = (string | number)），元组类型（type gaofeng = [string, number]），而 interface 不可以

### 24. this 指向

> 在 es5 中, this 永远指向最后调用它的那个对象
> 箭头函数的 this 始终指向函数定义时的对象, 而非执行时，如果有嵌套的情况，则指向最近的一层对象

例 1：

```JS
var name = "windowName";
var a = {
  name: "cherry",
  fn: function () {
    console.log(this.name);
  },
};

a.fn(); // cherry
window.a.fn(); // cherry

var f = a.fn;
f(); // windowName, 因为 a.fn 并没有调用 fn 最后还是在 window.fn() 中进行调用

```

例 2：

```JS
var name = 'windowName';
function fn() {
  var name = 'Cherry';
  innerFunction();
  function innerFunction() {
    console.log(this.name)
  }
}

fn()  // windowName
```

例 3：

```JS
var name = "windowsName";

var a = {
  name : "Cherry",
  func1: function () {
    console.log(this.name)
  },
  func2: function () {
    setTimeout(  function () {
        this.func1()
    },100);
  }
};

a.func2()     // this.func1 is not a function
```

函数调用的方法一共有 4 种

1. 作为一个函数调用: a() -> this 指向 window
2. 函数作为方法调用: a.fn() -> this 指向调用对象
3. 使用构造函数调用函数: new a() -> this 指向 返回的这个对象
4. 作为函数方法调用函数(call, apply); -> 指向传入的 obj
5. 备注：匿名函数的 this 永远指向 window, 匿名函数都是自执行的，就是在后面加 (), 例如 setTimeout

### 25. 赋值、浅拷贝和深拷贝

- 赋值：赋值给一个新的对象时，赋的是该对象在栈中的地址，而不是堆中的数据，两个对象指向同一个存储空间
- 浅拷贝：重新在栈中创建内存，两个对象的基本类型互不影响，但是前后对象的引用类型共享一个内存，相互影响
- 深拷贝：从栈中新开辟一个新的区域存放对象，对对象的子对象进行递归拷贝，拷贝后前后对象互不影响

#### 浅拷贝实现方式

- Object.assign()
- lodash.clone
- 拓展运算符
- Array.prototype.concat()
- Array.prototype.slice()

#### 深拷贝实现方式

- JSON.parse(JSON.stringify(obj)) : **可以实现对象和数组深拷贝，但是处理不了正则和函数**
- lodash.cloneDeep
- 手写递归方法：遍历对象、数组，直到里面全是基础数据类型，再进行复制

手写深拷贝需要注意**循环引用**的问题，

> 见 customRealize/cloneDeep.js

### 26. 使得 `a == 1 && a == 2 && a == 3`

对象进行 == 比较，会使用`ToPrimitive` 规则(调用：valueOf、toString、[Symbol.toPrimitive] 优先级由低到高)进行转换

```JS
const a = {
  value: [1,2,3],
  valueOf: function() {return this.value.shift()}
}
```

### 27. 用原生 JS 实现一下开根号函数

二分迭代法求 n 开根后的值:
设定`mid = (left + right) / 2`, letf = 0 righ = n ,判断 mid*mid 与 n 的差别，等于输出，大于，则设置 right = mid, 小于则设置 left = mid, 进行循环计算，最终得到一个无限接近值

```JS
// initNum 开根数 保留 saveNum 位小数
function sqrt(initNum, saveNum) {
  let leftNum = 0;
  let rightNum = initNum;
  let mid = (leftNum + rightNum) / 2;
  for (let i = 0; i <= 20; i++) {
    let result = mid * mid;
    if (result === initNum) return mid.toFixed(saveNum);
    if (result > initNum) {
      rightNum = mid;
      mid = (leftNum + rightNum) / 2;
    } else {
      leftNum = mid;
      mid = (leftNum + rightNum) / 2;
    }
  }
  return mid.toFixed(saveNum);
}
```
