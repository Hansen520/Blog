// 可选参数必须放在最后一个位置(默认参数没关系，因为有值)
function buildName(firstName: string, lastName?: string, age = 12, ...rest: Array<number|string>): string {
  if (lastName) {
    return firstName + ' ' + lastName + age + rest
  } else {
    return firstName + age + rest
  }
}

buildName('will')
buildName('will', 'dog')
buildName('will', 'dog', 18, 'hello', 124)