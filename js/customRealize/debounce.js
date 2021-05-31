// 非立即执行
const debounce = (fn, delay) => {
  let time;
  return function (...args) {
    clearTimeout(time);
    time = setTimeout(fn.bind(this), delay, ...args);
  };
};

// 立即执行

const debounceRight = (fn, delay) => {
  let time;
  return function (...args) {
    if (time) {
      clearTimeout(time);
    }
    const callNow = !time;
    time = setTimeout(() => {
      time = null;
    }, delay);
    if (callNow) {
      fn.call(this, ...args);
    }
  };
};

let obj = {
  debounceFn: debounce(function (b, c) {
    console.log(this.a, b, c);
  }, 1000),
  debounceRightFn: debounceRight(function (b, c) {
    console.log(this.a, b, c);
  }, 1000),
  a: "1",
};
