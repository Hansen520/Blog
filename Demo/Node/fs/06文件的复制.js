/*
 * @Date: 2023-10-25 10:22:37
 * @Description: description
 */
const fs = require('fs');
const process = require('process');

/* 方法一 readFile */
// 读取文件内容
// let data = fs.readFileSync('D:\\工作\\工路时间\\员工手册.docx');
// //写入文件
// fs.writeFileSync('./员工手册2.docx', data);
// console.log(process.memoryUsage()); // rss    110710784 字节   105MB

/* 方式二 流式的操作 */
// 创建读取流对象
const rs = fs.createReadStream('D:\\工作\\工路时间\\员工手册.docx');
// 创建写入流对象
const ws = fs.createWriteStream('./员工手册4.docx');
// // 绑定 data 事件
// rs.on('data', chunk => {
//     ws.write(chunk);
// });
// rs.on('end', () => {
//   console.log(process.memoryUsage());  // 43106304   =>  41M
// })

rs.pipe(ws);