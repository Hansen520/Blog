/*
 * @Date: 2023-12-22 16:17:50
 * @Description: description
 */
const { ErrorModel } = require('../model');

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        awaitnext();
        return;
    }
    res.json(new ErrorModel('未登录'));
}