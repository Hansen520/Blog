/*
 * @Date: 2023-12-22 15:35:40
 * @Description: description
 */
const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  console.log(username, password, 13);
  const data = await login(username, password);
  console.log(data['username'], 15);
  if (data.username) {
    // 设置session
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    console.log(ctx.session, 18);
    ctx.body = new SuccessModel();
    return;
  }
  ctx.body = new ErrorModel("用户名或密码错误");
})

router.get('/session-test', async function (ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router;