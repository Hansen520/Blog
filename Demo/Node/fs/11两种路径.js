/*
 * @Date: 2023-10-25 11:10:24
 * @Description: description
 */
//1. 导入 fs 模块
const fs = require('fs');

//相对路径
// fs.writeFileSync('./index.html', 'love');
// fs.writeFileSync('index.html', 'love');
// fs.writeFileSync('../index.html', 'love');

//绝对路径
// fs.writeFileSync('D:/index.html', 'love');
fs.writeFileSync('/index.html', 'love');