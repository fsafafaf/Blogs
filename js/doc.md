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

9. `arguments` 是一个对应于传递给函数的参数的类数组对象。

```JS
function fn() {
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

12. 什么情况下 `a === a-1`

- a 为 正负 Infinity, Infinity 是一个 Number 类型，表示无穷大
- 超过 JS 精度的大数 Number 都可以满足（例如 17位以上的数字）