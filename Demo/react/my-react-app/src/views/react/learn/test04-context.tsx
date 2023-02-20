/*
 * @Author: hansen
 * @Date: 2023-02-07 14:35:33
 * @LastEditors: hansen
 * @LastEditTime: 2023-02-13 17:37:45
 * @FilePath: \user-endd:\project\Blog\Demo\react\my-react-app\src\views\react\learn\test04-context.tsx
 */
import React from "react";
import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined } from "@ant-design/icons";

// const ThemeContext = React.createContext(null);

/* * 新版本提供者 */
// const ThemeProvider = ThemeContext.Provider; // 提供者
// const ProviderDemo = () => {
//   const [ contextValue , setContextValue ] = React.useState({ color:'#ccc', background:'pink' })
//   return <div>
//     {/* 在这边提供数据 */}
//     <ThemeProvider value={contextValue}>
//       <Son1 />
//     </ThemeProvider>
//   </div>
// }

/* * 新版本消费者 */

// ① 类组件之contextType 方式 只支持类组件
// class ConsumerDemo extends React.Component {
//   render() {
//     const { color, background } = this.context;
//     return <div style={{ color, background }}>消费者</div>
//   }
// }
// ConsumerDemo.contextType = ThemeContext;
// const Son1 = () => <ConsumerDemo />

// ② 函数组件之 useContext 方式
// const ConsumerDemo = () => {
//   const contextValue = React.useContext(ThemeContext);
//   const { color, background } = contextValue;
//   return <div style={{ color, background }}>消费者</div>
// }
// const Son1 = () => <ConsumerDemo />

// ③ 订阅者之 Consumer 方式
// const ThemeConsumer = ThemeContext.Consumer; // 订阅消费者
// const ConsumerDemo = (props) => {
//   const { color, background } = props
//   return <div style={{ color, background }}>消费者</div>
// }
// const Son1 = () => {
//   <ThemeConsumer>
//       { /* 将 context 内容转化成 props  */ }
//       { (contextValue) => <ConsumerDemo { ...contextValue }/> }
//   </ThemeConsumer>
// }

/* * 4 动态context */
// const ConsumerDemo = () => {
//   const { color, background } = React.useContext(ThemeContext); // 使用他
//   return <div style={{ color, background }}>消费者</div>
// }
// const Son = React.memo(() => <ConsumerDemo />); // 子组件

// const ThemeProvider = ThemeContext.Provider; // 提供者
// const ProviderDemo = () => {
//   const [ contextValue , setContextValue ] = React.useState({  color:'#ccc', background:'pink' })
//   return <div>
//     <ThemeProvider value={contextValue}>
//       <Son />
//     </ThemeProvider>
//     <button onClick={() => setContextValue({ color: '#fff', background: 'blue' })}>切换主题</button>
//   </div>
// };

/* context高阶用法 多个Provider之间的相互嵌套 */
// const ThemeContext = React.createContext(null); // 主题颜色
// const LanContext = React.createContext(null); // 主题语言Context

// function ConsumerDemo() {
//   return (
//     <ThemeContext.Consumer>
//       {(themeContextValue) => (
//         <LanContext.Consumer>
//           {(lanContextValue) => {
//             const { color, background } = themeContextValue;
//             return <div style={{ color, background } } > { lanContextValue === 'CH'  ? '大家好，让我们一起学习React!' : 'Hello, let us learn React!'  }  </div>
//           }}
//         </LanContext.Consumer>
//       )}
//     </ThemeContext.Consumer>
//   );
// }
// const Son = React.memo(() => <ConsumerDemo />);
// const ProviderDemo = () => {
//   const [ themeContextValue ] = React.useState({ color: '#fff', background: 'green' });
//   const [ lanContextValue ] = React.useState('EN');
//   return <ThemeContext.Provider value={themeContextValue}>
//     <LanContext.Provider value={lanContextValue}>
//       <Son />
//     </LanContext.Provider>
//   </ThemeContext.Provider>
// };

