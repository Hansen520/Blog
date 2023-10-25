const jwt = require("jsonwebtoken");
const { secret } = require('../config/config');
module.exports = (req, res, next) => {
    // token 的获取
    let token = req.get("token");
    if (!token) {
      return res.json({
        code: "2003",
        msg: "token 缺失",
        data: null,
      });
    }
    // 校验 token
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        return res.json({
          code: "2004",
          msg: "token 校验失败",
          data: null,
        });
      }
      /* 保存用户的信息，这个操作作为权限来说是非常重要的，用于对用户数据的筛选 */
      req.user = data;
      next();
    });
  };