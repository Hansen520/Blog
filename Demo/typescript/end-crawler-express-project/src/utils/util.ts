interface Result<T> {
  success: boolean,
  errMsg?: string,
  data: T
}

// 因为这边data的数据类型不是很确定，所有这边可以利用泛型, 不过在一开始写代码时候可以先给any类型
// 最后在调试阶段可以给个泛型
export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data: data
    }
  }
  return {
    success: true,
    data: data
  }
}