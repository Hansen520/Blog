/*
 * @Date: 2023-10-18 14:31:59
 * @Description: description
 */
const express = require('express');
/* 创建应用对象 */
const app = express();

/* 创建路由 */
app.get('/home', (req, res) => {
    res.end('hello express')
})

/* 监听端口，启动服务 */
app.listen(3000, () => {
    console.log('启动服务在 3000 端口');
})