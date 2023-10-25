/*
 * @Date: 2023-10-25 10:08:29
 * @Description: description
 */
//1. 引入 fs 模块
const fs = require('fs');

//2. 创建读取流对象
const rs = fs.createReadStream('D:\\工作\\工路时间\\员工手册.docx');

//3. 绑定 data 事件   chunk 块儿  大块儿
rs.on('data', chunk => {
    console.log(chunk.length);
})

//4. end  可选事件
rs.on('end', () => {
    console.log('读取完成');
})