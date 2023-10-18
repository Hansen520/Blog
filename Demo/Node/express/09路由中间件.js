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

/* 声明中间件，只有通过才继续执行 */
let checkCodeMiddleware = (req, res, next) => {
  /* 判断 URL 中是否 code 参数等于 521 */
  if (req.query.code === '521') {
    next();
  } else {
    res.send('暗号错误');
  }
}

//创建路由
app.get('/home', (req, res) => {
  res.send('前台首页');
});

app.get('/admin', checkCodeMiddleware, (req, res) => {
  res.send('后台首页');
});
app.get('/other', checkCodeMiddleware, (req, res) => {
  res.send('其他页面');
});

app.all('*',(req, res) => {
  res.send('<h1>404 Not Found</h1>')
})

//监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口 3000 正在监听中....')
})