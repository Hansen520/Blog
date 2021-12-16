const func1 = () => {
  console.log('func1开始');
  func2();
  console.log('func1结束');
};
const func2 = () => {
  console.log('func2开始');
  func3();
  console.log('func2结束');
};
const func3 = () => {
  console.log('func3开始');
  console.log('func3结束');
};

func1();
