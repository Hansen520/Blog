// 限制一个数在0-1之间
const random = Math.random() + 0.5;
const value01 = Math.min(1, Math.max(0, random));
console.log(value01);
