Function.prototype.call2 = function (context) {
  context = context || window;
  context.fn = this;
  var args = [...arguments].slice(1);
  var result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.apply2 = function (context) {
  context = context || window;
  context.fn = this;
  var arr = arguments[1];
  var result;
  if (arr) {
    result = context.fn(...arr);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

Function.prototype.bind2 = function (context, ...args1) {
  var _this = this;
  return function (...args2) {
    return _this.apply(context, arg1.concat(args2));
  };
};

for (var i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
// 打印出来全是 6
// 一：闭包
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(() => console.log(j), j * 1000);
  })(i);
}
// 二：使用 setTimout 第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout((j) => console.log(j), i * 1000, i);
}
// 三：使用 let 定义，产生块级作用域
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}