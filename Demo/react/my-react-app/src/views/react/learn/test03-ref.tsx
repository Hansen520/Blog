/*
 * @Author: hansen
 * @Date: 2023-02-03 09:39:06
 * @LastEditors: hansen
 * @LastEditTime: 2023-02-07 14:15:09
 * @FilePath: \user-end\src\pages\Test\index.tsx
 */
/* eslint-disable */
import React, { useImperativeHandle } from 'react';

/*  1forwardRef 转发 Ref */
// ① 场景一：跨层级获取
// 孙组件
function Son(props) {
  const { grandRef } = props;
  return (
    <div>
      <div> i am alien </div>
      <span ref={grandRef}>这个是想要获取元素</span>
    </div>
  );
}

// 父组件
class Father extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Son grandRef={this.props.grandRef} />
      </div>
    );
  }
}
const NewFather = React.forwardRef((props, ref) => <Father grandRef={ref} {...props} />);

// 爷组件
class GrandFather extends React.Component {
  constructor(props) {
    super(props);
  }
  node = null;
  componentDidMount() {
    console.log(this.node); // span #text 这个是想要获取元素
  }
  render() {
    return (
      <div>
        <NewFather ref={(node) => (this.node = node)} />
      </div>
    );
  }
}
// ② 场景二:合并转发ref
// 表单组件
class Form extends React.Component {
  render() {
    return <div>abc</div>;
  }
}
// index组件
class Index extends React.Component {
  componentDidMount(): void {
    /* 关键代码 */
    const { forwardRef } = this.props;
    // 是current哦
    forwardRef.current = {
      /* 这里可以放一些方法供父组件去调用 */
      form: this.form,
      index: this,
      button: this.button,
      name: 'Hansen',
    };
  }
  form = null;
  button = null;
  render() {
    return (
      <div>
        {/* 这种赋值的方式也是获取dom的一种方式 */}
        <button ref={(button) => (this.button = button)}>点击</button>
        <Form ref={(form) => (this.form = form)} />
      </div>
    );
  }
}
/* 通过这里进行转发 */
const ForwardRefIndex = React.forwardRef((props, ref) => <Index {...props} forwardRef={ref} />);
// home 组件
const Home = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    console.log(ref.current);
  }, []);
  return <ForwardRefIndex ref={ref} />;
};

// ③ 场景三：高阶组件转发
const HOC = (Component) => {
  class Wrap extends React.Component {
    render() {
      const { forwardedRef, ...otherprops } = this.props;
      return <Component ref={forwardedRef} {...otherprops} />;
    }
  }
  // 为解决HOC包裹返回原始类组件的问题
  return React.forwardRef((props, ref) => <Wrap forwardedRef={ref} {...props} />);
};
class Index2 extends React.Component {
  render() {
    return <div>hello,world</div>;
  }
}
const HocIndex = HOC(Index2);
const Test2 = () => {
  const node = React.useRef(null);
  React.useEffect(() => {
    console.log(node.current); // Index2组件实例
  }, []);
  return (
    <div>
      <HocIndex ref={node} />
    </div>
  );
};

