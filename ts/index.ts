/** 泛型 Generic Type */
function foo<T>(args: T): T {
  return args;
}
// 使用 T 来表示一个未知的类型，它是入参和返回值的类型，在使用的时候可以显示指定泛型

foo<string>("gaofeng");

// 也可以不指定，因为 TS 会自动推导出泛型的实际类型。

// 泛型在箭头函数下的书写

const foo1 = <T>(arg: T) => arg;

// 如果在 TSX 文件中这样写， <T> 可能被识别为 JSX 标签,因此需要显示的告知编译器

const foo2 = <T extends {}>(arg: T) => arg;

// 除了用在函数中，泛型也可以在类中使用

class Foo<T, U> {
  constructor(public arg1: T, public arg2: U) {}

  public method(): T {
    return this.arg1;
  }
}

/** 索引类型和映射类型 */

// 假设 key 是 obj 键名
function pickSingleValue(obj, key) {
  return obj[key];
}

//  key 必然是 object 的键值名之一，一定为 string 类型
//  返回的值一定是 obj 中的键值

function pickSingleValue1<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}

// keyof 是 索引类型查询 的语法，它会返回后面跟着的类型参数的键值组成的字面量类型 (literal types)，举个例子

interface foo3 {
  a: number;
  b: string;
}

type A1 = keyof foo3; // 'a' | 'b'

// TIP: 字面量类型是对类型的进一步限制，比如状态码只可能为 0/1/2 那么你就可以写成 status: 0 | 1 | 2 的形式。
//      字面量类型包括 字符串字面量、数字字面量、布尔值字面量

// pickSingleValue1 的写法还有改进的地方，1️⃣ keyof 出现了两次，2️⃣ 泛型 T 应该被限制为对象类型，
//    就像我们评审做的那样，用一个变量把多处出现的存起来， 在类型编译里，泛型就是变量

function pickSingleValue2<T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] {
  return obj[key];
}

// T extends object: T 被限制为对象类型，
// U extends keyof T: 泛型 U 必然是泛型 T 的键名组成的联合类型（以字面量类型的形式）

// 假设我们现在不只取出一个值，而是取出一系列的值

function pick<T extends object, U extends keyof T>(obj: T, keys: U[]): T[U][] {
  return keys.map((key) => obj[key]);
}

// keys: U[]: 分布式条件类型
// T[U][]: 同 keys, 简单的表现了 TS 类型编程的组合性

/** 索引签名 Index Signature */

//  索引签名用于快速建立一个内部字段类型相同的接口，如

interface Foo2 {
  [key: string]: string;
}

// 那么接口 Foo 就被认定为字段全是 string 类型
// TIP: 由于 JS 可以同时通过数字和字符串访问对象属性，因此 keyof Foo2 的结果会是 string | number

type a = keyof Foo2;

const o: Foo2 = {
  1: "芜湖",
};

o[1] === o["1"];

// 但是一旦某个接口的索引签名类型为 number, 那么它就不能再通过字符串索引访问，如 o['1']

/** 映射类型 Mapped Types */

//  映射类型同样是类型编程的重要底层组成，通常用于在旧有类型的基础上进行改造，包括接口包含字段、字段的类型、修饰符（readonly 与 ?）等

interface A3 {
  a: boolean;
  b: string;
  c: number;
  d: () => void;
}

// 实现一个接口，字段与 A3 的完全相同，但是类型全部为 string
type StringfyA3<T> = {
  [K in keyof T]: string;
};

// in 操作符相当于 for...in, 也就是还可以获取到接口键值类型，比如复制接口

type Clone<T> = {
  [K in keyof T]: T[K];
};

// 上面两个其实是工具类型，相当于 JS 中放在 utils 文件夹的公共函数，提供了对公用逻辑的封装

//  将接口下的字段全部变为可选的
type Partial1<T> = {
  [K in keyof T]?: T[K];
};

/** 条件类型 Conditional Types */

// 条件类型的语法实际上就是三元表达式 T extends U ? X : Y
// TIP:《何时条件类型系统会收集到足够的信息来确定类型》也就是说，条件类型有可能不会被立刻完成判断

// 泛型约束：
//    T extends object 和 U extends keyof T 都是泛型约束，分别将 T 约束为对象类型和将 U 约束为 T 键名的字面量联合类型。
//    我们通常使用泛型约束来使得 泛型收窄

// 以一个使用条件类型作为函数返回值类型的例子：

// tip: 声明变量使用关键字 declare 来表示声明其后面的全局变量的类型
declare function strOrnum<T extends boolean>(
  x: T
): T extends true ? string : number;

// 在这种情况下，条件类型的推导就会被延迟（deferred）, 因为此时类型系统没有足够的信息来完成判断

// 只有给出了所需信息（在这里是 x 值），才可以完成推导

const strReturnType = strOrnum(true);
const numReturnType = strOrnum(false);

// 同样的，就像三元表达式可以嵌套，条件类型也可以嵌套，条件类型可以将类型约束收拢到非常精准的范围内

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

const a2: TypeName<string> = typeof "2";
