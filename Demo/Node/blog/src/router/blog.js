/*
 * @Date: 2023-12-20 17:43:11
 * @Description: description
 */
const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const id = req.body.id;

  switch (method) {
    case "GET":
      if (url === "/api/blog/list") {
        // 获取博客列表
        let author = req.query.author || "";
        const keyword = req.query.keyword || "";

        if (req.query.isadmin) {
          // 管理员界面
          const loginCheckResult = loginCheck(req);
          if (loginCheckResult) {
            return loginCheckResult;
          }
          // 强制咨询自己的博客
          author = req.session.username;
        }
        const result = getList(author, keyword);
        return result.then((listData) => {
          return new SuccessModel(listData);
        });
      }
      if (url === "/api/blog/detail") {
        // 获取博客详情
        const result = getDetail(id);
        return result.then((data) => {
          return new SuccessModel(data);
        });
      }
      break;
    case "POST":
      if (url === "/api/blog/new") {
        // 创建博客
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
          // 未登录
          return loginCheckResult;
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then((data) => {
          return new SuccessModel(data);
        });
      }
      if (url === "/api/blog/update") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
          // 未登录
          return loginCheckResult;
        }
        // 更新博客
        const result = updateBlog(id, req.body);
        return result.then((val) => {
          if (val) {
            return new SuccessModel('更新博客成功');
          } else {
            return new ErrorModel("更新博客失败");
          }
        });
      }
      break;
    case "DELETE":
      if (url === "/api/blog/del") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
          // 未登录
          return loginCheckResult;
        }
        // 删除博客
        const data = delBlog(id);
        return data instanceof ErrorModel ? res.json(data) : res.json(new SuccessModel(data));
      }
      break;
    default:
      res.json(new ErrorModel("method not allowed"));
      break;
  }
};

module.exports = handleBlogRouter;
