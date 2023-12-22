/*
 * @Date: 2023-12-20 15:06:47
 * @Description: description
 */
const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;

// 配置
if (env === "dev") {
  MYSQL_CONF = {
    host: "118.195.176.186",
    user: "root",
    password: "325600",
    port: "28002",
    database: "myBlob",
  };

  // redis
  REDIS_CONF = {
    port: "29002",
    host: "118.195.176.186",
    password: "325600",
  };
}

if (env === "production") {
  MYSQL_CONF = {
    host: "118.195.176.186",
    user: "root",
    password: "325600",
    port: "28002",
    database: "myBlob",
  };
  // redis
  REDIS_CONF = {
    port: "29002",
    host: "118.195.176.186",
    password: "325600",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};
