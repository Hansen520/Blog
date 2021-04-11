import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from '../decorator';
import { getResponseData } from '../utils/util';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/analyzer';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

interface CourseItem {
  title: string;
  count: number;
}

interface DataStructure {
  [key: string]: CourseItem[];
}

// checkLogin中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};

// test中间件
// const test = (req: Request, res: Response, next: NextFunction): void => {
//   console.log('test middleware');
//   next();
// }


@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  // @use(test)
  getData(req: BodyRequest, res: Response): void {
    const secret = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);
    res.json(getResponseData<boolean>(true));
  }

  @get('/showData')
  @use(checkLogin)
  // @use(test)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      res.json(getResponseData<DataStructure>(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData<boolean>(false, '数据不存在'));
    }
  }
}