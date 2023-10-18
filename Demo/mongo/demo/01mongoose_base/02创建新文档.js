/*
 * @Date: 2023-10-12 17:47:52
 * @Description: description
 */
// 1. 安装 mongoose
// 2. 导入mongoose
const mongoose = require("mongoose");

// 设置strictQuery 为 true
mongoose.set("strictQuery", true);

// 3. 连接 mongodb
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调 once只执行一次事件
mongoose.connection.once("open", () => {
  // 5. 创建文档的结构对象
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
  });
  // 6. 创建模型对象，对文档操作的封装对象
  let BookModel = mongoose.model("books", BookSchema);

  // 7. 新增
  BookModel.create({
    name: "西游记",
    author: "吴承恩",
    price: 20.88,
  }).then((data, err) => {
    if (err) {
      console.log(err, 35);
    }
    console.log(data, 37);
    // 8. 关闭数据库的连接
    mongoose.disconnect();
  });
}); // 设置成功的回调;
mongoose.connection.on("error", () => {
  console.log("连接失败");
}); // 设置连接错误的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
}); // 设置i链接关闭的回调
