// https://www.bilibili.com/video/BV1pY4y1J7na/?spm_id_from=333.337.search-card.all.click&vd_source=851eeb6a848d738da94a7e8acc7aa890
// 这种挺好的，就是逆行推断，但是我们今天用一种自己比较好理解的方式
// const package = (bagWeight, value, weight) => {
//   const dp = new Array(bagWeight + 1).fill(0);
//   for (let i = 0; i < weight.length; i++) {
//     for (let j = bagWeight; j >= weight[i]; j--) {
//       dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
//     }
//   }
//   return dp[bagWeight];
// }

const package = (bagWeight, value, weight) => {
    let result = new Array(bagWeight + 1).fill(0);
    for (let i = 0; i < value.length; i++) { // 控制物品行数
        const next = [];
        for (let j = 0; j <= bagWeight; j++) { // 控制列数
            if (j >= weight[i]) {
                next[j] = Math.max(result[j], result[j - weight[i]] + value[i]); // result代表的是上一行的
            } else {
                next[j] = result[j];
            }
        }
        result = next;
        console.log(result);
    }
    return result[bagWeight];

}


console.log(package(6, [5, 10, 3, 6, 3], [2, 5, 1, 4, 3]));