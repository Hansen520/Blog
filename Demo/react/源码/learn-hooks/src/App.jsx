import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useRef
} from 'react'
import React from 'react'
import './App.css'

const ColorContext = createContext()
function ChildComponent() {
  const { color, count } = useContext(ColorContext)
  return (
    <div style={{ color }}>
      <h3>Child Component { count}</h3>
    </div>
  )
}

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
// 计算和的函数，开销较大
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
      <Child onClick={ useCallback(callback, []) } name="鸭子" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
}


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
  const [count, setCount] = useState(2)
  const [obj, setTodos] = useState({ text: '学习hooks', time: 12 })
  /**
   * useEffect的用法
  */
  useEffect(() => {
    // console.log('我只会在组件挂载初次挂载完成后执行')
    // console.log('订阅一些消息')
    function getData() { }
    (async function getDatas() {
      await getData()
    })()
    console.log('我只会在count变化时执行')
    return () => { 
      // console.log('执行清除操作')
    }
  }, [count])

  const [state, dispatch] = useReducer(reducer, {counter: 0})
  return (
    <div>
      计数：{count}
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {/* 并不会合并，会替换 */}
      任务： {obj.text} {obj.time}
      <button onClick={() => setTodos((prev) => ({...prev, text: '学习数学'}))}>Click me</button>
      <br/><br/>{/*通过reducer并用上ColorContext父子组件间的通信 */}
      <button onClick={(e) => dispatch({ type: 'increment' })}>子组件+1</button>
      &nbsp;
      <button onClick={(e) => dispatch({ type: 'decrement' })}>子组件-1</button>
      <ColorContext.Provider value={{color: '#ccc', count: state.counter}}>
        <ChildComponent></ChildComponent>
      </ColorContext.Provider>
      
      <MemoHook></MemoHook>
      <Parent></Parent>
      <RefDom></RefDom>
      <LocalStorageHook></LocalStorageHook>
    </div>
  )
}

export default App
