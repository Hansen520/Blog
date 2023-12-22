const fs= require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n'); // 代码的关键
}

// 生成write Stream
function createWriteStream(fileName) {
    const fullPath = path.join(__dirname, '../', '../', 'logs', fileName); // 拼接文件路径
    return fs.createWriteStream(fullPath, { flags: 'a' }); // 返回可写流
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log');
function access(log) {
    writeLog(accessWriteStream, log);
}

module.exports = {
    access
}