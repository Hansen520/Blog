function getPrize() {
  // 有奖占1/7，为了体现10次中一次
  let prize = ['有奖', '无奖', '无奖', '无奖', '无奖', '无奖', '无奖'];
  // 50次的中奖
  let yourPrize = [];
  // 10次中中奖次数
  let count = 0;
  let i = 0;
  // 来个100次，让量大一点
  while (i < 1000) {
    yourPrize.push(prize[Math.floor(Math.random() * prize.length)]);

    if (yourPrize[i] === '无奖') {
      count++;
    } else if (yourPrize[i] === '有奖') {
      count = 0;
    }

    // 判断有无10次
    if (count === 10) {
      yourPrize[i] = '有奖';
      count = 0;
    }
    i++;
  }
  return yourPrize;
}
console.log(getPrize());
