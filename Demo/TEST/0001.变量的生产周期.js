/*
 * @Author: hansen
 * @Date: 2022-11-14 09:22:56
 * @LastEditors: hansen
 * @LastEditTime: 2022-11-14 10:35:43
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\1.变量的生产周期.js
 */
var func = function () {
  var a = 1;
  return function () {
    a++;
    const a = [
      "a",
      {
        a: (i) => {
          console.log(i);
        },
      },
    ];
    console.log(a);
  };
};
var k = func();
k();
k();
k();
k();
k();
