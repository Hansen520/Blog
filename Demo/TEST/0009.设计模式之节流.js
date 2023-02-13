/*
 * @Author: hansen
 * @Date: 2022-12-07 11:08:35
 * @LastEditors: hansen
 * @LastEditTime: 2022-12-07 11:33:31
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\0009.设计模式之节流.js
 */
let throttle = function (fn, interval) {
    let __self = fn, // 保存需要被延迟执行的函数引用
    timer, // 定时器
    firstTime = true; // 是否是第一次调用

    return function () {
        let args = arguments;
        __me = this;
        console.log(__me, args, 16)
        if (firstTime) { // 第一次调用不需要执行
            __self.apply(__me, args); // __self 指向__me, 这边外边如果是window调用的就执行window
            return firstTime = false;
        }

        if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;        
        }

        timer = setTimeout(function() {// 延迟一段时间
            clearTimeout(timer);
            timer = null;// 清空以便下一次执行
            __self.apply(__me, args);
        }, interval || 500);
    }
};