/*
 * @Date: 2023-10-23 15:30:44
 * @Description: description
 */
const express = require("express");
const router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config');

router.post("/login", (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;
  console.log(username, password, 14);
  // 查询数据库
  UserModel.findOne({ username, password: md5(password) }).then((data, err) => {
    if (err) {
      res.json({
        code: "2001",
        msg: "数据库读取失败~",
        data: null,
      });
      return;
    }
    if (!data) {
      res.json({
        code: "2001",
        msg: "用户名密码错误~",
        data: null,
      });
      return;
    }
    // 创建token
    let token = jwt.sign({
        username: data.username,
        _id: data._id,
    }, secret, {
        expiresIn: 60 * 60 * 24
    })
    res.json({
        code: "0000",
        msg: "登录成功~",
        data: token,
      });
  });
});
module.exports = router;
