/*
 * @Date: 2024-12-16 13:38:11
 * @Description: description
 */
// const fs = require('node:fs');
module.exports = function (source) {
  const filePath = this.resourcePath.replace(/\\/g, '/');;
  console.log("filePath--->", filePath);
  // fs.writeFileSync('./source.js', source);
  // const options = this.getOptions();
  // console.log('options--->', options);
  // 插入上报函数
  // 定义要插入的上报函数
  const methodCallRegex = /function targetMethod\(a\)/g; // 匹配 targetMethod() 调用的正则表达式

  const modifiedSource = source.replace(methodCallRegex, function (match) {
    console.log("match--->", match);
    return `targetMethod('${filePath}');${match}`;
  });
  const reportFunction = `
  function report() {
    console.log('上报数据');
    // 实际的上报逻辑可以在这里实现，比如发送数据到服务器
  }
  report();
`;
console.log(modifiedSource, 27);
  return reportFunction + modifiedSource.replace('World', ', I am jinhansheng');
};