/* * Context进阶 逐层传递Provider */
// const ThemeContext = React.createContext(null);
// function Son2() {
//   return (
//     <ThemeContext.Consumer>
//       {/* 也可以用函数的方式拿到对应的值 */}
//       {(themeContextValue2) => {
//         const { color, background } = themeContextValue2;
//         return <div className="sonbox" style={{ color, background }}>第二层Provider</div>
//       }}
//     </ThemeContext.Consumer>
//   );
// }
// function Son() {
//   // 可以通过 React.useContext拿到对应的值
//   const { color, background } = React.useContext(ThemeContext);
//   const [ themeContextValue2 ] = React.useState({ color: '#fff', background: 'blue' });
//   // 第二层 Provider 传递内容
//   return <div className="box" style={{ color, background }}>
//     第一层Provider
//     <ThemeContext.Provider value={ themeContextValue2 }>
//       <Son2 />
//     </ThemeContext.Provider>
//   </div>
// };

// const Provider1Demo = () => {
//   const [ themeContextValue ] = React.useState({ color: 'orange', background: 'pink' });
//   /* 第一层  Provider 传递内容  */
//   return <ThemeContext.Provider value={ themeContextValue } >
//   <Son/>
// </ThemeContext.Provider>
// };
// 全局只有一个 ThemeContext ，两次用 provider 传递两个不同 context 。
// 组件获取 context 时候，会获取离当前组件最近的上一层 Provider 。
// 下一层的 provider 会覆盖上一层的 provider

/* *进阶实践-切换主题模式 */
const ThemeContext = React.createContext(null); // 主题颜色Context
const theme = {
  //主题颜色
  dark: { color: "#1890ff", background: "#1890ff", border: "1px solid blue", type: "dark" },
  light: { color: "#fc4838", background: "#fc4838", border: "1px solid pink", type: "light" },
};
// input输入框 - useContext 模式
function Input(props) {
  const { color, border } = React.useContext(ThemeContext);
  const { label, placeholder } = props;
  return (
    <div>
      <label style={{ color }}>{label}</label>
      <input className="input" placeholder={placeholder} style={{ border }} />
    </div>
  );
}
// 容器组件 - Consumer模式
function Box(props) {
  return (
    <ThemeContext.Consumer>
      {(themeContextValue) => {
        const { border, color } = themeContextValue;
        return (
          <div className="context_box" style={{ border, color }}>
            {props.children}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

function Checkbox(props) {
  const { label, name, onChange } = props;
  const { type, color } = React.useContext(ThemeContext);
  return (
    <div className="checkbox" onClick={onChange}>
      <label htmlFor="name"> {label} </label>
      <input type="checkbox" id={name} value={type} name={name} checked={type === name} style={{ color }} />
    </div>
  );
}

// contextType 模式
class App extends React.PureComponent {
  // 这个只有类组件才这么写
  static contextType = ThemeContext;
  render() {
    const { border, setTheme, color, background } = this.context;
    return (
      <div className="context_app" style={{ border, color }}>
        <div className="context_change_theme">
          <span> 选择主题： </span>
          <Checkbox label="light" name="light" onChange={() => setTheme(theme.light)} />
          <Checkbox label="dark" name="dark" onChange={() => setTheme(theme.dark)} />
        </div>
        <div className="box_content">
          <Box>
            <Input label="姓名：" placeholder="请输入姓名" />
            <Input label="age：" placeholder="请输入年龄" />
            <button className="searchbtn" style={{ background }}>
              确定
            </button>
            <button className="concellbtn" style={{ color }}>
              取消
            </button>
          </Box>
          <Box>
            <HomeOutlined twoToneColor={color} />
            <SettingFilled twoToneColor={color} />
            <SmileOutlined twoToneColor={color} />
            <SyncOutlined spin twoToneColor={color} />
            <SmileOutlined twoToneColor={color} rotate={180} />
            <LoadingOutlined twoToneColor={color} />
          </Box>
          <Box>
            <div className="person_des" style={{ color: "#fff", background }}>
              I am alien <br />
              let us learn React!
            </div>
          </Box>
        </div>
      </div>
    );
  }
}
const Demo = () => {
  const [themeContextValue, setThemeContext] = React.useState(theme.dark);
  // 传递颜色主题 和 改变主题的方法
  return (
    <ThemeContext.Provider value={{ ...themeContextValue, setTheme: setThemeContext }}>
      { JSON.stringify(themeContextValue) }
      {/* 这才是主流的做法 */}
      <App />
    </ThemeContext.Provider>
  );
};

export default Demo;
