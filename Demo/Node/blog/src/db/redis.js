/*
 * @Date: 2023-12-21 10:23:10
 * @Description: description, 325600
 */
const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");
// 创建客户端
const redisClient = redis.createClient({ url: `redis://:${REDIS_CONF.password}@${REDIS_CONF.host}:${REDIS_CONF.port}` });
!(async function () {
  
  // 连接
  await redisClient
    .connect()
    .then(() => {
      console.log("redis连接成功");
    })
    .catch((err) => console.error(err, "错误"));

  // 退出
  //   redisClient.quit();
})();
// set
async function set(key, val) {
  let objVal;
  if (typeof val === "object") {
    objVal = JSON.stringify(val);
  } else {
    objVal = val;
  }

  await redisClient.set(key, objVal);
}

// get
async function get(key) {
  try {
    let val = await redisClient.get(key);
    if (val === null) return val;

    try {
      val = JSON.parse(val);
    } catch (err) {
      throw err;
    }
    return val;
  } catch (err) {
    throw err;
  }
}

module.exports = {
    set,
    get
}
