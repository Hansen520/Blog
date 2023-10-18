/*
 * @Date: 2023-10-18 15:54:31
 * @Description: description
 */
/**
 * 记录每个请求的 url 与 IP 地址
 */
//导入 express
const express = require('express');
const fs = require('fs');
const path = require('path');

//创建应用对象
const app = express();

/* 中间函数声明 */
function recordMiddleware (req, res, next) {
    let { url, ip } = req;
    /* 将信息保存在文件中 access.log */
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url}  ${ip}\r\n`);
    //调用 next
    next();
}
//使用中间件函数
app.use(recordMiddleware);

//创建路由
app.get('/home', (req, res) => {
  res.send('前台首页');
});

app.get('/admin', (req, res) => {
  res.send('后台首页');
});

app.all('*',(req, res) => {
  res.send('<h1>404 Not Found</h1>')
})

//监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....')
})