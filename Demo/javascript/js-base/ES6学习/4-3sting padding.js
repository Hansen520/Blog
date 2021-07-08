// 补齐空白
// ES5的做法
// for (let i = 1; i < 1000; i=i+2) {
//   if(i < 10) {
//     console.log(`00${i}`)
//   }else if (i < 100) {
//     console.log(`0${i}`)
//   }else{
//     console.log(i)
//   }
// }

// ES6的做法
// str.padStart(targetLength [, padString])
// for (let i = 1; i < 100; i = i + 2) {
//   console.log(i.toString().padStart(2, '0'))
// }

// 计时器120秒
// let start = 120;
// let time = setInterval(() => {
//   let nowtime = start--
//   console.log(nowtime.toString().padStart(3, '0'));
//   if(nowtime <= 0){
//     clearInterval(time)
//   }
// }, 100);

// 格式化表格
// const data = {
//   portland: '77/55',
//   Dublin: '89/52',
//   Lima: '45/12'
// }
// // [city, temp]为解构
// Object.entries(data).map(([city, temp])=>{
//   console.log(`City:${city.padEnd(16)} Weather: ${temp}`)
//   // console.log(`City:${city.padEnd(16, '*#')} Weather: ${temp}`)
// })

// City:portland         Weather: 77/55
// City:Dublin           Weather: 89/52
// City:Lima             Weather: 45/12

// 如果想让上面的Lima数据只有班主任能改，任课老师不能改，我们就要关闭枚举
// Object.defineProperty(data, 'Lima', {
//   enumerable: false,// 枚举不出来，也就是遍历省略
//   writable: false// 不能被外界更该
// })
// Object.entries(data).map(([city, temp])=>{
//   console.log(`City:${city.padEnd(16)} Weather: ${temp}`)
// })
// // City:portland         Weather: 77/55
// // City:Dublin           Weather: 89/52

// //无效，不能被外界更改
// data.Lima = '88/77'
// //如果想查看更多细节，访问 Object.defineProperty。
// console.log(Object.getOwnPropertyDescriptor(data, 'Lima'))
