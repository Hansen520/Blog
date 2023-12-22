/*
 * @Date: 2023-12-20 17:43:57
 * @Description: controller
 */
const { exec } = require("../db/mysql");
const { xss } = require("xss");

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1`;
  if (author) {
    sql += ` and author = '${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ` order by createtime desc;`;

  return await exec(sql);
};

const getDetail = async (id) => {
  let sql = `select * from blogs where id = ${id};`;
  const rows = await exec(sql);
  return rows[0];
};

const newBlog = async (blogData = {}) => {
  let { title, content, createtime, author } = blogData;
  const _title = xss(title);
  const _content = xss(content);
  let sql = `insert into blogs (title, content, createtime, author) values ('${_title}', '${_content}', '${createtime}', '${author}');`;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

const updateBlog = async  (id, blogData = {}) => {
  let { title, content, author } = blogData;
  let sql = `update blogs set title = '${title}', content = '${content}', author = '${author}' where id = ${id};`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

const delBlog = async (id, author) => {
  let sql = `delete from blogs where id = ${id} and author = '${author}';`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}
