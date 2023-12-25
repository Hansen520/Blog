/*
 * @Date: 2023-12-25 10:54:07
 * @Description: description
 */
const Koa = require('./like-koa');
const app = new Koa();


// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx['X-Response-Time'];
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`, 111111);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx['X-Response-Time'] = `${ms}ms`;
});

// response
app.use(async ctx => {
  ctx.res.end('This is like koa2');
});

// 入口
app.listen(8100);