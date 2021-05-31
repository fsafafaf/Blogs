// 手写 bind 函数
Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== "Function") {
    throw new TypeError("Error");
  }
  var _this = this;
  return function (...args2) {
    _this.call(context, ...args1, ...args2);
  };
};

// 优化版
// Function.prototype.myBind = function (context) {
//   if (typeof this !== "Function") {
//     throw new TypeError("Error");
//   }
//   var args1 = Array.prototype.slice.call(arguments, 1);
//   var _this = this;
//   var fNOP = function () {};
//   var fBind = function (...args2) {
//     var args2 = Array.prototype.slice.call(arguments);
//     return _this.apply(this instanceof fNOP ? this : context, args1.concat(args2));
//   };

//   fNOP.prototype = this.prototype;
//   fBind.prototype = new fNOP();
//   return fBind;
// };
