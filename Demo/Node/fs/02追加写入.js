/*
 * @Date: 2023-10-25 09:37:07
 * @Description: description
 */
const fs = require("fs");
fs.appendFile("./座右铭.txt", "善恶到头终会报", (err) => {
  if (err) {
    console.log("追加写入失败~~");
    return;
  }
  console.log("追加写入成功");
});

fs.appendFileSync('./座右铭.txt', '\r\n温故而知新, 可以为师矣')

//writeFile 实现追加写入
fs.writeFile("./座右铭.txt", "love love love", { flag: "a" }, (err) => {
  if (err) {
    console.log("写入失败~");
    return;
  }
  console.log("写入成功");
});
