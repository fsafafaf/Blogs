# Jest

FaceBook 提供的 JS 测试框架, 类似于 mocha chai (使用 create-reacte-app 会自带 Jest)

## 匹配器（断言）

```js
expect(x).toBe(y)//判断相等，使用Object.is实现
expect({a:1}).toEqual({a:1})//判断两个对象是否相等
expect(1).not.toBe(2)//判断不等
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
expect(value).toBeCloseTo(0.3); // 浮点数判断相等
expect('Christoph').toMatch(/stop/); //正则表达式判断
expect(['one','two']).toContain('one'); //数组中是否包含

function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
}）
```

## 安装和顺序

### 一些 Jest 提供的辅助函数

1. `beforeEach` 在每次测试前调用
2. `afterEach` 在每次测试后调用
3. `beforeAll` 在文件开头调用一次
4. `afterAll` 在文件末调用一次

### 作用域与执行顺序

默认情况下，`before` 和 `after` 能够作用到文件中的每个测试。

此外可以通过 `describe` 分组。当 `before` 和 `after` 只在 `describe` 块内部时，则只适用于该 `describe` 中。

注意顶层的 `beforeEach` 会比 `describe` 中的执行的更早

举个 🌰:

```js
beforeAll(() => console.log("1.beforeAll"));
afterAll(() => console.log("1.afterAll"));
beforeEach(() => console.log("1.beforeEach"));
afterEach(() => console.log("1.afterEach"));
test("1.test", () => console.log(1));

describe("test", () => {
  beforeAll(() => console.log("2.beforeAll"));
  afterAll(() => console.log("2.afterAll"));
  beforeEach(() => console.log("2.beforeEach"));
  afterEach(() => console.log("2.afterEach"));
  test("2.test", () => console.log(2));
});

// 1.beforeAll
// 1.beforeEach
// 1.test
// 1.afterEach
// 2.beforeAll
// 1.beforeEach
// 2.beforeEach
// 2.test
// 2.afterEach
// 1.afterEach
// 2.afterAll
// 1.afterAll
```

### describe 与 test 的执行顺序

Jest 会在真正的测试开始前，执行测试文件中的所有 descript 处理程序。
默认情况下，Jest 会按照 test 出现的顺序依次运行所有测试，等待每一个测试完成并整理好，然后再计息往下走

```js
describe("outer", () => {
  console.log("describe outer-a");

  describe("inner 1", () => {
    console.log("describe inner 1");
    test("1", () => {
      console.log("test for describe inner 1");
      expect(true).toEqual(true);
    });
  });

  console.log("describe outer-b");

  test("1", () => {
    console.log("test for describe outer");
    expect(true).toEqual(true);
  });

  describe("inner 2", () => {
    console.log("describe inner 2");
    test("for describe inner 2", () => {
      console.log("test for describe inner 2");
      expect(false).toEqual(false);
    });
  });

  console.log("describe outer-c");
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

## 模拟函数

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test("测试", () => {
  const mockCallBack = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallBack);
  
  // 此 mock 函数被调用两次
  expect(mockCallBack.mock.calls.length).toBe(2);

  // 第一次调用第一个参数是 0
  expect(mockCallBack.mock.calls[0][0]).toBe(0);

  // 第二次调用第一个参数是 0
  expect(mockCallBack.mock.calls[1][0]).toBe(1);

  // 第二次调用的结果是 43
  expect(mockCallBack.mock.results[1].value).toBe(43);
});
