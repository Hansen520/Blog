/*
 * @Author: hansen
 * @Date: 2023-02-07 14:35:33
 * @LastEditors: hansen
 * @LastEditTime: 2023-02-17 16:31:53
 * @FilePath: \user-endd:\project\Blog\Demo\react\my-react-app\src\views\react\learn\test07处理海量数据.tsx
 */
import React from "react";

/** 海量数据处理 未时间分片 */
// 获取随机颜色
// function getColor() {
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   return "rgba(" + r + "," + g + "," + b + ",0.8)";
// }
// // 获取随机位置
// function getPostion(position) {
//   const { width, height } = position;
//   return {
//     width: "5px",
//     height: "5px",
//     borderRadius: "5px",
//     position: "absolute",
//     left: Math.ceil(Math.random() * width) + "px",
//     top: Math.ceil(Math.random() * height) + "px",
//   };
// }
// // 色块组件
// function Circle({ position }) {
//   const style = React.useMemo(() => {
//     //用useMemo缓存，计算出来的随机位置和色值。
//     return {
//       background: getColor(),
//       ...getPostion(position),
//     };
//   }, []);
//   return <div style={style} className="circle" />;
// }

// class Index extends React.Component {
//   state = {
//     dataList: [], // 数据源列表
//     renderList: [], // 渲染列表
//     position: { width: 0, height: 0 }, // 位置信息
//   };
//   box = React.createRef();
//   componentDidMount() {
//     const { offsetHeight, offsetWidth } = this.box.current;
//     const originList = new Array(20000).fill(1);
//     console.log(offsetHeight, offsetWidth);
//     this.setState({
//       position: { height: offsetHeight, width: offsetWidth },
//       dataList: originList,
//       renderList: originList,
//     });
//   }
//   render() {
//     const { renderList, position } = this.state;
//     return (
//       <div style={{ width: "800px", height: "800px", position: "relative" }} ref={this.box}>
//         {renderList.map((item, index) => (
//           <Circle position={position} key={index} />
//         ))}
//       </div>
//     );
//   }
// }
// /* 控制展示Index */
// const Test = () => {
//   const [show, setShow] = React.useState(false);
//   const [btnShow, setBtnShow] = React.useState(true);
//   const handleClick = () => {
//     setBtnShow(false);
//     setTimeout(() => {
//       setShow(true);
//     }, 500);
//   };
//   return (
//     <div style={{ position: "relative" }}>
//       {btnShow && <button onClick={handleClick}>show</button>}
//       {show && <Index />}
//     </div>
//   );
// };

// export default Test;

/* * 海量数据处理 有时间分片 */
// import React from "react";

// function getColor() {
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   return "rgba(" + r + "," + g + "," + b + ",0.8)";
// }
// // 获取随机位置
// function getPostion(position) {
//   const { width, height } = position;
//   return {
//     width: "6px",
//     height: "6px",
//     position: "absolute",
//     borderRadius: "3px",
//     left: Math.ceil(Math.random() * width) + "px",
//     top: Math.ceil(Math.random() * height) + "px",
//   };
// }
// // 色块组件
// function Circle({ position }) {
//   const style = React.useMemo(() => {
//     //用useMemo缓存，计算出来的随机位置和色值。
//     return {
//       background: getColor(),
//       ...getPostion(position),
//     };
//   }, []);
//   return <div style={style} className="circle" />;
// }

