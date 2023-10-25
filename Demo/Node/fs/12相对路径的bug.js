/*
 * @Date: 2023-10-25 11:10:51
 * @Description: description
 */
// 
const fs = require('fs');

// 相对路径参照物: 命令行的工作目录, 如果你在上一级目录执行这条命令,那么就会在上一级的当前目录上做了错误的操作
// fs.writeFileSync('./index.html', 'love');

//绝对路径 '全局变量' 保存的是: 所在文件的所在目录的绝对路径
// console.log(__dirname);
fs.writeFileSync(__dirname + '/index.html', 'love');
