import React from "react";

/* *虚拟列表的实现 */
function getColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.8)";
}
// 获取随机位置
function getPostion(position) {
  const { width, height } = position;
  return {
    width: "6px",
    height: "6px",
    position: "absolute",
    borderRadius: "3px",
    left: Math.ceil(Math.random() * width) + "px",
    top: Math.ceil(Math.random() * height) + "px",
  };
}
// 色块组件
function Circle({ position }) {
  const style = React.useMemo(() => {
    //用useMemo缓存，计算出来的随机位置和色值。
    return {
      background: getColor(),
      ...getPostion(position),
    };
  }, []);
  return <div style={style} className="circle" />;
}

class Index extends React.Component {
  state = {
    dataList: [], // 数据源列表
    renderList: [], // 渲染列表
    position: { width: 0, height: 0 }, // 位置信息
    eachRenderNum: 5, // 每次渲染的数量
  };
  box = React.createRef();
  componentDidMount() {
    const { offsetHeight, offsetWidth } = this.box.current;
    const originList = new Array(20000).fill(1);
    const times = Math.ceil(originList.length / this.state.eachRenderNum); // 计算需要渲染的此次数
    let index = 1;
    this.setState(
      {
        dataList: originList,
        position: { height: offsetHeight, width: offsetWidth },
      },
      () => {
        this.toRenderList(index, times);
      }
    );
  }
  // 渲染
  toRenderList = (index, times) => {
    console.log(index, times, 58);
    if (index === times) return; // 渲染完成则退出
    const { renderList } = this.state;
    renderList.push(this.renderNewList(index)); // 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染
    this.setState({
      renderList,
    });
    // 主要是通过requestIdleCallback 或者是setTimeout去递归调用toRenderList去渲染页面进程
    requestIdleCallback(() => {
      this.toRenderList(++index, times);
    });
  };
  // 得到最新的渲染列表
  renderNewList(index) {
    const { dataList, position, eachRenderNum } = this.state;
    const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum);
    return (
      <React.Fragment key={index}>
        {list.map((item, index) => {
          return <Circle key={index} position={position} />;
        })}
      </React.Fragment>
    );
  }
  render() {
    return (
      <div className="bigData_index" style={{ width: "800px", height: "500px", position: "relative" }} ref={this.box}>
        {this.state.renderList}
      </div>
    );
  }
}
// 控制展示Index
const Test = () => {
  const [show, setShow] = React.useState(false);
  const [btnShow, setBtnShow] = React.useState(true);
  const handleClick = () => {
    setBtnShow(false);
    setInterval(() => {
      setShow(true);
    }, 500);
  };
  return (
    <div>
      {btnShow && <button onClick={handleClick}>show</button>}
      {show && <Index />}
    </div>
  );
};
export default Test;