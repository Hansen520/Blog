import express from 'express';
import router from './router'
import './controller/LoginController';
import './controller/CrowllerController';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session'

// 问题1: express 库的类型定义文件 .d.ts 文件类型描述不准确
// 问题2: 当我使用中间件的时候，对 req 或者 res 做了修改之后呢，实际上类型并不能改变。

const app = express()
// bodyParser 让路由拥有body请求这样子的能力
app.use(bodyParser.urlencoded({ extended: false }));
// app.use((req: Request, res: Response, next: NextFunction) => {
//   // teacherName 需要解释文件，不然会报错
//   req.teacherName = 'han';
//   next()
// })
// 设置cookieSession
app.use(
  cookieSession({
    name: 'session',
    keys: ['student han'],
    // 过期时间24h
    maxAge: 24 * 60 * 60 * 1000
  })
)
app.use(router)
app.listen(7001, () => {
  console.log('server is running')
})