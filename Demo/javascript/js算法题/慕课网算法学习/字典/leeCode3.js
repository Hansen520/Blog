/*
    lee3：无重复字符的最长字串
    题目描述: 请你找出其中不含有重复字符的 最长字串 的长度
    'abcabcabc' => 3
*/
/*
    思路
    1. 先找出所有的不包含重复字符的字串
    2. 找出长度最大那个字串，返回其长度即可
*/
/*
    步骤
    1. 用双指针维护一个滑动窗口，用来剪切字串
    2. 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位
    3. 过程中，记录所有窗口的长度，并返回最大值
*/
var lengthOfLongestSubstring = function(s) {
    let l = 0;
    let res = 0;
    const map = new Map();
    for(let r = 0; r < s.length; r += 1) {
        // map.get(s[r]) >= 1 防止 l = map.get(s[r]) + 1; 避免s[r]前面有相同的值导致l赋值出错
        if(map.has(s[r]) && map.get(s[r]) >= 1) {
            l = map.get(s[r]) + 1;
        }
        res = Math.max(res, r - l + 1);
        map.set(s[r], r);
    }
    return res;
};
// 测试用例
console.log(lengthOfLongestSubstring('abbcdea'));