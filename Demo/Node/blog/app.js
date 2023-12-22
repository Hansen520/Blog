/*
 * @Date: 2023-12-20 15:06:11
 * @Description: description
 */
const querystring = require("querystring");
const { get, set } = require('./src/db/redis');
const { access } = require('./src/utils/log');
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log("d.toGMTString() is ", d.toGMTString());
  return d.toGMTString();
};

// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
  // 记录access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);


  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 设置跨域
  res.setHeader("Access-Control-Allow-Credentials", true); // 允许跨域传递 cookie
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允许跨域的origin
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); // 允许跨域的请求方法

  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie;
  cookieStr && cookieStr.split(";").forEach((item) => {
    if (!item) return;
    const arr = item.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    userId = `${Date.now()}_${Math.random()}`;
    needSetCookie = true;
    // 初始化redis 中的session 值
    set(userId, {});
  }
  // 获取sessionId
  req.sessionId = userId;/* 如果cookie直接有userId 那么就直接到redis里面去查询到对应用户信息 */
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData == null) {
        // 初始化 redis 中的 session 值
        set(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        console.log(sessionData, 87);
        // 设置session
        req.session = sessionData;
      }
      // 处理 post data
      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;

      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogResult) => {
          if (needSetCookie) {
            res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(blogResult));
        });
        return;
      }
      const userResult = handleUserRouter(req, res);

      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(userData));
        });
        return;
      }
      // 未命中路由，返回 404
      res.writeHead(404, {"Content-type": "text/plain"})
      res.write("404 Not Found\n")
      res.end()
    });
};

module.exports = serverHandle;
