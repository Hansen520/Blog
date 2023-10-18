/*
 * @Date: 2023-10-18 14:41:29
 * @Description: description
 */
//导入 express
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由(需要对应路由的地址才可以)
app.get("/:id.html", (req, res) => {
  // 获取 URL 路由参数
  console.log(req.params.id);
  res.setHeader("content-type", "text/html;charset=utf-8");
  res.end("商品详情1");
});

// 监听端口， 启动服务
app.listen(3000, () => {
  console.log("服务已经启动, 端口3000正在监听中....");
});
