/*
 * @Date: 2023-10-25 10:50:55
 * @Description: description
 */
const fs = require("fs");

// fs.rename('./座右铭.txt', './论语.txt', err => {
//   if(err) {
//     console.log('操作失败~');
//     return;
//   }
//   console.log('操作成功');
// });

//文件的移动
fs.rename("./论语.txt", "../资料/座右铭.txt", (err) => {
  if (err) {
    console.log("操作失败~");
    return;
  }
  console.log("操作成功");
});
