/*
 * @Date: 2023-10-23 15:30:44
 * @Description: description
 */
const express = require("express");
const router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");

// 注册
router.get("/reg", (req, res) => {
  // html内容
  res.render("auth/reg");
});

router.post("/reg", (req, res) => {
  UserModel.create({ ...req.body, password: md5(req.body.password) }).then((data, err) => {
    if (err) {
      res.status(500).send("注册失败");
      return;
    }
    res.render("success", { msg: "注册成功", url: "/login" });
    console.log('注册成功');
  });
});

// 登录
router.get("/login", (req, res) => {
  // html内容
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;
  // 查询数据库
  UserModel.findOne({ username, password: md5(password) }).then((data, err) => {
    if (err) {
      res.status(500).send("登入失败");
      return;
    }
    console.log();
    if (!data) {
        return res.send('账号密码错误');
    }
    console.log(data, 46);
    res.render("success", { msg: "登录成功", url: "/accounts" });

  });
});
module.exports = router;
