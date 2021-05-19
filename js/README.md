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

1. for in 遍历对象除 symbol 以外的可枚举对象
2. Object.keys(obj)，返回对象自身可枚举属性名称的数组
3. Object.getOwnPropertyNames(obj)，返回一个保护对象所有属性的数组（不含 symbol，包含不可枚举属性）

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