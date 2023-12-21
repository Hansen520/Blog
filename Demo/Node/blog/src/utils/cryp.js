/*
 * @Date: 2023-12-21 13:52:59
 * @Description: description
 */
const crypto = require('crypto');

// 密钥
const SECRET_KEY = 'WZsn_1314#&%';

// 加密
function md5(content) {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    genPassword,
}