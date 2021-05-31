// ES6 之前的封装
//1.
// function Cat (name, color) {
//   var xing = 'xing';
//   var wei = 'wei';
//   this.name = name;
//   this.color = color;
// }

// Cat.jump = function () {}

// Cat.prototype.jump = function () {console.log('起跳')}

// var gf = new Cat('gf', 'white')
// gf.jump()

// 静态方法
// Promise.all()、 Promise.race()、Object.assign()、Array.from()
// 实例方法
// push、shift 等等 Array.prototype.push

// 3.实例自身属性和定义在构造函数原型对象中的属性的区别
// //  自身属性
// function Cat(name) {
//   this.name = name
// }
// // 原型对象中的属性
// Cat.prototype.prototypeProp = '我是构造函数原型对象上的属性'
// var cat = new Cat('gg');
// console.log(cat) // Cat {name: "guaiguai"}
// console.log(cat.prototypeProp) // 我是构造函数原型对象上的属性

// 由此可见，直接在构造函数中， this 赋值的，它能直接让实例拥有这个属性
// 而 prototypeProp 这些定义在构造函数原型上的，不能出现在实例上，但是实例却能访问和调用它们

// 结论：定义在构造函数原型对象上的属性和方法虽然不能直接表现在实例对象上，但是实例对象却可以访问或者调用它们

// 4. 获取实例对象的属性名
// - for ... in...  获取实例对象自身属性和原型链上的属性
// - Object.keys()、 Object.getOwnPropertyNames()  只获取实例对象自身的属性
// - 可以通过 .hasOwnProperty() 方法 传入属性名来判断一个属性是不是实例自身的属性

// 5.
/*
lindaidai
undefined
我要画一副国画
undefined
 */

// 6. 原型链查找
// 当访问一个对象的属性/方法时，它不仅仅是在该对象上查找，还会查找该对象的原型，
// 以及对象原型的原型，一层层向上查找，直到找到一个名字匹配的属性/方法或到达原型链的末尾（null）

// ES6 的 Class 封装

// 2.弄懂在类中定义属性或方法的几种方式
/*
  1.在 constructor 中 var 一个变量，它只存在于 constructor 这个构造函数当中
  2.在 constructor 中使用 this 定义的属性和方法会被定义到实例当中
  3.在 class 中使用 = 来定义一个属性和方法，效果与第二点相同，会被定义到实例上
  4.在 class 中直接定义一个方法，会被添加到 原型对象 prototype 上
*/
// class Cat {
//   constructor () {
//     var heart = '心';  // 只存在构造函数中
//     this.name = 'gg';  // 实例属性
//   }
//   color = 'white'      // 实例属性
//   clean = function () {} // 实例属性
//   hide () {}            // 原型对象属性
// }

// 3.在 class 定义静态属性和方法
/*
  1. 直接使用 Cat.xxx 方式定义，因为 class 本质也是个对象
  2. 还可以在 class 中使用 static 标识符来标识它是一个静态的属性或者方法
*/
// class Cat {
//   static descript = '我是静态属性';
//   static actingCute() {
//     console.log('我是静态方法')
//   }
//   static actingCute2 = function () {
//     console.log('我也是静态方法')
//   }
// }

/*
❤️跳
name color jump cleanTheBody 
name color jump cleanTheBody 
我跳起来了~来追我啊
我会用唾液清洁身体
undefined
undefined ❌ 报错
undefined ❌ class Cat{...}
一听到猫我就想到了它会卖萌
我这个类是用来生产出一只猫的
staticName
*/

// 参考文章： https://juejin.cn/post/6844904094948130824

Object.prototype.fun = () => {};
Array.prototype.fun = () => {};
const str = "ab";
console.log(Object.getOwnPropertyNames(str)); // ['0', '1', 'length']
const arr = ["a", "b"];
console.log(Object.getOwnPropertyNames(arr)); // ['0', '1', 'length']
const obj = { 1: "b", 0: "a" };
console.log(Object.getOwnPropertyNames(obj)); // ['0', '1']
