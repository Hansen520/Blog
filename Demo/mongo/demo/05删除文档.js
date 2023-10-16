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
    name: {
      type: String,
      required: true /* 表明该属性必须不为空 */,
      unique: true /* 设置为独一无二的，必须一开始数据表为空的时候插入 */,
    },
    author: {
      type: String,
      default: "匿名" /* 默认值 */,
    },
    style: {
      // 类型
      type: String,
      enum: ["体育", "文学", "教育", "音乐", "小说"] /* 枚举值 */,
    },
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time: Date,
    testMixed: mongoose.Schema.Types.Mixed /* 任意类型 */,
    testDocument: mongoose.Schema.Types.ObjectId /* 文档ID,一般用作外键 */,
    testDecimal: mongoose.Schema.Types.Decimal128 /* 高精度数字类型 */,
  });
  // 6. 创建模型对象，对文档操作的封装对象
  let BookModel = mongoose.model("novel", BookSchema);

  // 7. 删除一条
  //   BookModel.deleteOne({ _id: "652cdeb3dcbb2f9b864d9ff2" }).then((data, err) => {
  //     if (err) {
  //       console.log(err, "删除失败");
  //       return;
  //     }
  //     console.log(data);
  //   });

  // 批量删除
  BookModel.deleteMany({ is_hot: false }).then((data, err) => {
    if (err) {
      console.log(err, "删除失败");
      return;
    }
    console.log(data);
  });
}); // 设置成功的回调;
mongoose.connection.on("error", () => {
  console.log("连接失败");
}); // 设置连接错误的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
}); // 设置i链接关闭的回调
