/*
 * @Date: 2023-12-22 16:17:50
 * @Description: description
 */
const { ErrorModel } = require('../model/resModel');

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next();
        return;
    }
    ctx.body = new ErrorModel('未登录');
}