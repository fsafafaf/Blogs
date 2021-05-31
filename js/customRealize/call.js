Function.prototype.myCall = function (context) {
  context = context || window;
  context.fn = this;
  // this 指向最终调用它的对象，这里将 fn 挂载到 context 下，这样 this 就成功的指向 context 了
  var args = [...arguments].slice(1);
  var result = context.fn(...args);
  delete context.fn;
  return result;
};

var value = 2;
var obj = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

bar.myCall(null); // 2
console.log(bar.myCall(obj, "gaofeng", 29));  // 1 { value: 1, name: 'gaofeng', age: 29 }
