## 方法一 数组分割法

这种方法也是自己最容易想到的一种方式，通过将数组以点分割，然后按照3位一体进行字符的拼接

```javascript
function format_with_array(number) {
  // 转为字符串，并按照.拆分
  const arr = (number + '').split('.');
  // 整数部分再拆分
  const int = arr[0].split('');
  // 小数部分
  const fraction = arr[1] || '';
  // 返回的变量
  let r = '';
  int.reverse().forEach(function (v, i) {
    // 非第一位并且是位值是3的倍数，添加“,”
    if (i !== 0 && i % 3 === 0) {
      r = v + ',' + r;
    } else {
      // 正常添加字符(这是好写法)
      r = v + r;
    }
  });
  // 整数部分和小数部分拼接
  return r + (!!fraction ? '.' + fraction : '');
}
// 测试用例
console.log(format_with_array(1234567893.99));
```

## 方法二 字符截取法

字符截取法，具体看看注释

```javascript
function format_with_substring(number) {
  // 数字转为字符串，并按照 .分割
  let arr = (number + '').split('.');
  let int = arr[0] + '';
  let fraction = arr[1] || '';
  // 多余的位数
  let f = int.length % 3;
  // 获取多余的位数，f可能是0， 即r可能是空字符串
  let r = int.substring(0, f);
  // 每三位添加','金额对应的字符
  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += ',' + int.substring(f + i * 3, f + (i + 1) * 3);
  }
  // 多余的位数，上面
  if (f === 0) {
    r = r.substring(1);
  }
  // 调整部分和小数部分拼接
  return r + (!!fraction ? '.' + fraction : '');
}
console.log(format_with_substring(12112123313.78));
```

## 方法三 求模法

这种方法按照 用1000求模取末尾3位，然后用除法判断是否还有剩余位数的方法去做的，这种方法性能也是最好的，推荐大家使用！

```javascript
function format_with_mod(number) {
  let n = number;
  let r = '';
  let temp = '';
  do {
    // 求模的值， 用于获取高三位，这里可能有小数
    mod = n % 1000;
    // 值是不是大于1，是继续的条件
    n = n / 1000;
    // 高三位
    temp = ~~mod;
    // 1.填充: n > 1 循环未结束， 就要填充为比如 1 => 001
    // 不然temp = ~~mod的时候, 1 001， 就会变成 "11"
    // 2.拼接“,”
    r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '');
  } while (n >= 1);
  const strNumber = number + '';
  let index = strNumber.indexOf('.');
  // 拼接小数部分
  if (index >= 0) {
    r += strNumber.substring(index);
  }
  return r;
}
console.log(format_with_mod(1234567893.99));
```

## 方法四 正则表达式(先行断言)

说这种方法前，我们来了解下什么是先行断言吧！看例子。

有以下字符串: **我爱你 我爱 爱 爱你**

如果要取出**爱**字，要求这个爱字后面有**你**，这个时候就要这么写，这就是 **先行断言**：

> '我<font color=red>爱</font>你 我爱 爱 <font color=red>爱</font>你'.match(/爱(?=你)/g) // ["爱", "爱"]

如果要求**爱**字后面没有**你**，那自然也有**先行否定断言**：

> '我爱你 我<font color=red>爱</font> <font color=red>爱</font> 爱你'.match(/爱(?!你)/g) // ["爱", "爱"] ，因为匹配相同...

这个时候，如果要求**爱**字后面有**你**，前面还要有**我**，那就要用到**后行断言**了，如下：

> '我<font color=red>爱</font>你 我爱 爱 爱你'.match(/(?<=我)爱(?=你)/g) // ["爱"]

最后，如果要求爱字前面**没有我**，后面也**没有我**，那就要用到**先行否定断言**和**后行否定断言，**如下：

> '我爱你 我爱 <font color=red>爱</font> 爱你'.match(/(?<!我)爱(?!你)/g) // ["爱"]

所以正则表达式还是比较灵活的，接下来，让我们一起来瞅瞅正则表达式是如何来玩千分位的，上代码。

```javascript
function format_with_regex(number) {
  return !(number + '').includes('.')
    ? // 就是说1-3位后面一定要匹配3位
      (number + '').replace(/\d{1,3}(?=(\d{3})+$)/g, (match) => {
        return match + ',';
      })
    : (number + '').replace(/\d{1,3}(?=(\d{3})+(\.))/g, (match) => {
        return match + ',';
      });
}
console.log(format_with_regex(1243250.99));
```

**第四行** d{1,3} 数字出现1-3次，后面紧紧跟随着3个数字，如1243250，首先243前面有1，符合条件所以是1,243；后面250前面是243符合条件，所以是1,243,250

## 方法五 通过Intl.NumberFormat

这种方法是我在往上无意种发现的，使用这种方式会导致函数不断的初始化，会导致性能上的问题。

```javascript
function format_with_Intl(
  number,
  minimumFractionDigits,
  maximumFractionDigits
) {
  minimumFractionDigits = minimumFractionDigits || 2;
  minimumFractionDigits = maximumFractionDigits || 2;
  maximumFractionDigits = Math.max(
    minimumFractionDigits,
    maximumFractionDigits
  );
  return new Intl.NumberFormat('en-us', {
    maximumFractionDigits: maximumFractionDigits || 2,
    minimumFractionDigits: minimumFractionDigits || 2,
  }).format(number);
}
console.log(format_with_Intl(123456789.98));
```

## 方法六 number.toLocaleString方式

这个是通过js带的api来的，和方法五一样会有性能上的问题。

```javascript
function format_with_toLocalString(
  number,
  minimumFractionDigits,
  maximumFractionDigits
) {
  minimumFractionDigits = minimumFractionDigits || 2;
  minimumFractionDigits = maximumFractionDigits || 2;
  maximumFractionDigits = Math.max(
    minimumFractionDigits,
    maximumFractionDigits
  );
  return number.toLocaleString('en-us', {
    maximumFractionDigits: maximumFractionDigits || 2,
    minimumFractionDigits: minimumFractionDigits || 2,
  });
}
console.log(format_with_toLocalString(123456789.58));
```

