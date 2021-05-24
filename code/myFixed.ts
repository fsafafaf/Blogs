// JS 中的 `toFixed` ，采取的是四舍六入，末尾为5，有时候会进一位，有时候不会进，（原理？？？），但是5后的后一位有数字的话，就会进一位
var [a, b, c] = [1.12355, 101.12355, 99.12355];
a.toFixed(4); // 1.1236
b.toFixed(4); // 1.1235
c.toFixed(4); // 1.1235

const myFixed = (num: number, precision: number) => {
  const string = num.toString();
  const decimal = string.split('.')[1];
  if (decimal && decimal.length > precision) {
    return Number(`${string}5`).toFixed();
  }
  return num.toFixed();
}
myFixed(a, 4); // 1.1236
myFixed(b, 4); // 1.1236
myFixed(c, 4); // 1.1236