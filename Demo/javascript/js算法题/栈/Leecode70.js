function isValid(s) {
  // 如果是奇数个，则退出
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else {
      const t = stack[stack.length - 1];
      if (
        (t === '(' && c === ')') ||
        (t === '{' && c === '}') ||
        (t === '[' && c === ']')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isValid('[][][][()()(){}{}{[][][][][][][]}]'));
console.log(isValid('[][][][()()(){][]}]'));
console.log(isValid('[]['));
console.log(isValid('[()]'));

// 时间复杂度: o(n), 空间复杂度o(n)
