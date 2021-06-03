// 手写递归方法：遍历对象、数组，直到里面全是基础数据类型，再进行复制

// 需要注意 循环引用 的问题，可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
// 当需要拷贝当前对象时，先去存储空间找，有没有拷贝过这个对象，如果有直接返回，没有则拷贝

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象和普通的值，如果是函数的话则不需要深拷贝
  // typeof 对象类型 除了函数都返回 object
  if (typeof obj !== "object") return obj;
  // 对对象进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  // new 一个新实例出来是为了继承原型
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

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};

// 乞丐版
JSON.parse(JSON.stringify(target));

// 浅拷贝
function deepClone_1(obj) {
  let cloneObj = {};
  for (let key in obj) {
    cloneObj[key] = obj[key];
  }
  return cloneObj;
}

// 递归判断是否是对象，进行深拷贝
function deepClone_2(obj) {
  let cloneObj = {};
  if (typeof obj !== "object") return obj;
  for (let key in obj) {
    cloneObj[key] = deepClone_2(obj[key]);
  }
  return cloneObj;
}

// // 考虑 数组
function deepClone_3(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  let cloneObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    cloneObj[key] = deepClone_3(obj[key]);
  }
  return cloneObj;
}

// 考虑循环依赖，用 map 来存储拷贝过的值
function deepClone_4(obj, hash = new Map()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);
  for (let key in obj) {
    cloneObj[key] = deepClone_4(obj[key], hash);
  }
  return cloneObj;
}

// 使用 WeakMap 来进行内存优化，能够释放掉 obj， 使用 while 代替 for in, 提高性能
const forEach = (arr, callback) => {
  let index = -1;
  const len = arr.length;
  while (++index < len) {
    callback(arr[index], index, arr);
  }
};
function deepClone_5(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj);
  const isArray = Array.isArray(obj);
  let cloneObj = isArray ? [] : {};
  hash.set(obj, cloneObj);
  const keys = isArray ? undefined : Object.keys(obj);
  forEach(keys || obj, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneObj[key] = deepClone_5(obj[key], hash);
  });
  return cloneObj;
}
console.time();
console.log(deepClone_4(target));
console.timeEnd();
console.time();
console.log(deepClone_5(target));
console.timeEnd();

// 对特殊类型进行处理
const getType = (obj) => Object.prototype.toString.call(obj).replace(/\[object\s|]/g, "");

const cloneReg = (obj) => {
  //  \w: 匹配所有 字母数字和下划线
  //  *: 匹配前面子表达式零次或者多次
  //  $: 匹配输入字符串的结尾位置
  const reFlags = /\w*$/;
  // source：正则表达式的源文本
  // exec: 检索字符串中的正则表达式匹配，返回一个数组
  const result = new obj.constructor(obj.source, reFlags.exec(obj));
  // lastIndex 一个整数，标示开始下一次匹配的字符位置。
  result.lastIndex = obj.lastIndex;
  return result;
};

const cloneSymbol = (obj) => Object(Symbol.prototype.valueOf.call(obj));

const cloneOtherType = (obj, type) => {
  const type = getType(obj);
  const Cor = obj.constructor;
  switch (type) {
    // case "String":
    // case "Number":
    // case "Boolern":
    case "Error":
    case "Date":
      return new Cor(obj);
    case "RegExp":
      return cloneReg(obj);
    default:
      return null;
  }
};

const deepTags = ["Map", "Set", "Array", "Object", "Args"];

function clone(obj, hash = new WeakMap()) {
  // 克隆原始类型、null、function
  if (obj === null && typeof obj !== "object") return obj;

  // 初始化
  const type = getType(obj);
  let cloneObj;
  if (deepTags.includes(type)) {
    cloneObj = new obj.constructor();
  } else {
    return cloneOtherType(obj, type);
  }

  // 防止循环引用
  if (hash.get(obj)) return hash.get(obj);
  hash.set(obj, cloneObj);

  // 克隆 set
  if (type === "Set") {
    obj.forEach((value) => {
      cloneObj.add(clone(value, hash));
    });
  }

  // 克隆 map
  if (type === "Map") {
    obj.forEach((value, key) => {
      cloneObj.set(key, clone(value, hash));
    });
  }

  // 克隆对象和数组
  const keys = type === "Array" ? undefined : Object.keys(obj);
  forEach(keys || obj, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneObj[key] = clone(obj[key], hash);
  });

  return cloneObj;
}
