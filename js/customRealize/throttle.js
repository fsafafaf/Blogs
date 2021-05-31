const throttle = (fn, dealy) => {
  let time = 0;
  return function (...args) {
    const date = Date.now();
    if (time <= date) {
      fn.call(this, ...args);
      time = date + dealy;
    }
  };
};

obj.throttleFn = throttle(function (b, c) {
  console.log(b, c);
}, 1000);
