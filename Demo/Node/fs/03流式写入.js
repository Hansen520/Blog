/*
 * @Date: 2023-10-25 09:54:41
 * @Description: description
 */
//1. 导入 fs 
const fs = require('fs');

//2. 创建写入流对象 
const ws = fs.createWriteStream('./春晓.txt');

//3. write
ws.write('春眠不觉晓\r\n');
ws.write('处处闻啼鸟\r\n');
ws.write('夜来风雨声\r\n');
ws.write('花落知多少\r\n');

//4. 关闭通道
ws.close();