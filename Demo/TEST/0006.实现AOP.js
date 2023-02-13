/*
 * @Author: hansen
 * @Date: 2022-12-05 09:35:00
 * @LastEditors: hansen
 * @LastEditTime: 2022-12-05 14:34:32
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\0006.实现AOP.js
 */
Function.prototype.before = function(beforeFn) {
    let _self = this;
    return function() {
        beforeFn.apply(this, arguments);
        return _self.apply(this, arguments);// 执行原函数并返回
    }
}


Function.prototype.after = function(afterFn) {
    let _self = this;
    return function() {
        _self.apply(this, arguments);
        afterFn.apply(this, arguments);
    }
}

let func = function() {
    console.log(2);
};

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});

func();