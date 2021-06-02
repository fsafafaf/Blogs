// 手写递归方法：遍历对象、数组，直到里面全是基础数据类型，再进行复制

// 需要注意 循环引用 的问题，可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
// 当需要拷贝当前对象时，先去存储空间找，有没有拷贝过这个对象，如果有直接返回，没有则拷贝

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象和普通的值，如果是函数的话则不需要深拷贝
  // typeof 对象类型 除了函数都返回 object
  if (typeof obj !== 'object') return obj;
  // 对对象进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的 constructor, 而原型上的 constructor 指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}