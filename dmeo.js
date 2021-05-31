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
