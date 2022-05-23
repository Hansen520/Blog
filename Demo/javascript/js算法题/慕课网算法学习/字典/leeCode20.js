// 有效的括号
/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
    // 如果是奇数个，则退出
      if (s.length % 2 === 1) {
        return false;
      }
      const stack = [];
      const map = new Map();
      map.set('(',')');
      map.set('{','}');
      map.set('[',']');
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        // 因为上面构建的时候， (, {, [ 都是有值的，有值那么把左边括号推入进去
        if (map.has(c)) {
          stack.push(c);
        } else {
          const t = stack[stack.length - 1];
          // 然后判断是否有匹配项
          if (map.get(t) === c) {
            stack.pop();
          } else {
            return false;
          }
        }
      }
      return stack.length === 0;
    };