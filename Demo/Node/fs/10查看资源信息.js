/*
 * @Date: 2023-10-25 11:02:37
 * @Description: description
 */
const fs = require('fs');

// 2. stat 方法  status 缩写 状态
fs.stat('./员工手册.docx', (err, data) => {
    if (err) {
        console.log('操作失败');
        return;
    }
    console.log(data.isFile(), 13);
    console.log(data.isDirectory(), 14);
});