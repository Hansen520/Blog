/*
 * @Date: 2023-10-18 15:54:31
 * @Description: description
 */
/**
 * 记录每个请求的 url 与 IP 地址
 */
// 导入 express
const express = require("express");
const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');


// 创建应用对象
const app = express();

// 设置
app.use(homeRouter);
app.use(adminRouter);

app.all('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>');
})

//启动服务
app.listen(3000, () => {
  console.log('server is running 3000...');
})