/*
 * @Date: 2023-12-20 17:43:57
 * @Description: controller
 */
const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += ` and author = '${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createtime desc;`;

  return exec(sql);
};

const getDetail = (id) => {
  let sql = `select * from blogs where id = ${id};`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  let { title, content, author } = blogData;
  let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${author}');`;
  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  let { title, content, author } = blogData;
  let sql = `update blogs set title = '${title}', content = '${content}', author = '${author}' where id = ${id};`;
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const delBlog = (id, author) => {
  let sql = `delete from blogs where id = ${id} and author = '${author}';`;
  return exec(sql).then((delData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
