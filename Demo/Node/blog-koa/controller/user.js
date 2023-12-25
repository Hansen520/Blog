/*
 * @Date: 2023-12-22 16:04:54
 * @Description: description
 */
const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = async (username, password) => {
    username = escape(username);

    // 生成加密密码
    password = genPassword(password);
    password = escape(password);

    const sql = `
        SELECT username, realname FROM users WHERE username=${username} AND password=${password};
    `;
    const rows = await exec(sql);
    console.log(rows, 15);
    return rows[0];
}

module.exports = {
    login
}