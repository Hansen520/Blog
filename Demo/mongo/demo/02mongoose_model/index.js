/*
 * @Date: 2023-10-17 16:31:54
 * @Description: description
 */
const db = require("./db/db");
const BookModel = require("./models/BookModel");
const mongoose = require("mongoose");

db(
  () => {
    // 7. 新增
    BookModel.create({
      name: "西游记3",
      author: "吴承恩",
      price: 20.88,
    }).then((data, err) => {
      if (err) {
        console.log(err, 35);
      }
      console.log(data);
      // 8. 关闭数据库的连接
      mongoose.disconnect();
    });
  },
  () => {}
);
