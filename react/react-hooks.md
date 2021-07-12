# React Hooks

## useState

### 为什么使用 useState？

`useState` 的出现是：在函数组件里面使用 class 的 setState

解决的问题：函数组件也能拥有自己维护的 state

### 如何使用 useState

```js
const [name, setName] = useState("rose");
```

### useState 踩坑知识点

`useState 的初始值，只在第一次有效`

例子：当点击按钮修改 name 的值的时候， Child 组件虽然收到了值，但是不会通过 `useState` 赋值给 childName

```js
const Child = memo(({ data }) => {
  console.log("child render...", data);
  const [childName, setChildName] = useState(data);
  return (
    <div>
      <div>child</div>
      <div>
        {childName} --- {data}
      </div>
    </div>
  );
});

const Hook = () => {
  console.log("Hook render...");
  const [count, setCount] = useState(0);
  const [name, setName] = useState("rose");

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>update count </button>
      <button onClick={() => setName("jack")}>update name </button>
      <Child data={name} />
    </div>
  );
};
```

## useEffect

### 为什么要使用 useEffect

useEffect 的出现是：在函数组件里面使用 class 的生命周期函数，而且还是所有函数的合体

### 如何使用 useEffect

```js
useEffect(() => {
  ...
})
```

### useEffect 知识点合集

1. 只在第一次使用的 componentDidMount, 可以用来请求异步数据

> useEffect 最后，加了 [] 就表示只第一次执行

```js
useEffect(() => {
  const user = 获取全国人民信息();
}, []);
```

2. 用来代替 willUpdate 等每次渲染都会执行的生命周期

> useEffect 最后，不加 [] 就表示每一次渲染都执行

```js
useEffect(() => {
  const user = 获取全国人民信息();
});
```

3. 每次渲染都执行感觉浪费性能，所以在 useEffect 最后加上 [], 并且 [] 加的字段表示：这个字段变了，这个 effect 才执行

```js
useEffect(() => {
  const user = name改变了我才获取全国人民信息();
}, [name]);
```

4. 如果想要分别依赖不同项，可以写多个 useEffect

```js
useEffect(() => {
  const user = name改变了我才获取全国人民的name信息();
}, [name]);

useEffect(() => {
  const user = age改变了我才获取全国人民的age信息();
}, [age]);
```

5. 如果之前订阅了生命，最后在 willUnMount 这个生命周期里面要取消订阅，这个用 useEffect 怎么实现？

> 在 effect 的 return 里面可以做取消订阅的事（useEffect return 的函数会在组件销毁的时候执行）

```js
useEffect(() => {
  const subscription = 订阅全国人民吃饭的情报！
  return () => {
    取消订阅全国人民吃饭的情报！
  }
}, [])
```

为什么要取消订阅？

> 大家都知道，render 之后会重新执行 useEffect，如果 useEffect 里面有一个 setInterval 那么每次 render, 再次执行 useEffect 就会再创建一个 setInterval, 然后就混乱了

```js
const [count, setCount] = useState(0);
useEffect(() => {
  console.log("use effect...", count);
  const timer = setInterval(() => setCount(count + 1), 1000);
}, [count]);
```

6. useEffect 的一些暗戳戳的规则：

> 1. useEffect 中使用到的 state 的值，固定在了 useEffect 内部，不会被改变，除非 useEffect 刷新，重新固定 state 的值

```js
const [count, setCount] = useState(0);
useEffect(() => {
  console.log("use effect...", count);
  const timer = setInterval(() => {
    console.log("timer...count: ", count);
    setCount(count + 1);
  }, 1000);
}, []);
```

> 2. useEffect 不能判断包裹(因为 react 判断 useEffect 是哪一个是根据顺序判断的，如果有包裹，有可能前后顺序就不一致了)

```js
const [count, setCount] = useState(0);
if (2 < 5) {
  useEffect(() => {}, []);
}
```

> 3. useEffect 不能被打断

```js
const [count, setCount] = useState(0);
useEffect(() => {}, []);

return; // 函数提前结束

useEffect(...)
```

具体原因跟 uesEffect 的生成执行规则有关

## useRef

### 为什么要使用 useRef?

前面提到的：

> useEffect 中使用 state 的值会被固定在 useEffect 内部，不会改变，除非 useEffect 刷新，重新固定 state 的值

```js
const [count, setCount] = useState(0);
useEffect(() => {
  console.log("use effect...", count);
  const timer = setInterval(() => {
    console.log("use interval...", count);
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

`useEffect` 里面 state 的值是古荡的, count 会一直是 1, 这个是有办法解决的，就是使用 `useRef`, 可以理解成 `useRef` 的一个作用：

> 就是相当于全局作用域，一处被修改，其他地方全更新

### 如何使用 useRef?

```js
const countRef = useRef(0);
```

1. 就是相当于全局作用域，一处被修改，其他地方全更新

```js
const Hook = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    console.log('use effect...', ref);
    const timer = setInterval(() => {
      console.log('timer...count: ', ref.current);
      setCount(++ref.current);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return <div>{count}</div>
};
```

2. 普通操作，用来操作 dom

> const btnRef = useRef(null)

> 绑定 ref, 注册 click 事件

> 活学活用，记得取消绑定事件！ return () => btnRef.current.removeEventListener('click')

```js
const Hook = () => {
  const [count, setCount] = useState(0);
  const ref = useRef < HTMLButtonElement > null;

  useEffect(() => {
    console.log("use effect...");
    const onClick = () => {
      setCount(count + 1);
    };
    ref.current?.addEventListener("click", onClick, false);

    return () => ref.current?.removeEventListener("click", onClick, false);
  }, [count]);

  return (
    <>
      <div>{count}</div>
      <button ref={ref}>click me</button>
    </>
  );
};
```
