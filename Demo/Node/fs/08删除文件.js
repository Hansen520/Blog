/*
 * @Date: 2023-10-25 10:55:32
 * @Description: description
 */
/*
 * @Date: 2023-10-25 10:55:32
 * @Description: description
 */
const fs = require('fs');

//2. 调用 unlink 方法    unlinkSync
// fs.unlink('./员工手册4.docx', err => {
//   if(err) {
//     console.log('删除失败~');
//     return;
//   }
//   console.log('删除成功');
// });

// 调用 rm 方法  14.4   rmSync
fs.rm('./员工手册4.docx', err => {
  if (err) {
    console.log(err, '删除失败~');
    return;
  }
  console.log('删除成功');
})