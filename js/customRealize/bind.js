// 手写 bind 函数
Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== "Function") {
    throw new TypeError("Error");
  }
  var _this = this;
  return function (...args2) {
    return _this.call(context, ...args1, ...args2);
  };
};

// 解决 new 调用函数时，this 指向返回的函数本身，导致先前绑定的 this 丢失情况
Function.prototype.softBind = function (context, ...args1) {
  if (typeof this !== "Function") {
    throw new TypeError("Error");
  }
  var _this = this;
  return function F (...args2) {
    if (_this instanceof F) {
      return new _this(...args1, ...arg2);
    }
    return _this.call(context, ...args1, ...args2);
  };
};
