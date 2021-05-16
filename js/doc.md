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
var child1 = new Child()
child1 instanceof Child  // true
```
isPrototypeOf 刚好与 instanceof 相反，它用来判断指定对象是否存在另一个对象的原型链当中
```js
var child1 = new Child()
Child.prototype.isPrototypeOf(child1)  // true
```

8. `Object.creat(propto, propertiesObject)`

- 参数一：需要指定的原型对象
- 参数二：可选参数，给新对象自身添加新属性以及描述器