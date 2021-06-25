// 1类型谓词保护
// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined
// }
// 2typeof 类型保护
// function isNumber (x: any):x is string {
//   return typeof x === 'number'
// }

// function isString (x: any): x is string {
//   return typeof x === 'string'
// }

// function padLeft (value: string, padding: string | number) {
//   if (isNumber(padding)) {
//     return Array(padding + 1).join(' ') + value
//   }
//   if (isString(padding)) {
//     return padding + value
//   }
//   throw new Error(`Expected string or number, got '${padding}'.`)
// }
// 3instanceof 类型保护
// if (pet instanceof Bird) {
//   pet.fly()
// }
// if (pet instanceof Fish) {
//   pet.swim()
// }