/* 2ref实现组件的通信 */
// ① 类组件 ref 这种情况通常发生在一些数据层托管的组件上，比如 <Form/> 表单，经典案例可以参考 antd 里面的 form 表单，暴露出对外的 resetFields ， setFieldsValue 等接口，可以通过表单实例调用这些 API 。
class Son1 extends React.Component {
  state = {
    fatherMes: '',
    sonMes: '',
  };
  fatherSay = (fatherMes) => this.setState({ fatherMes });
  render() {
    const { fatherMes, sonMes } = this.state;
    return (
      <div className="sonbox">
        <div className="title">子组件</div>
        <p>父组件对我说：{fatherMes}</p>
        <div className="label">对父组件说</div>{' '}
        <input onChange={(e) => this.setState({ sonMes: e.target.value })} className="input" />
        <button className="searchbtn" onClick={() => this.props.toFather(sonMes)}>
          to father
        </button>
      </div>
    );
  }
}
/* 父组件 */
const Father1 = () => {
  const [ sonMes , setSonMes ] = React.useState('') 
  const sonInstance = React.useRef(null) /* 用来获取子组件实例 */
  const [ fatherMes , setFatherMes ] = React.useState('')
  const toSon =()=> sonInstance.current.fatherSay(fatherMes) /* 调用子组件实例方法，改变子组件state */
  return <div className="box" >
      <div className="title" >父组件</div>
      <p>子组件对我说：{ sonMes }</p>
      <div className="label" >对子组件说</div> <input onChange={ (e) => setFatherMes(e.target.value) }  className="input"  /> 
      <button className="searchbtn"  onClick={toSon}  >to son</button>
      <Son1 ref={sonInstance} toFather={setSonMes} />
  </div>
}
// ② 函数组件 forwardRef + useImperativeHandle
// useImperativeHandle 接受三个参数：
// 第一个参数 ref : 接受 forWardRef 传递过来的 ref 。
// 第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的 ref 对象。
// 第三个参数 deps :依赖项 deps，依赖项更改形成新的 ref 对象
const Son2 = (props, ref) => {
  const inputRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState('');
  useImperativeHandle(ref, () => {
    const handleRefs = {
      onFocus() {
        inputRef.current.focus();
      },
      onChangeValue(value) {
        setInputValue(value);
      }
    };
    return handleRefs
  }, [])
  return <div>
    <input placeholder='请输入内容' ref={inputRef} value={inputValue} />
  </div>
}
const ForwarSon = React.forwardRef(Son2);

// 父组件
class Index1 extends React.Component {
  cur = null;
  handerClick() {
    const { onFocus, onChangeValue } = this.cur;
    onFocus() // 让子组件的输入框获取焦点
    onChangeValue('let us learn React!') // 让子组件input
  };
  render() {
    return <div style={{ marginTop: '50px' }}>
      <ForwarSon ref={cur => (this.cur = cur)}/>
      <button onClick={this.handerClick.bind(this)}>操控子组件</button>
    </div>
  }
}

/* 3 函数组件缓存数据 */
/*
  这种情况下，useRef 就派上用场了，上面讲到过，useRef 可以创建出一个 ref 原始对象，只要组件没有销毁，ref 对象就一直存在，那么完全可以把一些不依赖于视图更新的数据储存到 ref 对象中。
  这样做的好处有两个：
  第一个能够直接修改数据，不会造成函数组件冗余的更新作用。
  第二个 useRef 保存数据，如果有 useEffect ，useMemo 引用 ref 对象中的数据，无须将 ref 对象添加成 dep 依赖项，因为 useRef 始终指向一个内存空间，所以这样一点好处是可以随时访问到变化后的值。
*/
const toLearn = [ { type: 1 , mes:'let us learn React' } , { type:2,mes:'let us learn Vue3.0' }  ];
const Index3 = ({ id }) => {
  const typeInfo = React.useRef(toLearn[0]);
  console.log(typeInfo, 217);
  const changeType = (info) => {
    console.log(info, 219);
    typeInfo.current = info; /* typeInfo 的改变，不需要视图变化 */
  }
  React.useEffect(() => {
    if(typeInfo.current.type===1){
      /* ... */
    }
  }, [id]);
  return <div>
    { toLearn.map(item=> <button key={item.type}  onClick={ changeType.bind(null,item) } >{ item.mes }</button> ) }
  </div>
}

/* 四 ref 原理揭秘 */
class Index4 extends React.Component{
  state={ num:0 }
  node = null
  render(){
      return <div >
          <div ref={(node)=>{
             this.node = node
             console.log('此时的参数是什么：', this.node )
          }}  >ref元素节点</div>
          <button onClick={()=> this.setState({ num: this.state.num + 1  }) } >点击</button>
      </div>
  }
}

class Index5 extends React.Component{
  state={ num:0 }
  node = null
  getDom= (node)=>{
      this.node = node
      console.log('此时的参数是什么：', this.node )
   }
  render(){
      return <div >
          <div ref={this.getDom}>ref元素节点</div>
          <button onClick={()=> this.setState({ num: this.state.num + 1  })} >点击</button>
      </div>
  }
}
export default Index5;
 
