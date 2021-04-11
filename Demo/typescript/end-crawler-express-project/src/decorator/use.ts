import 'reflect-metadata';
import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller/index';

export function use(middleware: RequestHandler) {
  return function (target: CrowllerController | LoginController, key: string) {
    const originMiddleware = Reflect.getMetadata('middleware', target, key) || []
    originMiddleware.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddleware, target, key);
  };
}
