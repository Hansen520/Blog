/*
 * @Author: hansen
 * @Date: 2022-12-01 17:07:15
 * @LastEditors: hansen
 * @LastEditTime: 2022-12-01 18:01:22
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\0004.无数据跳转上一页.js
 */
/**
 * @description: 
 * @param {*} total 总数
 * @param {*} pageNo 当前页
 * @param {*} pageSize 页面大小
 * @param {*} delNum 删除的条数，默认1条
 */
function calcPageNo(total, pageNo = 1, pageSize = 10, delNum = 1) {
  const restNum = total - pageSize * (pageNo - 1); // 判断仅剩一条数据删除后与总条数是否相等
  console.log(restNum, 17);
  let pageNoDiff = Math.floor((delNum - restNum) / pageSize) + 1;
  console.log(pageNoDiff, 19);
  pageNoDiff < 0 && (pageNoDiff = 0);
  pageNo = pageNo - pageNoDiff;
  console.log(pageNo, 22)
  pageNo < 1 && (pageNo = 1);
  return pageNo;
}
console.log(calcPageNo(20, 100, 10, 1), 'last');
