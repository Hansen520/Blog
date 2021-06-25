// 不需要类型注解
const firstNumber = 1;
const secondNumber = 2;
const total1 = firstNumber + secondNumber

// 需要类型注解(传参必须匹配)
function getTotal1 (firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber
}
const total2 = getTotal1(2, 6)
