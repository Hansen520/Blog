/*
 * @Date: 2023-10-18 15:54:31
 * @Description: description
 */
/**
 * 记录每个请求的 url 与 IP 地址
 */
//导入 express
const express = require("express");
const bodyParser = require('body-parser')

//创建应用对象
const app = express();

// 声明中间件
app.use((req, res, next) => {
  // 检测请求头中的 referer 是否为 127.0.0.1
  // 获取 referer
  let referer = req.get('referer');
  if (referer) {
    // 实例化
    let url = new URL(referer);
    // 获取hostname
    let hostname = url.hostname;
    if (hostname !== '127.0.0.1') {
      // 前端图片访问地址为http://127.0.0.1:3000/images/logo.png
      res.status(404).send('<h1>404 Not Found</h1>');
      return;
    }
  }
  next();
})

//静态资源中间件设置
app.use(express.static(__dirname + '/public'));

//启动服务
app.listen(3000, () => {
  console.log('server is running 3000...');
})