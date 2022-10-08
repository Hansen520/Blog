## 前言

随着函数式组件的不断流行，React从类式组件走上了函数式组件的时代，那么在新的React函数式编程中，hooks也成为了这个时期最广泛使用的一种方式。现在让我们总结下react hooks吧。

## Hooks 是什么

- react-hooks是react16.8以后，react新增的钩子API，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

- Hook是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

  在官网种有这么一段介绍

  > **最重要的是，Hook 和现有代码可以同时工作，你可以渐进式地使用他们。** 不用急着迁移到 Hook。我们建议避免任何“大规模重写”，尤其是对于现有的、复杂的 class 组件。开始“用 Hook 的方式思考”前，需要做一些思维上的转变。按照我们的经验，最好先在新的不复杂的组件中尝试使用 Hook，并确保团队中的每一位成员都能适应。---来自官网

## 为什么要使用Hooks

【类式组件的缺点】

在组件之间复用状态非常的难，并且复杂组件变得难以理解，有难以理解的class，你必须去理解 JavaScript 中 `this` 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的语法提案，代码非常冗余。

【hooks出现解决的问题】

- 增加代码的可复用性，逻辑性，弥补无状态组件没有生命周期，没有数据管理状态state的缺陷
- react-hooks思想更趋近于函数式编程。用函数声明方式代替class声明方式，虽说class也是es6构造函数语法糖，但是react-hooks写起来函数即是组件，无疑也提高代码的开发效率（无需像class声明组件那样写声明周期，写生命周期render函数等）

## Hooks的使用规则

【**1.只能在最顶层使用Hooks，不要在循环，条件或者嵌套函数中调用Hook**】

确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。

【**2. 只在 React 函数中调用 Hook**】

