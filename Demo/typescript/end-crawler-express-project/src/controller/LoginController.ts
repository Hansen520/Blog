import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post} from '../decorator';
import { getResponseData } from '../utils/util';


interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/api')
export class LoginController {
  @get('/logout')
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }
    res.json(getResponseData(true))
  }
  
  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : false
    // 定义泛型传递类型
    const result = getResponseData<boolean>(isLogin)
    res.json(result);
  }

  @post('/login')
  login(req: BodyRequest, res: Response) {
    const { password } = req.body
    console.log(password + '111')
    const isLogin = req.session ? req.session.login : false
    console.log(isLogin)
    if (isLogin) {
      res.json(getResponseData<boolean>(true));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData<boolean>(true));
      } else {
        // 因密码错误登陆的失败
        res.json(getResponseData<boolean>(false, '登陆失败'));
      }
    }  
  }

    
//   @get('/')
//   home(req: BodyRequest, res: Response) {
//     const isLogin = req.session ? req.session.login : false;
//     if (isLogin) {
//       res.send(`
//       <html>
//         <body>
//           <a href='/getData'>爬取内容</a>
//           <a href='/showData'>展示内容</a>
//           <a href='/logout'>退出</a>
//         </body>
//       </html>
//     `);
//     } else {
//       res.send(`
//       <html>
//         <body>
//           <form method="post" action="/login">
//             <input type="password" name="password" />
//             <button>登陆</button>
//           </form>
//         </body>
//       </html>
//     `);
//     }
//   }
}