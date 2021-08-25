let arr = [1, 2, 3, 4, 5, 2, 3, 4, 5, 6];
// 写法一
function toRe1(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (arr.indexOf(data[i]) === -1) {
      arr.push(data[i]);
    }
  }
  return arr;
}
// 写法二
function toRe2(data) {
  let set = new Set(data);
  return [...set];
}

// 写法三
function toRe3(data) {
  return data.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}
console.log(toRe3(arr));
