import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

function Parent(props) {
  return props.children;
}

function Child() {
  return <div>child</div>;
}

function Son(props) {
  console.log(props);
  return <div> hello,world </div>;
}

function Father(props) {
  // const { age, ...fatherProps } = props;
  return React.cloneElement(props.children, { mes: 'let us learn React1 !' });
  // return <Son {...fatherProps} />;
}

function TestComponent() {
  const [number, setNumber] = React.useState(0);
  const indexProps = {
    name: 'alien',
    age: '28',
    mes: 'let us learn React !',
  };
  React.useEffect(() => {
    console.log('监听number变化, 此时的number是:  ' + number);
  }, [number]);
  const handleClick = () => {
    React.flushSync(() => {
      setNumber(2);
    });
    /* 批量更新 */
    setNumber(1);
    /* 滞后更新，批量更新规则被打破 */
    setTimeout(() => {
      setNumber(3);
    });
  };
  console.log(number);
  return (
    <div>
      <button onClick={handleClick}>按钮</button>
      hello,React{' '}
      <Parent>
        <Child />
      </Parent>
      {/* <Father {...indexProps} /> */}
      <Father>
        <Son name="alien" age="28" />
      </Father>
    </div>
  );
}

/*
  一些组件
*/
/* 类 */
class TextClass {
  sayHello = () => console.log('hello, my name is alien');
}

/* 类组件 */
class Index extends React.Component {
  state = { message: 'hello, world!' };
  sayHello = () => this.setState({ message: 'hello, my name is alien' });
  render() {
    return (
      <div style={{ marginTop: '50px' }} onClick={this.sayHello}>
        {' '}
        {this.state.message}{' '}
      </div>
    );
  }
}

/* 函数 */
function textFun() {
  return 'hello, world';
}
/* 函数组件 */
function FunComponent() {
  const [message, setMessage] = useState('hello,world');
  return <div onClick={() => setMessage('hello, my name is alien')}>{message}</div>;
}

function Test() {
  return (
    <div>
      {_jsxs('div', {
        children: [
          _jsx('h1', {
            children: 'hello,world',
          }),
          _jsx('span', {
            children: 'let us learn React',
          }),
        ],
      })}
      Test
      <TestComponent />
    </div>
  );
}

export default Test;
