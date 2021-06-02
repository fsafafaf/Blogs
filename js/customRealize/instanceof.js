/** 手写 instanceof 判断对象的类型 */

function myInstanceof(left, right) {
  const prototype = right.prototype;
  left = left.__proto__;
  while (true) {
    if (left === null) {
      return false;
    }
    if (left === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}
