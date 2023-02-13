// // 方法一
// function format_with_array(number) {
//   // 转为字符串，并按照.拆分
//   const arr = (number + '').split('.');
//   // 整数部分再拆分
//   const int = arr[0].split('');
//   // 小数部分
//   const fraction = arr[1] || '';
//   // 返回的变量
//   let r = '';
//   int.reverse().forEach(function (v, i) {
//     // 非第一位并且是位值是3的倍数，添加“,”
//     if (i !== 0 && i % 3 === 0) {
//       r = v + ',' + r;
//     } else {
//       // 正常添加字符(这是好写法)
//       r = v + r;
//     }
//   });
//   // 整数部分和小数部分拼接
//   return r + (!!fraction ? '.' + fraction : '');
// }
// // 测试用例
// console.log(format_with_array(1234567893.99));

// 方法二 字符截取
// function format_with_substring(number) {
//   // 数字转为字符串，并按照 .分割
//   let arr = (number + '').split('.');
//   let int = arr[0] + '';
//   let fraction = arr[1] || '';
//   // 多余的位数
//   let f = int.length % 3;
//   // 获取多余的位数，f可能是0， 即r可鞥是空字符串
//   let r = int.substring(0, f);
//   // 每三位添加','金额对应的字符
//   for (let i = 0; i < Math.floor(int.length / 3); i++) {
//     r += ',' + int.substring(f + i * 3, f + (i + 1) * 3);
//   }
//   // 多余的位数，上面
//   if (f === 0) {
//     r = r.substring(1);
//   }
//   // 调整部分和小数部分拼接
//   return r + (!!fraction ? '.' + fraction : '');
// }
// console.log(format_with_substring(12112123313.78));

// 方法三 求模法
function format_with_mod(number) {
  let n = number;
  let r = "";
  let temp;
  do {
    // 求模的值， 用于获取高三位，这里可能有小数
    let mod = n % 1000;
    // 值是不是大于1，是继续的条件
    n = n / 1000;
    // 高三位
    temp = ~~mod;
    // 1.填充: n > 1 循环未结束， 就要填充为比如 1 => 001
    // 不然temp = ~~mod的时候, 1 001， 就会变成 "11"
    // 2.拼接“,”
    r = (n >= 1 ? `${temp}`.padStart(3, "0") : temp) + (!!r ? "," + r : "");
  } while (n >= 1);
  const strNumber = number + "";
  let index = strNumber.indexOf(".");
  // 拼接小数部分
  if (index >= 0) {
    r += strNumber.substring(index);
  }
  return r;
}
console.log(format_with_mod(1234567893.99));

// 方式四正则表达法(先行断言)，相关资料https://blog.csdn.net/icewfz/article/details/79900993
// function format_with_regex(number) {
//   return !(number + '').includes('.')
//     ? // 就是说1-3位后面一定要匹配3位
//       (number + '').replace(/\d{1,3}(?=(\d{3})+$)/g, (match) => {
//         return match + ',';
//       })
//     : (number + '').replace(/\d{1,3}(?=(\d{3})+(\.))/g, (match) => {
//         return match + ',';
//       });
// }
// console.log(format_with_regex(1243250.99));

// 方法五(有性能问题)
// function format_with_Intl(
//   number,
//   minimumFractionDigits,
//   maximumFractionDigits
// ) {
//   minimumFractionDigits = minimumFractionDigits || 2;
//   minimumFractionDigits = maximumFractionDigits || 2;
//   maximumFractionDigits = Math.max(
//     minimumFractionDigits,
//     maximumFractionDigits
//   );
//   return new Intl.NumberFormat('en-us', {
//     maximumFractionDigits: maximumFractionDigits || 2,
//     minimumFractionDigits: minimumFractionDigits || 2,
//   }).format(number);
// }
// console.log(format_with_Intl(123456789.98));

// // 方法六
// function format_with_toLocalString(
//   number,
//   minimumFractionDigits,
//   maximumFractionDigits
// ) {
//   minimumFractionDigits = minimumFractionDigits || 2;
//   minimumFractionDigits = maximumFractionDigits || 2;
//   maximumFractionDigits = Math.max(
//     minimumFractionDigits,
//     maximumFractionDigits
//   );
//   return number.toLocaleString('en-us', {
//     maximumFractionDigits: maximumFractionDigits || 2,
//     minimumFractionDigits: minimumFractionDigits || 2,
//   });
// }
// console.log(format_with_toLocalString(123456789.58));
