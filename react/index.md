1. React 中 Effect 和 useCallback 的结合使用

react 中 fn 使用 useCallback 包裹后，可以把 fn 作为 dependency 数组内容传给 useEffect， useEffect 会根据 useCallback 依赖项进行更新

```JS
const fn = useCallback(() => {
  console.log('callback', a)
}, [a])
// 可知 fn 是依赖于 a 的，只有当 a 发生变化的时候 fn 才会变化，否则每轮 render 的 fn 都是同一个

const f1 = () => {
  console.log('f1');
}
// 对于 f1, 每轮循环都有独自的 f1, 相当于一直在变化，如果 useEffect 依赖于 f1 的话，每次 render 之后都会执行

useEffect(() => {
  console.log('this is effect');
}, [f1])
// 当 dependency 数组中是 f1 时, 不管更新 count 还是 a, 都会执行里面的函数，打印出 this is effect
// 当 dependency 数组中是 fn 时, 只有更新 a 时才会执行该函数
```

2. React.memo()

>与 PureComponent 相似，帮助我们控制何时重新渲染组件

React.memo() 是一个高阶组件，可以用来包裹一个已有的函数式组件，然后该组件只会在 props 变化的时候进行渲染

`memo` 是浅比较，意思是，对象只比较内存地址，只要你内存地址没变，管你对象里面的值千变万化都不会触发 render