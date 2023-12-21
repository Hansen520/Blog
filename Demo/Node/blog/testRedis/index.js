/*
 * @Date: 2023-12-21 10:23:10
 * @Description: description, 325600
 */
const redis = require("redis");
!(async function () {
  // 创建客户端
  const redisClient = redis.createClient({ url: 'redis://:325600@118.195.176.186:29002' });
  // 连接
  await redisClient
    .connect()
    .then(() => {
      console.log("redis连接成功");
    })
    .catch((err) => console.error(err, '错误'));

  // set
  await redisClient.set("wang", "ZhangSan1212");

  // get
  const myName = await redisClient.get("hansen");
  console.log(myName);

  // 退出
  redisClient.quit();
})();
