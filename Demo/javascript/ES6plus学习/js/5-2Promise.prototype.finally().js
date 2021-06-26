const Gen = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(time < 500) {
        reject(time)
      } else {
        resolve(time)
      }
    }, time)
  })
}

Gen(Math.random() * 1000)
  // 正确执行
  .then(val => console.log('resolve', val))
  // 抛出异常
  .catch(err => console.log('reject', err))
  // 无论对错都被执行，
  .finally(() => {console.log('finish')})

  // 就好像 then执行一个逻辑，catch里面也执行一个逻辑，无论对错都给finally
  //里面设置一个弹窗，以显示结果，如关闭数据库等等