不要在普通的 JavaScript 函数中调用 Hook，[Hook 使用规则](https://link.juejin.cn/?target=https%3A%2F%2Freact.docschina.org%2Fdocs%2Fhooks-rules.html)

## 一些Hooks函数

### useState

useState 有一个参数（initialState 可以是一个函数，返回一个值，但一般都不会这么用），该参数可以为任意数据类型，一般用作默认值.

useState 返回值为一个数组，数组的第一个参数为我们需要使用的 state，第二个参数为一个改变state的函数（功能和this.setState一样）

#### 一个计数器的列子

```javascript
import React, { useState } from "react";
function Example() {
  const [ count, setCount ] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 2)}>Click me</button>
    </div>
  );
}
export default Example;
```

**第一行:**  引入 React 中的 `useState` Hook。它让我们在函数组件中存储内部 state。

**第三行:**  在 `Example` 组件内部，我们通过调用 `useState` Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。我们把变量命名为 `count`，因为它存储的是点击次数。我们通过传 `0` 作为 `useState` 唯一的参数来将其初始化为 `0`。第二个返回的值本身就是一个函数。它让我们可以更新 `count` 的值，所以我们叫它 `setCount`。

**第七行:**  当用户点击按钮后，我们传递一个新的值给 `setCount`。React 会重新渲染 `Example` 组件，并把最新的 `count` 传给它。

#### 使用多个state变量

```javascript
 // 声明多个 state 变量
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('apple');
  const [todos, setTodos] = useState([{ text: 'Learn Hook' }]);
```

你**不必**使用多个 state 变量。State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组。

```javascript
import React,{useState} from "react";
function Example() {
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState({name:'jimmy',age:22});
  return (
    <div>
      <p>name {person.name} </p>
      // 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将回调函数当做参数传递给 setState。
      // 该回调函数将接收先前的 state，并返回一个更新后的值。
      <button onClick={() => setCount(count=>count+1)}>Click me</button>
      <button onClick={() => setPerson({name:'chimmy'})}>Click me</button>
    </div>
  );
}
export default Example;
```

setPerson更新person时，不像 class 中的 `this.setState`，更新 state 变量总是*替换*它而不是合并它。上例中的person为{name:'chimmy'} 而不是{name:'chimmy',age:22}

### useEffect

**Effect Hook** 可以让你在函数组件中执行副作用（数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用）操作。

> useEffect(fn, array)

如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount``componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

#### useEffect 实现componentDidMount

**如果第二个参数为空数组，useEffect相当于类组件里面componentDidMount。**

```javascript
import React, { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("我只会在组件初次挂载完成后执行");
  }, []);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default Example;
```

页面渲染完成后，会执行一次useEffect。打印“我只会在组件初次挂载完成后执行”，当点击按钮改变了state，页面重新渲染后，useEffect不会执行。

#### useEffect 实现componentDidUpdate

**如果不传第二个参数，useEffect 会在初次渲染和每次更新时，都会执行。**

```javascript
import React, { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("我会在初次组件挂载完成后以及重新渲染时执行");
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default Example;
```

初次渲染时，会执行一次useEffect，打印出“我会在初次组件挂载完成后以及重新渲染时执行”。 当点击按钮时，改变了state，页面重新渲染，useEffect都会执行，打印出“我会在初次组件挂载完成后以及重新渲染时执行”。

#### useEffect 实现componentWillUnmount

**effect 返回一个函数，React 将会在执行清除操作时调用它。**

```javascript
useEffect(() => {
    console.log("订阅一些事件");
    return () => {
      // 比如说这里清楚一些定时器任务等等
      console.log("执行清除操作")
    }
  },[]);
```

注意：这里不只是组件销毁时才会打印“执行清除操作”，每次重新渲染时也都会执行。至于原因，我觉得官网解释的很清楚，请参考 解释: [为什么每次更新的时候都要运行 Effect](https://link.juejin.cn/?target=https%3A%2F%2Freact.docschina.org%2Fdocs%2Fhooks-effect.html)

#### 控制useEffect的执行

```javascript
import React, { useState, useEffect } from "react";
function Example() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  useEffect(() => {
    // 这里只有在count更新的时候才会下面的语句
    console.log("我只会在count变化时执行");
  }, [count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click count</button>
      <button onClick={() => setNumber(number + 1)}>Click number</button>
    </div>
  );
}
export default Example;
```

在点击 click count按钮时，才会打印“我只会在count变化时执行”。 因为useEffect 的第二个参数的数组里面的依赖是count，所以，只有count发生改变时，useEffect 才会执行。如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect。

#### 使用多个 Effect 实现关注点分离

使用 Hook 其中一个[目的](https://link.juejin.cn/?target=https%3A%2F%2Freact.docschina.org%2Fdocs%2Fhooks-intro.html%23complex-components-become-hard-to-understand)就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。

```javascript
import React, { useState, useEffect } from "react";
function Example() {
  useEffect(() => {
    // 逻辑一
  });
  useEffect(() => {
    // 逻辑二
  });
   useEffect(() => {
    // 逻辑三
  });
  return (
    <div>
      useEffect的使用
    </div>
  );
}
export default Example;
```

**Hook 允许我们按照代码的用途分离他们，** 而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用组件中的*每一个* effect。

#### useEffect 做了什么

通过使用这个 Hook，你可以告诉 React 组件需要在`渲染后`执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。

#### 为什么在组件内部调用 `useEffect`？

将 `useEffect` 放在组件内部让我们可以在 effect 中直接访问 `count` state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。

### useContext

> const value = useContext(MyContext);

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。即使祖先使用 [`React.memo`](https://link.juejin.cn?target=https%3A%2F%2Freact.docschina.org%2Fdocs%2Freact-api.html%23reactmemo) 或 [`shouldComponentUpdate`](https://link.juejin.cn?target=https%3A%2F%2Freact.docschina.org%2Fdocs%2Freact-component.html%23shouldcomponentupdate)，也会在组件本身使用 `useContext` 时重新渲染。

```javascript
import {useContext, createContext} from 'react'
// ChildComponent组件(下层组件)
const ColorContext = createContext()
function ChildComponent() {
  const { color, count } = useContext(ColorContext)
  return (
    <div style={{ color }}>
      <h3>Child Component { count}</h3>
    </div>
  )
}

// 父组件(上层组件) 
function App() {
    return (
    <ColorContext.Provider value={{color: '#ccc', count: state.counter}}>
        <ChildComponent></ChildComponent>
    </ColorContext.Provider>)
	
}
```

### useReducer

> const [state, dispatch] = useReducer(reducer, initialArg, init);

[`useState`](https://link.juejin.cn?target=https%3A%2F%2Freact.docschina.org%2Fdocs%2Fhooks-reference.html%23usestate) 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 `dispatch` 而不是回调函数

#### 注意点

> React 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `dispatch`。

#### 示例

```javascript
import { useReducer } from 'react'
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {...state, counter: state.counter + 1}
    case "decrement":
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}

function App() {
     const [state, dispatch] = useReducer(reducer, {counter: 0})
     <h2>Home当前计数: {state.counter}</h2>
     <button onClick={(e) => dispatch({ type: 'increment' })}>组件+1</button>
      &nbsp;
     <button onClick={(e) => dispatch({ type: 'decrement' })}>组件-1</button>
}
```

### useCallback

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个 [memoized]回调函数。

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

#### 例子

```javascript

function Childs(props) {
  console.log('子组件渲染了')
  return (
    <div>
      <button onClick={props.onClick}>改标题child</button>
      <h1>{props.name}</h1>
    </div>
  )
}
const Child = React.memo(Childs);

function Parent() {
  const [title, setTitle] = useState('这是一个title');
  const [subtitle, setSubtitle] = useState('我是一个副标题')
  const callback = () => { 
    setTitle('标题改变了')
  }
  return (
    <div>
      <button onClick={() => setSubtitle('副标题改变了')}>改副标题parent</button>
      <Child onClick={callback} name="鸭子" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
}

function App() {
    return (<Parent/>)
}
```

当我点击**改副标题**这个 button 之后，副标题会变为「副标题改变了」，并且控制台会再次打印出`子组件渲染了`，这就证明了子组件重新渲染了，但是子组件没有任何变化，那么这次 Child 组件的重新渲染就是多余的，那么如何避免掉这个多余的渲染呢？

#### 找原因

我们在解决问题的之前，**首先要知道这个问题是什么原因导致的？**

咱们来分析，一个组件重新重新渲染，一般三种情况：

1. 要么是组件自己的状态改变
2. 要么是父组件重新渲染，导致子组件重新渲染，但是父组件的 props 没有改变
3. 要么是父组件重新渲染，导致子组件重新渲染，但是父组件传递的 props 改变

接下来用排除法查出是什么原因导致的：

第一种很明显就排除了，当点击**改副标题** 的时候并没有去改变 Child 组件的状态；

第二种情况，我们这个时候用 `React.memo` 来解决了这个问题，所以这种情况也排除。

那么就是第三种情况了，当父组件重新渲染的时候，传递给子组件的 props 发生了改变，再看传递给 Child 组件的就两个属性，一个是 `name`，一个是 `onClick` ，`name` 是传递的常量，不会变，变的就是 `onClick` 了，为什么传递给 onClick 的 callback 函数会发生改变呢？其实在函数式组件里每次重新渲染，函数组件都会重头开始重新执行，那么这两次创建的 callback 函数肯定发生了改变，所以导致了子组件重新渲染。

#### 用useCallback解决问题

```javascript
import { useCallback } from 'react'
// 上面部分代码改写成这样子就可以解决这样子的问题，就不会造成更新时候子组件未改变而造成的渲染
return (
    <div>
      <button onClick={() => setSubtitle('副标题改变了')}>改副标题parent</button>
      <Child onClick={ useCallback(callback, []) } name="鸭子" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
```

### useMemo

> const cacheSomething = useMemo(create,deps)

- `create`：第一个参数为一个函数，函数的返回值作为缓存值。
- `deps`： 第二个参数为一个数组，存放当前 useMemo 的依赖项，在函数组件下一次执行的时候，会对比 deps 依赖项里面的状态，是否有改变，如果有改变重新执行 create ，得到新的缓存值。
- `cacheSomething`：返回值，执行 create 的返回值。如果 deps 中有依赖项改变，返回的重新执行 create 产生的值，否则取上一次缓存值。

#### 原理

useMemo 会记录上一次执行 create 的返回值，并把它绑定在函数组件对应的 fiber 对象上，只要组件不销毁，缓存值就一直存在，但是 deps 中如果有一项改变，就会重新执行 create ，返回值作为新的值记录到 fiber 对象上。

#### 例子

```javascript
import { useMemo } from 'react'
// 计算和的函数，直接计算开销较大，所以下面用useMemo包一层
function calcNumber(count) {
  console.log('calcNumber重新计算')
  let total = 0
  for (let i = 0; i <= count; i++) {
    total += i
  }
  return total
}

function MemoHook() {
  const [count, setCount] = useState(100000)
  const [show, setShow] = useState(true)
  // 类似于vue里面的computer
  const total = useMemo(() => {
    return calcNumber(count)
  }, [count])
  return (
    <div>
      <button onClick={e => setCount(count + 2)}>+2</button>
      <button onClick={e => setShow(!show)}>show切换</button>
      <h2>Memohook计算数字的和：{total}</h2>
    </div>
  )
}

function App() {
    return (
    	<App/>
    )
}
```

### useCallback 和 useMemo总结

简单理解呢 useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回的结果。useCallback 是来优化子组件的，防止子组件的重复渲染。useMemo 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 memoize 来将一些复杂的计算逻辑进行缓存。当然如果只是进行一些简单的计算也没必要使用 useMemo。

我们可以将 useMemo 的返回值定义为返回一个函数这样就可以变通的实现了 useCallback。`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

### useRef

> const refContainer = useRef(initialValue);

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变

```javascript
function RefDom() { 
  const refContainer = useRef()
  function changeDOM() { 
    console.log('整个div', refContainer.current) 
    console.log('div的class', refContainer.current.className)
    console.log('div自定义属性', refContainer.current.getAttribute('data-clj'))
  }
  return (
    <div>
      <div className='abcdfg' data-clj="我是div自定义属性" ref={refContainer}>我是div元素</div>
      <button onClick={(e) => changeDOM()}>获取DOM</button>
    </div>
  )
}

function App() {
    return (
    	<App/>
    )
}
```

### 手写一个hook，uselocalstorage



```javascript
// 这是一个缓存数据的hook函数，并结合useState而成
// 函数名称必须以 use开头
// 自定义使用localStorage来缓存数据 -> string, bject, function
const uselocalstorage = (key, initialValue) => {
  // key -> 命名空间 -> 区别不同的storage
  const [stateValue, setStateValue] = useState(() => {
    try { 
      return JSON.parse(localStorage.getItem(key)) || initialValue// 给stateValue的初始化值
    } catch (error) {
      return initialValue
    }
  })
  const setStorage = (newVal) => {
    let valueToStore
    if (newVal instanceof Function) {
      valueToStore = newVal(stateValue)
    } else {
      valueToStore = newVal
    }
    setStateValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }
  return [stateValue, setStorage]
}
function LocalStorageHook() { 
  const [count, setCount] = uselocalstorage('count', 2)
  return (
    <div>
      <button onClick={() => { setCount(count + 2) }}>计数+2</button>
      <button onClick={() => { setCount((count) => (count - 2)) }}>计数-2</button>
      useLocalStorage缓存计数
      {count}
    </div>
  )
}
function App() {
    return (
        <LocalStorageHook/>
    )
}
```

## 一些建议

- 先精通三个基础 Hooks，也就是 useState 、 useEffect 和 useContext。然后在此基础上：

1. 掌握 useRef 的一般用法；
2. 当需要优化性能，减少不必要的渲染时，学习掌握 useMemo 和 useCallback ；
3. 当需要在大中型 React 项目中处理复杂 state 时，学习掌握 useReducer ；
4. 当需要封装组件，对外提供命令式接口时，学习掌握 useRef 加 useImperativeHandle；
5. 当页面上用户操作直接相关的紧急更新（Urgent Updates，如输入文字、点击、拖拽等），受到异步渲染拖累而产生卡顿，需要优化时，学习掌握 useDeferredValue 和 useTransition 。
