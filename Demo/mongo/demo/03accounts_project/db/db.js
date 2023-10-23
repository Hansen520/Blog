/*
 * @Date: 2023-10-12 17:47:52
 * @Description: description
 */
/*
    success 数据库连接成功的回调
    error 数据库连接失败的回调
*/
module.exports = function (success, error) {
  if (typeof error !== 'function') {
    error = () => {
        console.log('连接失败~~~');
    }
  }
  // 1. 安装 mongoose
  // 2. 导入mongoose
  const mongoose = require("mongoose");

  // 设置strictQuery 为 true
  mongoose.set("strictQuery", true);

  // 3. 连接 mongodb
  const { DBHOST, DBPORT, DBNAME } = require('../config/config');
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  // 4.设置回调 once只执行一次事件
  mongoose.connection.once("open", () => {
    success();
  }); // 设置成功的回调;

  mongoose.connection.on("error", () => {
    error();
  }); // 设置连接错误的回调
  mongoose.connection.on("close", () => {
    console.log("连接关闭");
  }); // 设置i链接关闭的回调
};
