/*
 * @Author: hansen
 * @Date: 2022-10-17 10:41:29
 * @LastEditors: hansen
 * @LastEditTime: 2022-10-17 10:44:25
 */
const listNums = [9, 3, 15, 12, 24, 16, 46, 31, 33, 56];

for (let i = 0; i < listNums.length; i++) {
    if (listNums[i] % 2 === 0) {
        continue;
    }
    console.log(listNums[i]);
}