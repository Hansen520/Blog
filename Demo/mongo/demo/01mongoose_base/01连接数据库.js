/*
 * @Date: 2023-10-12 17:47:52
 * @Description: description
 */
// 1. 安装 mongoose
// 2. 导入mongoose
const mongoose = require("mongoose");

// 设置strictQuery 为 true
mongoose.set('strictQuery', true);

// 3. 连接 mongodb
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调 once只执行一次事件
mongoose.connection.once("open", () => {
  console.log("连接成功");
}); // 设置成功的回调;
mongoose.connection.on("error", () => {
  console.log("连接失败");
}); // 设置连接错误的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
}); // 设置i链接关闭的回调

// 关闭mongodb的连接
setInterval(() => {
    mongoose.disconnect();
}, 3000)
