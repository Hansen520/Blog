/*
 * @Date: 2023-10-19 10:50:39
 * @Description: description
 */
const dayjs = require("dayjs");
var express = require("express");
var router = express.Router();
//导入 lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../../data/db.json");
//获取 db 对象
const db = low(adapter);
//导入 shortid
const shortid = require("shortid");
const AccountModel = require("../../models/AccountModel");

//记账本的列表
router.get("/account", function (req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();
  AccountModel.find().sort({ time: -1 }).then((data, err) => {
    if (err) {
      res.status(500).send('读取失败~');
      return;
    }
    console.log(data, '读取成功');
    res.render("list", { accounts: data });
  });
 
});

//添加记录
router.get("/account/create", function (req, res, next) {
  res.render("create");
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
      console.log("插入失败");
      return err;
    }
    console.log(data);
  });
  //成功提醒
  res.render("success", { msg: "添加成功哦~~~", url: "/account" });
});

//删除记录
router.get("/account/:id", (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  // db.get("accounts").remove({ id: id }).write();
  AccountModel.deleteOne({ _id: id }).then((data, err) => {
    if (err) {
      console.log(err);
      return
    }
    console.log(data);
  })
  //提醒
  res.render("success", { msg: "删除成功~~~", url: "/account" });
});

module.exports = router;
