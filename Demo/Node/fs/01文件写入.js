/*
 * @Date: 2023-10-25 09:28:02
 * @Description: desc
 */
const fs = require('fs');

/* 异步写入文件 */
// fs.writeFile('./座右铭.txt', '三人行，必有我师焉，勿以恶小而为之，勿以善小而不为', err => {
//     if (err) {
//         console.log('写入失败');
//         return;
//     }
//     console.log('写入成功');
// })

//同步写入
fs.writeFileSync('./座右铭.txt', '三人行，必有我师焉，勿以恶小而为之，勿以善小而不为');