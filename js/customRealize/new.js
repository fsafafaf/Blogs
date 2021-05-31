function _new(constructor, ...args) {
  // let obj = {};
  // obj.__proto__ = constructor.prototype;
  // 实际上就是原型式继承
  let obj = Object.create(constructor.prototype);
  const result = constructor.call(obj, ...args);
  return typeof result === "object" ? result : obj;
}

// 测试
function F(name, age) {
  this.name = name;
  this.age = age;
}

const gf = _new(F, "gaofeng", 18);
console.log(gf);  // F { name: 'gaofeng', age: 18 }
