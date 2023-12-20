/*
 * @Date: 2023-12-20 11:18:29
 * @Description: description
 */
const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: '118.195.176.186',
    user: 'root',
    password: '325600',
    port: '28002',
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
const sql = `insert into blogs (title, content, createtime, author) values ('标题C', '内容C',1546871704408, 'zhangsan')`
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()