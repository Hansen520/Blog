/*
 * @Date: 2023-10-17 16:41:55
 * @Description: description
 */

const mongoose = require("mongoose");
// 5. 创建文档的结构对象
let BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});
// 6. 创建模型对象，对文档操作的封装对象
let BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
