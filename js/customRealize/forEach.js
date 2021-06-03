// 使用 while 来实现 forEach 函数

function forEach(arr, callback) {
  let index = -1;
  const len = arr.length;
  while (++index < len) {
    callback(arr[index], index, arr);
  }
}

// 在判断语句中使用 ++index, 相比于 index++ 可以减少一行代码

// index++ 方法
// function forEach(arr, callback) {
//   let index = 0;
//   const len = arr.length;
//   while (index < len) {
//     callback(arr[index], index, arr);
//     index++;
//   }
// }
