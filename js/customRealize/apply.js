Function.prototype.myApply = function (context, arr) {
  context = context || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  } else {
    result = context.fn(arr);
  }
  delete context.fn;
  return result;
};
