/*
 * @Date: 2023-10-19 10:50:39
 * @Description: description
 */
const dayjs = require("dayjs");
var express = require("express");
var router = express.Router();
const AccountModel = require("../../models/AccountModel");

//记账本的列表
router.get("/account", function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  AccountModel.find()
    .sort({ time: -1 })
    .then((data, err) => {
      if (err) {
        res.status(500).send("读取失败~");
        return;
      }
      res.json({
        code: "0000",
        msg: "读取成功",
        data: data,
      });
    });
});

//新增记录
router.post("/account", (req, res) => {
  //生成 id
  // let id = shortid.generate();
  // //写入文件
  // db.get('accounts').unshift({id:id, ...req.body}).write();
  AccountModel.create({
    ...req.body,
    time: dayjs(req.body.time).toDate(),
  }).then((data, err) => {
    if (err) {
      res.json({
        code: "0002",
        msg: "创建失败",
        data: null,
      });
      return err;
    }
    res.json({
      code: "0000",
      msg: "创建成功",
      data: data,
    });
  });
  //成功提醒
  // res.render("success", { msg: "添加成功哦~~~", url: "/account" });
});

//删除记录
router.get("/account/:id", (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  // db.get("accounts").remove({ id: id }).write();
  AccountModel.deleteOne({ _id: id }).then((data, err) => {
    if (err) {
      res.json({
        code: "0003",
        msg: "删除成功",
        data: {},
      });
      return;
    }
    res.json({
      code: "0000",
      msg: "删除成功",
      data: {},
    });
  });
});

// 获取单个账单的信息
router.get("/account/:id", (req, res) => {
  const { id } = req.params;
  AccountModel.findById(id).then((data, err) => {
    if (err) {
      res.json({
        code: "0004",
        msg: "读取失败~",
        data: null,
      });
      return;
    }
    // 成功响应
    res.json({
      code: "0000",
      msg: "读取成功",
      data: data,
    });
  });
});

// 更新账单
router.patch("/account/:id", (req, res) => {
  const { id } = req.params;
  AccountModel.updateOne({ _id: id }, req.body).then((data, err) => {
    if (err) {
      res.json({
        code: "0005",
        msg: "更新失败~",
        data: null,
      });
      return;
    }
    // 再次获取单条数据
    AccountModel.findById(id).then((data, err) => {
      if (err) {
        res.json({
          code: "0005",
          msg: "更新失败~",
          data: null,
        });
        return;
      }
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data,
      });
    });
  });
});

module.exports = router;
