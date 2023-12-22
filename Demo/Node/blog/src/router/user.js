/*
 * @Date: 2023-12-20 17:43:26
 * @Description: description
 */
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const { method, path } = req;
  switch (method) {
    case "POST":
      // 登录
      if (path === "/api/user/login") {
        const { username, password } = req.body;
        console.log(req.body, username, password, req.sessionId, 16);
        const result = login(username, password);
        return result.then((data) => {
          if (data.username) {
            // 设置session
            req.session.username = data.username;
            req.session.realname = data.realname;
            set(req.sessionId, req.session);
            return new SuccessModel({data: data, msg: "登录成功"}); 
          }
          return new ErrorModel("登录失败");
        });
      }
      break;
    default:
  }
};

module.exports = handleUserRouter;
