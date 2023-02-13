/*
 * @Author: hansen
 * @Date: 2022-12-07 10:30:39
 * @LastEditors: hansen
 * @LastEditTime: 2022-12-07 10:58:34
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\0008.uncurrying的实现.js
 */
Function.prototype.uncurrying = function() {
    var self = this; // self此时是Array.prototype.push
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        console.log(obj, 12);
        return self.apply(obj, arguments); // Array.prototype.push
    }
}
var push = Array.prototype.push.uncurrying()

var obj = {
    "length": 1,
    "0": 1
}
push(obj, 2);
console.log(push(obj, 3), 17);
console.log(obj);