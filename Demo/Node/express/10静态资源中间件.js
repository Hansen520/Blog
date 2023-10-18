/*
 * @Date: 2023-10-18 15:54:31
 * @Description: description
 */
/**
 * 记录每个请求的 url 与 IP 地址
 */
//导入 express
const express = require("express");

//创建应用对象
const app = express();

// 创建路由
app.get("/", (req, res) => {
  res.send("我才是首页~~~");
});

// 静态资源中间件的设置
app.use(express.static(__dirname + "/public"));

//监听端口, 启动服务
app.listen(3000, () => {
  console.log("服务已经启动, 端口 3000 正在监听中....");
});
