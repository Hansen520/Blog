/*
    76. 最小覆盖字串(难度较大)
    给你一个字符串 s 、一个字符串 t 。
    返回 s 中涵盖 t 所有字符的最小子串。
    如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

    注意：
        对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
        如果 s 中存在这样的子串，我们保证它是唯一的答案。

        输入：s = "ADOBECODEBANC", t = "ABC"
        输出："BANC"
*/

/*
    思路
    1. 先找出所有的包含T的字串
    2. 找出长度最小那个字串，返回即可。
*/

/*
    解题步骤
    1. 用双指针维护一个窗口滑动。
    2. 移动右指针，找到包含T的字串，移动左指针，尽量减少包含T的字串的长度。
    3. 循环上述过程，找出包含T的最小子串。
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// var minWindow = function(s, t) {
//     let l = 0;
//     let r = 0;
//     const need = new Map();
//     for(let c of t) {
//         need.set(c, need.has(c) ? need.get(c) + 1 : 1);
//     }
//     let needType = need.size;
//     while(r < s.length) {
//         const c = s[r];
//         if(need.has(c)) {
//             need.set(c, need.get(c) - 1);
//             if(need.get(c) === 0) needType -= 1; 
//         }
//         r += 1;
//     }
// };