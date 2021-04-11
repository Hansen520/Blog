// 此为枚举类型，枚举类型默认索引从0开始计数
enum Status {
  OFFLINE = 1,
  ONLINE,
  DELETED
}
// 枚举类型是可以双向映射的
// 1 OFFLINE ONLINE
console.log(Status.OFFLINE, Status[1], Status[2])

function getResult(states) {
  // Status.OFFLINE 方式是为了去辨别他的意思
  if (states === Status.OFFLINE) {
    return 'offline'
  } else if (states === Status.ONLINE) {
    return 'online'
  } else if (states === Status.DELETED) {
    return 'deleted'
  }
  return 'error'
}


// 利用枚举类型
const result = getResult(1);
console.log(result) // offline