// class Index extends React.Component {
//   state = {
//     dataList: [], // 数据源列表
//     renderList: [], // 渲染列表
//     position: { width: 0, height: 0 }, // 位置信息
//     eachRenderNum: 500, // 每次渲染的数量
//   };
//   box = React.createRef();
//   componentDidMount() {
//     const { offsetHeight, offsetWidth } = this.box.current;
//     const originList = new Array(2000).fill(1);
//     const times = Math.ceil(originList.length / this.state.eachRenderNum); // 计算需要渲染的此次数
//     let index = 1;
//     this.setState(
//       {
//         dataList: originList,
//         position: { height: offsetHeight, width: offsetWidth },
//       },
//       () => {
//         this.toRenderList(index, times);
//       }
//     );
//   }
//   // 渲染
//   toRenderList = (index, times) => {
//     console.log(index, times, 58);
//     if (index === times) return; // 渲染完成则退出
//     const { renderList } = this.state;
//     renderList.push(this.renderNewList(index)); // 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染
//     this.setState({
//       renderList,
//     });
//     // 主要是通过requestIdleCallback 或者是setTimeout去递归调用toRenderList去渲染页面进程
//     requestIdleCallback(() => {
//       this.toRenderList(++index, times);
//     });
//   };
//   // 得到最新的渲染列表
//   renderNewList(index) {
//     const { dataList, position, eachRenderNum } = this.state;
//     const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum);
//     return (
//       <React.Fragment key={index}>
//         {list.map((item, index) => {
//           return <Circle key={index} position={position} />;
//         })}
//       </React.Fragment>
//     );
//   }
//   render() {
//     return (
//       <div className="bigData_index" style={{ width: "800px", height: "500px", position: "relative" }} ref={this.box}>
//         {this.state.renderList}
//       </div>
//     );
//   }
// }
// // 控制展示Index
// const Test = () => {
//   const [show, setShow] = React.useState(false);
//   const [btnShow, setBtnShow] = React.useState(true);
//   const handleClick = () => {
//     setBtnShow(false);
//     setInterval(() => {
//       setShow(true);
//     }, 500);
//   };
//   return (
//     <div>
//       {btnShow && <button onClick={handleClick}>show</button>}
//       {show && <Index />}
//     </div>
//   );
// };

// export default Test;


/** 虚拟列表渲染 */
/* *虚拟列表的实现 */
const VirtualList = () => {
  const [dataList, setDataList] = React.useState([]); // 保存数据源
  const [position, setPosition] = React.useState([0, 0]); // 截取缓冲区 + 视图区索引
  const scroll = React.useRef(null); // 获取crll元素
  const box = React.useRef(null); // 获取元素用于容器高度
  const context = React.useRef(null); // 用于移动视图区域，形成滑动效果
  const scrollInfo = React.useRef({
    height: 500, // 容器高度
    bufferCount: 8, // 缓冲区个数
    itemHeight: 60, // 每一个item的高度
    renderCount: 0, // 渲染区个数
  });
  React.useEffect(() => {
    const height = box.current.offsetHeight; // 可视区的高度
    const { itemHeight, bufferCount } = scrollInfo.current; // 当前滚动的信息
    const renderCount = Math.ceil(height / itemHeight) + bufferCount; // 这个也可以说是容器下dom的个数
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight }; // dom， 总高，缓冲个数，单条高
    const dataList = new Array(10000).fill(1).map((item, index) => index + 1); // 创建虚拟数据
    setDataList(dataList);
    setPosition([0, renderCount]);
  }, []);
  const handleScroll = () => {
    const { scrollTop } = scroll.current; // 距离上边的位置
    const { itemHeight, renderCount } = scrollInfo.current; // 滚动条的信息
    const currentOffset = scrollTop - (scrollTop % itemHeight); // 当前的偏移量
    const start = Math.floor(scrollTop / itemHeight); // 开始的位置
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`; // 偏移，造成下滑效果
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1); // 已经滚过去的个数 + 此容器的dom数 + 1
    // 如果render内容发生变化，那么截取
    if (end !== position[1] || start !== position[0]) {
      setPosition([start, end]);
    }
  };
  const { itemHeight, height } = scrollInfo.current;
  const [ start ,end ] = position
  const renderList = dataList.slice(start,end) /* 渲染区间 */
  console.log('渲染区间',position)
  return (
    <div
      style={{
        position: "relative",
        top: "60px",
        overflow: "scroll",
        left: 0,
        bottom: 0,
        right: 0,
      }}
      ref={box}
    >
      <div
        style={{ overflow: "scroll", position: "relative", height: height + "px" }}
        onScroll={handleScroll}
        ref={scroll}
      >
        <div
          style={{ position: "absolute", left: "0", top: "0", right: "0", height: `${dataList.length * itemHeight}px` }}
        />
        <div className="context" ref={context}>
          {renderList.map((item, index) => (
            <div style={{
              backgroundColor: '#00B96B',
              color: '#fff',
              height: '50px',
              margin: '0 24px 10px 24px',
              lineHeight: '50px'
            }} key={index}>
              {item + ""} Item{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VirtualList;
