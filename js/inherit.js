// 1.原型链继承
function Father() {
  this.name = 'parent';
  this.friend = [];
  this.property = true;
}

Father.prototype.getName = function () {
  return this.name;
}

Father.prototype.getParentValue = function () {
  return this.property;
}

function Son(name, age) {
  this.name = name;
  this.age = age;
  this.SonProperty = false;
}

Son.prototype = new Father();

Son.prototype.constructor = Son;

// test
const child = new Son('xiaoming', 12);
console.log(child.getName(), 'childNmae');
console.log(child instanceof Father, 'true is ok');
console.log(Son.prototype.constructor === Son, 'true is ok')

// 2.构造继承
function Father1(name) {
  this.name = name
}

function Child1() {
  this.sex = 'boy'
  Father1.call(this, 'good boy');
}
//  等价于
// function Child1 () {
//   this.sex = 'boy';
//   this.name = 'good boy';
// }

// 3.组合继承
function Father2(name) {
  this.name = name;
}
Father2.prototype.getName = function () { console.log(this.name) };
function Child2(name) {
  this.sex = 'boy';
  Father2.call(this, name);
  this.getSex = () => console.log(this.sex);
}
Child2.prototype = new Father2();
Child2.prototype.constructor = Child2;
Child2.prototype.getSex = function () { console.log(this.sex) };

var child21 = new Child2('child1');
var parent21 = new Father2('parent1');
console.log(child21)
console.log(parent21)
child21.getName()
child21.getSex()
parent21.getName()
parent21.getSex()

// 4.寄生组合继承
function Father3(name) {
  this.name = name;
}
function Child3(name) {
  this.sex = 'boy';
  Father3.call(this, name);
}
// 使用 Object.create(Father3.prototype) 创建了一个空对象，并且这个对象的 _proto_ 指向 Father3.prototype
Child3.prototype = Object.create(Father3.prototype);
Child3.prototype.constructor = Child3;

var child3 = new Child3('child3')

// tip 一种奇葩的代码
function A() { }
A.prototype.a = 1;
A.prototype.getAdd = function () {
  console.log(this.a)
};
var a = new A();
a.getAdd()   // 结果：1

// 5.原型式继承
/* Object.create() 的实现原理 */
// 实际上就是手撸一个 Object.creat(), 因为 ES5 之前没有这个 API, 所有有这样一个原型式继承
// cloneObject() 对传入其中的对象执行了一次浅拷贝，将构造函数F的原型直接指向传入的对象。
// function cloneObject (obj) {
//   function F () {};
//   F.prototype = obj; // 将传进来的 obj 作为空函数的 prototype
//   F.prototype.constructor = F;
//   return new F(); // 此对象的原型为被继承的对象, 通过原型链查找可以拿到被继承对象的属性
// }

// var faher = {
//   name: 'jk',
//   age: 22,
//   courses: ['前端']
// };
// var son1 = cloneObject(faher);
// son1.courses.push('后端')

// var son2 = cloneObject(faher);
// son2.courses.push("全栈");

// console.log(father.courses); //  ["前端", "后端", "全栈"]

// 6.寄生式继承，
// 对原型式继承返回的对象再进行一次增强封装
function createAnother(obj) {
  var clone = Object.create(obj);
  clone.run = function () {
    console.log('run')
  }
  return clone;
}
