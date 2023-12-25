const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const path = require("path");
const fs = require("fs");
const morgan = require("koa-morgan");
const { REDIS_CONF } = require("./conf/db");
const blog = require("./routes/blog");
const user = require("./routes/user");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  // 开发环境 / 测试环境
  app.use(morgan("dev"));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a",
  });
  app.use(
    morgan("combined", {
      stream: writeStream,
    })
  );
}

// session 配置
app.keys = ["WJiol#23123_"];
app.use(
  session({
    // 配置 cookie
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    // 配置 redis
    store: redisStore({
      url: `redis://:${REDIS_CONF.password}@${REDIS_CONF.host}:${REDIS_CONF.port}`, // 这个是一定要配置的，还要配对
    }),
  })
);

// routes
app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  const writeStream = fs.createWriteStream(path.join(__dirname, "logs", "error.log"), {
    flags: "a",
  });
  morgan("combined", {
    stream: writeStream,
  });
  console.error("server error", err, ctx);
});

module.exports = app;
