// // 1. add(1,2,3) 实现累加
// const add1 = (...args) => {
//   let sum = 0;
//   for (let i of args) {
//     sum += i
//   }
//   return sum
// }

// console.log(add1(3, 3, 1));

// // 2. add(1)(2)(3), 可以这样的形式执行函数，说明 add 返回的就是一个函数，
// //    而 console.log(fun), 函数会执行 toString() 方法，
// //    所以我们只需要改写返回函数的 toString 方法即可

// const add2 = args => {
//   let sum = args2 => {
//     // 使用闭包，a 一直存在
//     args = args + args2;
//     return sum;
//   }

//   sum.toString = () => {
//     return args;
//   }
//   return sum;
// }
// console.log(add2(1)(3)(4));

// 将 1，2 一起实现
const add = (...args) => {
  // 使用闭包，用 _args 来保存数据
  let _args = [...args];
  let sum = (...args2) => {
    _args = _args.concat(args2);
    return sum;
  }

  sum.toString = () => {
    // let num = 0;
    // for (let i of args) {
    //   num += i
    // }
    // return num;
    // 使用 reduce 进行求和
    return _args.reduce((total, next) => {
      return total + next;
    }, 0)
  }
  return sum;
}
console.log(add(1)(3, 1, 2)(4));