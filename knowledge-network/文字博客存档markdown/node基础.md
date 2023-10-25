# 1fs

fs在文件的操作中，起着举足轻重的作用，我们要好好学习这一块的内容为自己所用！以下所有都要引入fs的模块

`const fs = require('fs')`

## 01文件写入

分同步(writeFile)和异步(writeFileSync)写入

异步写入

```javascript
fs.writeFile('./座右铭.txt', '三人行，必有我师焉，勿以恶小而为之，勿以善小而不为', err => {
    if (err) {
        console.log('写入失败');
        return;
    }
    console.log('写入成功');
})
```

异步写入

```javascript
fs.writeFileSync('./座右铭.txt', '三人行，必有我师焉，勿以恶小而为之，勿以善小而不为');
```

## 02追加写入

异步追加

```javascript
fs.appendFile("./座右铭.txt", "善恶到头终会报", (err) => {
  if (err) {
    console.log("追加写入失败~~");
    return;
  }
  console.log("追加写入成功");
});
```

同步追加

```javascript
fs.appendFileSync('./座右铭.txt', '\r\n温故而知新, 可以为师矣')
```

通过写入函数的增加

`fs.writeFile(file, data[, options], callback)`

`file`：文件名或文件描述符。
`data`：要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
`options`：该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 ‘w’
`callback`：回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

```javascript
fs.writeFile("./座右铭.txt", "love love love", { flag: "a" }, (err) => {
  if (err) {
    console.log("写入失败~");
    return;
  }
  console.log("写入成功");
});
```

中间{ flag: "a" }代表写入增加，我们还有其他的选项，如下所示



flags	描述
r	以读取模式打开文件。如果文件不存在抛出异常。
r+	以读写模式打开文件。如果文件不存在抛出异常。
rs	以同步的方式读取文件。
rs+	以同步的方式读取和写入文件。
w	以写入模式打开文件，如果文件不存在则创建。
wx	类似 ‘w’，但是如果文件路径存在，则文件写入失败。
w+	以读写模式打开文件，如果文件不存在则创建。
wx+	类似 ‘w+’， 但是如果文件路径存在，则文件读写失败。
a	以追加模式打开文件，如果文件不存在则创建。
ax	类似 ‘a’， 但是如果文件路径存在，则文件追加失败。
a+	以读取追加模式打开文件，如果文件不存在则创建。
ax+	类似 ‘a+’， 但是如果文件路径存在，则文件读取追加失败。

## 03流式写入

**同步文件写入、异步文件写入、简单文件写入，都不适合大文件的写入，性能较差，容易导致内存溢出。而我们流式文件写入的方式类似于异步，是大文件写入的最佳选择。**

- 我们可以通过open和close事件，来监听流的打开与关闭。
- 一旦你打开了 Writable 文件流，就可以使用 write() 方法来写入它，写入完成后，在调用 end() 方法来关闭流。

代码如下

```javascript
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
```

## 04文件读取

异步读取

```javascript
//2. 异步读取
fs.readFile("./春晓.txt", (err, data) => {
  if (err) {
    console.log("读取失败~~");
    return;
  }
  console.log(data.toString());
});
```

同步读取

```javascript
let data = fs.readFileSync('./春晓.txt');

console.log(data.toString());
```

## 05流式读取

他是一块一块内容的读取，以快速响应文件的速度！

```javascript
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
```

## 06文件的复制

**方法一 readFile**

```javascript
const fs = require('fs');
const process = require('process');
let data = fs.readFileSync('D:\\工作\\工路时间\\员工手册.docx');
//写入文件
fs.writeFileSync('./员工手册2.docx', data);
console.log(process.memoryUsage()); // rss    110710784 字节   105MB
```

**方法二 流式的操作**

管道流：
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

```javascript
// 创建读取流对象
const rs = fs.createReadStream('D:\\工作\\工路时间\\员工手册.docx');
// 创建写入流对象
const ws = fs.createWriteStream('./员工手册4.docx');
// 绑定 data 事件
rs.on('data', chunk => {
    ws.write(chunk);
});
rs.on('end', () => {
  console.log(process.memoryUsage());  // 43106304   =>  41M
})
```

流式的读取方法还有一种更加简单的一种方式，就是用pipe管道的一种方式

```javascript
// 创建读取流对象
const rs = fs.createReadStream('D:\\工作\\工路时间\\员工手册.docx');
// 创建写入流对象
const ws = fs.createWriteStream('./员工手册4.docx');
rs.pipe(ws);
```

这种方式一样能达到我们想要的效果，是不是更为简单呢！

## 07文件重命名与移动

文件的重命名

```javascript
const fs = require("fs");

fs.rename('./座右铭.txt', './论语.txt', err => {
  if(err) {
    console.log('操作失败~');
    return;
  }
  console.log('操作成功');
});
```

文件的移动

```javascript
const fs = require("fs");
fs.rename("./论语.txt", "../资料/座右铭.txt", (err) => {
  if (err) {
    console.log("操作失败~");
    return;
  }
  console.log("操作成功");
});
```

## 08删除文件

```javascript
const fs = require('fs');

//2. 调用 unlink 方法    unlinkSync
// fs.unlink('./员工手册4.docx', err => {
//   if(err) {
//     console.log('删除失败~');
//     return;
//   }
//   console.log('删除成功');
// });

// 调用 rm 方法  14.4   rmSync
fs.rm('./员工手册4.docx', err => {
  if (err) {
    console.log(err, '删除失败~');
    return;
  }
  console.log('删除成功');
})
```

## 09两种路径

```javascript
//1. 导入 fs 模块
const fs = require('fs');

//相对路径
// fs.writeFileSync('./index.html', 'love');
// fs.writeFileSync('index.html', 'love');
// fs.writeFileSync('../index.html', 'love');

//绝对路径
// fs.writeFileSync('D:/index.html', 'love');
fs.writeFileSync('/index.html', 'love');
```

在这种相对路径上面会出现问题

因为相对路径参照物: **命令行的工作目录, 如果你在上一级目录执行这条命令,那么就会在上一级的当前目录上做了错误的操作**

`fs.writeFileSync('./index.html', 'love');`

而**绝对路径 '全局变量' 保存的是: 所在文件的所在目录的绝对路径**

`fs.writeFileSync(__dirname + '/index.html', 'love');`